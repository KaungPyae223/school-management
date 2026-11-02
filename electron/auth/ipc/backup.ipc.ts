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

const SEVEN_BIN_FILE = process.platform === "win32" ? "7za.exe" : "7za";
const SEVEN_BIN_DIR =
  process.platform === "win32"
    ? "win"
    : process.platform === "darwin"
      ? "mac"
      : "linux";

let cachedSevenBin: string | null = null;

const makeExecutable = async (binPath: string) => {
  if (process.platform === "win32") {
    return;
  }
  try {
    await fs.chmod(binPath, 0o755);
  } catch (e) {
    console.warn("[Backup] Could not chmod 7za binary:", e);
  }
};

// `7zip-bin` builds its binary path from its own module folder, but esbuild
// inlines that module into dist-electron/main.js, so the resolved path points
// nowhere. On top of that the real binary sits inside app.asar, and asar
// entries are virtual: chmod/spawn on them fail with ENOTDIR. We therefore look
// up the bundled binary ourselves and, when it lives inside the archive, copy
// it out to a real path before running it.
const findBundledBinary = (): string | null => {
  const candidates = [
    path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      "node_modules",
      "7zip-bin",
      SEVEN_BIN_DIR,
      process.arch,
      SEVEN_BIN_FILE,
    ),
    path.join(
      app.getAppPath(),
      "node_modules",
      "7zip-bin",
      SEVEN_BIN_DIR,
      process.arch,
      SEVEN_BIN_FILE,
    ),
    sevenBin.path7za,
  ];

  return (
    candidates.find((candidate) => {
      try {
        return Boolean(candidate) && fs.existsSync(candidate);
      } catch {
        return false;
      }
    }) ?? null
  );
};

const getSevenBin = async (): Promise<string> => {
  if (cachedSevenBin) {
    return cachedSevenBin;
  }

  const bundled = findBundledBinary();

  // Already a real file on disk (dev build or unpacked archive): use it in place.
  if (bundled && !bundled.includes(`.asar${path.sep}`)) {
    await makeExecutable(bundled);
    cachedSevenBin = bundled;
    return bundled;
  }

  if (bundled) {
    const target = path.join(app.getPath("userData"), "bin", SEVEN_BIN_FILE);
    try {
      await fs.ensureDir(path.dirname(target));
      const binary = await fs.readFile(bundled);
      const existing = await fs.stat(target).catch(() => null);

      if (!existing || existing.size !== binary.length) {
        await fs.writeFile(target, binary);
      }

      await makeExecutable(target);
      cachedSevenBin = target;
      return target;
    } catch (e) {
      console.warn("[Backup] Could not extract 7za binary from archive:", e);
    }
  }

  // Last resort: rely on a system wide 7za (p7zip-full / 7zip on Windows).
  console.warn("[Backup] Falling back to the 7za binary found in PATH.");
  return "7za";
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

    const sevenBinPath = await getSevenBin();

    try {
      await prisma.$queryRawUnsafe(`PRAGMA wal_checkpoint(TRUNCATE);`);

      await fs.ensureDir(stagingDir);
      await fs.copy(DB_FILE, path.join(stagingDir, "app.db"));
      await fs.copy(IMAGE_FOLDER, path.join(stagingDir, "images"));

      await new Promise((resolve, reject) => {
        const stream = Seven.add(filePath, path.join(stagingDir, "*"), {
          $bin: sevenBinPath,
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

      const sevenBinPath = await getSevenBin();

      try {
        await prisma.$disconnect();

        await new Promise((resolve, reject) => {
          const stream = Seven.extractFull(filePath, extractDir, {
            $bin: sevenBinPath,
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
