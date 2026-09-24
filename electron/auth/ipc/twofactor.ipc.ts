import { ipcMain, safeStorage } from "electron";
import { store } from "../../store";
import { totpService } from "../services/totp.service";
import { twofactorSession } from "../session/twofactor.session";
import { twofactorService } from "../services/twofactor.service";

export const register2FAIPCs = () => {
  ipcMain.handle("auth:2fa-generate", async () => {
    try {
      const setupData = await totpService.generateSetup();

      store.set("temp_2fa_secret", setupData.secret);

      return {
        success: true,
        qrCodeUrl: setupData.qrCodeUrl,
        secret: setupData.secret,
        backupCodes: setupData.backupCodes,
      };
    } catch {
      return { success: false, message: "Failed to generate 2FA setup." };
    }
  });

  ipcMain.handle(
    "auth:2fa-enable",
    async (_, data: { token: string; backupCodes: string[] }) => {
      const { token, backupCodes } = data;

      try {
        const tempSecret = store.get("temp_2fa_secret") as string | undefined;
        if (!tempSecret) {
          return {
            success: false,
            message: "No active 2FA setup session found.",
          };
        }

        const isValid = await totpService.verifyToken(token, tempSecret);
        if (!isValid) {
          return {
            success: false,
            message: "Invalid verification code. Check your authenticator app.",
          };
        }

        const encryptedSecret = safeStorage.encryptString(tempSecret);
        store.set("two_factor_secret", encryptedSecret.toString("base64"));
        store.set("two_factor_enabled", true);

        twofactorSession.verify();

        const normalizedCodes = backupCodes.map((code) =>
          code.trim().toUpperCase(),
        );
        const encryptedBackupCodes = safeStorage.encryptString(
          JSON.stringify(normalizedCodes),
        );
        store.set(
          "two_factor_backup_codes",
          encryptedBackupCodes.toString("base64"),
        );

        store.delete("temp_2fa_secret");

        return { success: true, message: "2FA enabled successfully!" };
      } catch {
        return { success: false, message: "Failed to enable 2FA." };
      }
    },
  );

  ipcMain.handle("auth:2fa-verify", async (_, token: string) => {
    try {
      const check = await twofactorService.checkToken(token);
      if (check.success) {
        twofactorSession.verify();
      }
      return check;
    } catch {
      return { success: false, message: "Verification failed." };
    }
  });

  // 4. Disable 2FA
  ipcMain.handle("auth:2fa-disable", async (_, token: string) => {
    try {
      const check = await twofactorService.checkToken(token);
      if (!check.success) {
        return check;
      }

      store.delete("two_factor_secret");
      store.delete("two_factor_backup_codes");
      store.set("two_factor_enabled", false);

      return { success: true };
    } catch {
      return { success: false, message: "Failed to disable 2FA." };
    }
  });

  ipcMain.handle("auth:2fa-is-enabled", () => {
    return !!store.get("two_factor_enabled");
  });

  ipcMain.handle("auth:2fa-is-verified", () => {
    return twofactorSession.is2FAVerified();
  });
};
