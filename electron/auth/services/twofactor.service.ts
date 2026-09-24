import { safeStorage } from "electron";
import { store } from "../../store";
import { totpService } from "./totp.service";

interface CheckTokenResponse {
  success: boolean;
  message?: string;
}

export const twofactorService = {
  checkToken: async (token: string): Promise<CheckTokenResponse> => {
    const encryptedSecret = store.get("two_factor_secret") as string | null;
    if (!encryptedSecret) {
      return { success: false, message: "2FA is not configured." };
    }

    const decryptedSecret = safeStorage.decryptString(
      Buffer.from(encryptedSecret, "base64"),
    );

    const isValid = await totpService.verifyToken(token, decryptedSecret);

    if (isValid) {
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

        return { success: true, message: "Backup code used successfully." };
      }
    }

    return { success: false, message: "Invalid 2FA code." };
  },
  has2FA: () => {
    return !!store.get("two_factor_enabled");
  },
};
