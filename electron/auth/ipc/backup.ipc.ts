import { app, BrowserWindow, dialog, safeStorage } from "electron";
import path from "node:path";
import fs from "fs-extra";
import { format } from "date-fns";

import { store } from "../../store";
import { protectedHandle } from "./protected.ipc";
import { prisma } from "../../db/prisma";
// @ts-ignore
import Seven from "node-7z";
import sevenBin from "7zip-bin";
import { authService } from "../services/auth.service";
import { twofactorSession } from "../session/twofactor.session";
import { twofactorService } from "../services/twofactor.service";

const DATA_DIR = app.getPath("userData");
const DB_FILE = path.join(DATA_DIR, "app.db");
const IMAGE_FOLDER = path.join(DATA_DIR, "images");

const ensureExecutable = (binPath: string) => {
  if (process.platform !== "win32") {
    try {
      fs.chmodSync(binPath, 0o755);
    } catch (e) {
      console.warn("[Backup] Could not chmod 7za binary:", e);
    }
  }
};

export const backupIPCs = () => {
  protectedHandle("backup:zip", async (_, password: string) => {
    if (twofactorService.has2FA() && !twofactorSession.is2FAVerified()) {
      return {
        success: false,
        error: "Please verify Two-Factor Authentication first.",
      };
    }

    const isPasswordMatch = await authService.checkMatch(password);
    if (!isPasswordMatch) {
      return { success: false, error: "Incorrect password." };
    }

    const dateStr = format(new Date(), "yyyy-MM-dd_HH-mm");
    const defaultFileName = `school_backup_${dateStr}.zip`;

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save Encrypted Backup",
      defaultPath: defaultFileName,
      filters: [{ name: "Encrypted ZIP Archive", extensions: ["zip"] }],
    });

    if (canceled || !filePath) {
      return { success: false, error: "Backup canceled by user." };
    }

    const stagingDir = path.join(
      app.getPath("temp"),
      `backup-staging-${Date.now()}`,
    );

    ensureExecutable(sevenBin.path7za);

    try {
      await prisma.$queryRawUnsafe(`PRAGMA wal_checkpoint(TRUNCATE);`);

      await fs.ensureDir(stagingDir);
      await fs.copy(DB_FILE, path.join(stagingDir, "app.db"));
      await fs.copy(IMAGE_FOLDER, path.join(stagingDir, "images"));

      await new Promise((resolve, reject) => {
        const stream = Seven.add(filePath, path.join(stagingDir, "*"), {
          $bin: sevenBin.path7za,
          password,
          method: ["x=5"],
        });
        stream.on("end", resolve);
        stream.on("error", reject);
      });

      return { success: true, filePath };
    } catch (error: any) {
      console.error("[Backup Error]:", error);
      return { success: false, error: error.message };
    } finally {
      await fs
        .remove(stagingDir)
        .catch((e) =>
          console.error("[Backup] Failed to clean staging dir:", e),
        );
    }
  });

  protectedHandle(
    "backup:import",
    async (__, data: { filePath: string; password: string }) => {
      const { filePath, password } = data;

      if (twofactorService.has2FA() && !twofactorSession.is2FAVerified()) {
        return {
          success: false,
          error: "Please verify Two-Factor Authentication first.",
        };
      }

      if (!filePath || !fs.existsSync(filePath)) {
        return { success: false, error: "Backup file not found on disk." };
      }

      if (!password || password.trim().length === 0) {
        return {
          success: false,
          error: "Password is required to decrypt backup.",
        };
      }

      if (path.extname(filePath).toLowerCase() !== ".zip") {
        return {
          success: false,
          error: "Please select a ZIP backup.",
        };
      }
      const extractDir = path.join(
        app.getPath("temp"),
        `backup-restore-${Date.now()}`,
      );
      await fs.ensureDir(extractDir);

      ensureExecutable(sevenBin.path7za);

      try {
        await prisma.$disconnect();

        await new Promise((resolve, reject) => {
          const stream = Seven.extractFull(filePath, extractDir, {
            $bin: sevenBin.path7za,
            password,
            $bb3: undefined,
          });
          stream.on("end", resolve);
          stream.on("error", reject);
        });

        const extractedDb = path.join(extractDir, "app.db");
        const extractedImages = path.join(extractDir, "images");

        if (
          !(await fs.pathExists(extractedDb)) ||
          !(await fs.pathExists(extractedImages))
        ) {
          throw new Error("Backup file is missing app.db or images folder.");
        }

        await fs.remove(DB_FILE);
        await fs.remove(IMAGE_FOLDER);
        await fs.copy(extractedDb, DB_FILE);
        await fs.copy(extractedImages, IMAGE_FOLDER);

        return { success: true };
      } catch (err: any) {
        console.error("[Backup Error]:", err);
        return { success: false, error: err.message };
      } finally {
        await fs
          .remove(extractDir)
          .catch((e) =>
            console.error("[Backup] Failed to clean extract dir:", e),
          );
      }
    },
  );

  protectedHandle("backup:relaunch", async () => {
    setTimeout(() => {
      app.relaunch();
      app.exit(0);
    }, 1000);
  });
};
