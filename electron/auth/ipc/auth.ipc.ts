import { ipcMain, safeStorage } from "electron";
import { store } from "../../store";
import { authSession } from "../session/auth.session";
import { protectedHandle } from "./protected.ipc";
import { twofactorSession } from "../session/twofactor.session";
import { authService } from "../services/auth.service";

export const authIPCs = () => {
  ipcMain.handle("auth:is-authenticated", () => {
    return authSession.isAuthenticated();
  });

  ipcMain.handle("auth:get-remain-time", () => {
    return authService.timeSkipCheck();
  });

  ipcMain.handle("auth:has-password", () => {
    return authSession.hasPassword();
  });

  ipcMain.handle("auth:set-password", async (_, plainPassword) => {
    try {
      if (authSession.has2FA() && !twofactorSession.is2FAVerified()) {
        return {
          success: false,
          message: "Please verify Two-Factor Authentication first.",
        };
      }
      if (authSession.hasPassword()) {
        return { success: false, message: "Password cannot be set." };
      }
      if (!plainPassword) {
        return { success: false, message: "Password cannot be empty." };
      }

      if (!safeStorage.isEncryptionAvailable()) {
        return {
          success: false,
          message: "Secure storage is not available.",
        };
      }

      await authService.storedPassword(plainPassword);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to set password." };
    }
  });

  protectedHandle(
    "auth:change-password",
    async (_, oldPassword, newPassword) => {
      try {
        if (authSession.has2FA() && !twofactorSession.is2FAVerified()) {
          return {
            success: false,
            message: "Please verify Two-Factor Authentication first.",
          };
        }
        if (!authSession.hasPassword()) {
          return { success: false, message: "No password set." };
        }
        if (!newPassword || !oldPassword) {
          return { success: false, message: "Password cannot be empty." };
        }

        if (!safeStorage.isEncryptionAvailable()) {
          return {
            success: false,
            message: "Secure storage is not available.",
          };
        }

        const checkTimeSkip = authService.timeSkipCheck();

        if (!checkTimeSkip?.success) {
          return checkTimeSkip;
        }

        const verify = await authService.verifyPassword(oldPassword);

        if (verify.success) {
          await authService.storedPassword(newPassword);
          return { success: true };
        } else {
          return verify;
        }
      } catch (err) {
        return { success: false, message: "Failed to change password." };
      }
    },
  );

  ipcMain.handle("auth:reset-password-count", async () => {
    return authService.resetPasswordCount();
  });

  ipcMain.handle("auth:reset-password", async (_, password) => {
    try {
      if (!twofactorSession.is2FAVerified()) {
        return {
          success: false,
          message: "Please verify Two-Factor Authentication first.",
        };
      }
      if (!authSession.hasPassword()) {
        return { success: false, message: "No password set." };
      }
      if (!password) {
        return { success: false, message: "Password cannot be empty." };
      }

      if (!safeStorage.isEncryptionAvailable()) {
        return {
          success: false,
          message: "Secure storage is not available.",
        };
      }

      const reset_count = authService.resetPasswordCount();

      if (reset_count == 0) {
        return {
          success: false,
          message: "You don't have any reset attempts left.",
        };
      }

      store.set("reset_counts", reset_count - 1);

      await authService.storedPassword(password);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to change password." };
    }
  });

  ipcMain.handle("auth:verify-password", async (_, plainPassword) => {
    const storedHash = store.get("user_password_hash");
    if (!storedHash) return { success: false, message: "No password set." };

    const checkTimeSkip = authService.timeSkipCheck();

    if (!checkTimeSkip?.success) {
      return checkTimeSkip;
    }

    return authService.verifyPassword(plainPassword);
  });
};
