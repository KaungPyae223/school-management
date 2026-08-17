import { ipcMain, safeStorage } from "electron";
import { store } from "../store";
import { totpService } from "./totp-service";
import { twoFactorSession } from "./two-factor-session";

interface CheckTokenResponse {
  success: boolean;
  message?: string;
}

const checkToken = async (token: string): Promise<CheckTokenResponse> => {
  const encryptedSecret = store.get("two_factor_secret") as string | null;
  if (!encryptedSecret) {
    return { success: false, message: "2FA is not configured." };
  }

  const decryptedSecret = safeStorage.decryptString(
    Buffer.from(encryptedSecret, "base64"),
  );

  const isValid = await totpService.verifyToken(token, decryptedSecret);

  if (isValid) {
    twoFactorSession.verify();
    return { success: true };
  }

  const encryptedBackupCodesStr = store.get("two_factor_backup_codes") as
    | string
    | null;

  if (encryptedBackupCodesStr) {
    const decryptedJson = safeStorage.decryptString(
      Buffer.from(encryptedBackupCodesStr, "base64"),
    );
    const backupCodes: string[] = JSON.parse(decryptedJson);

    const inputCode = token.trim().toUpperCase();
    const codeIndex = backupCodes.indexOf(inputCode);

    if (codeIndex !== -1) {
      backupCodes.splice(codeIndex, 1);

      const updatedEncryptedCodes = safeStorage.encryptString(
        JSON.stringify(backupCodes),
      );
      store.set(
        "two_factor_backup_codes",
        updatedEncryptedCodes.toString("base64"),
      );

      twoFactorSession.verify();
      return { success: true, message: "Backup code used successfully." };
    }
  }

  return { success: false, message: "Invalid 2FA code." };
};

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
    } catch (err: any) {
      return { success: false, message: err.message };
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

        const isValid = totpService.verifyToken(token, tempSecret);
        if (!isValid) {
          return {
            success: false,
            message: "Invalid verification code. Check your authenticator app.",
          };
        }

        const encryptedSecret = safeStorage.encryptString(tempSecret);
        store.set("two_factor_secret", encryptedSecret.toString("base64"));
        store.set("two_factor_enabled", true);

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
      } catch (err: any) {
        return { success: false, message: "Failed to enable 2FA." };
      }
    },
  );

  ipcMain.handle("auth:2fa-verify", async (_, token: string) => {
    try {
      return await checkToken(token);
    } catch (err: any) {
      return { success: false, message: "Verification failed." };
    }
  });

  // 4. Disable 2FA
  ipcMain.handle("auth:2fa-disable", async (_, token: string) => {
    try {
      const check = await checkToken(token);
      if (!check.success) {
        return check;
      }

      store.delete("two_factor_secret");
      store.delete("two_factor_backup_codes");
      store.set("two_factor_enabled", false);

      return { success: true };
    } catch (err: any) {
      return { success: false, message: "Failed to disable 2FA." };
    }
  });

  ipcMain.handle("auth:2fa-is-enabled", () => {
    return !!store.get("two_factor_enabled");
  });
};
