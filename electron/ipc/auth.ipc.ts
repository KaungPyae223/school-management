import { ipcMain, safeStorage } from "electron";
import { store } from "../store";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const hasPassword = () => {
  store.set("user_password_hash", null);
  return !!store.get("user_password_hash");
};

const storedPassword = async (password: string) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const encryptedHash = safeStorage.encryptString(passwordHash);

  store.set("user_password_hash", encryptedHash.toString("base64"));
};

const checkMatch = async (password: string): Promise<boolean> => {
  const encryptedHash = store.get("user_password_hash");

  if (!encryptedHash) {
    return false;
  }

  const hash = safeStorage.decryptString(Buffer.from(encryptedHash, "base64"));

  return bcrypt.compare(password, hash);
};

export const authIPCs = () => {
  ipcMain.handle("auth:has-password", () => {
    return hasPassword();
  });

  ipcMain.handle("auth:set-password", async (_, plainPassword) => {
    try {
      if (hasPassword()) {
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

      await storedPassword(plainPassword);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to set password." };
    }
  });

  ipcMain.handle(
    "auth:change-password",
    async (_, oldPassword, newPassword) => {
      try {
        if (!hasPassword()) {
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

        const isMatch = await checkMatch(oldPassword);
        if (!isMatch) {
          return { success: false, message: "Incorrect old password." };
        }

        await storedPassword(newPassword);

        return { success: true };
      } catch (err) {
        return { success: false, message: "Failed to change password." };
      }
    },
  );

  ipcMain.handle("auth:verify-password", async (_, plainPassword) => {
    const storedHash = store.get("user_password_hash");
    if (!storedHash) return { success: false, message: "No password set." };
    await new Promise((res) => setTimeout(res, 500));

    const isMatch = await checkMatch(plainPassword);

    return {
      success: isMatch,
      message: isMatch ? "Success" : "Incorrect password",
    };
  });
};
