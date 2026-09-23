import { ipcMain, safeStorage } from "electron";
import { store } from "../store";
import bcrypt from "bcryptjs";
import { authSession } from "./auth-session";
import { protectedHandle } from "./protected-ipc";
import { twoFactorSession } from "./two-factor-session";

const SALT_ROUNDS = 10;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

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

const timeSkipCheck = () => {
  const now = Date.now();
  const loginAttempt = store.get("log_in_attempt");

  if (now < loginAttempt.lastSeenTime) {
    const penaltyLockout = loginAttempt.lastSeenTime * 2;
    store.set("log_in_attempt", {
      count: MAX_ATTEMPTS,
      lockoutUntil: penaltyLockout,
      lastSeenTime: now,
    });

    return {
      success: false,
      locked: true,
      retryAfterSeconds: Math.ceil(penaltyLockout - now / 1000),
      message: "System clock tampering detected! Lockout penalty applied.",
    };
  }

  if (loginAttempt.lockoutUntil > 0 && loginAttempt.lockoutUntil <= now) {
    store.set("log_in_attempt", {
      count: 2,
      lockoutUntil: 0,
      lastSeenTime: now,
    });
  }

  if (loginAttempt.lockoutUntil > now) {
    const remainingSeconds = Math.ceil(
      (loginAttempt.lockoutUntil - now) / 1000,
    );

    store.set("log_in_attempt", {
      ...loginAttempt,
      lastSeenTime: now,
    });

    return {
      success: false,
      locked: true,
      retryAfterSeconds: remainingSeconds,
      message: `Too many failed attempts. Try again in ${remainingSeconds} seconds.`,
    };
  }

  return {
    success: true,
  };
};

const verifyPassword = async (plainPassword: string) => {
  const now = Date.now();
  const loginAttempt = store.get("log_in_attempt");

  const isMatch = await checkMatch(plainPassword);

  if (isMatch) {
    authSession.login();
    store.set("log_in_attempt", {
      count: 0,
      lockoutUntil: 0,
      lastSeenTime: now,
    });

    return {
      success: true,
      locked: false,
      message: "Success",
    };
  }

  const newCount = loginAttempt.count + 1;
  let lockoutUntil = 0;

  if (newCount >= MAX_ATTEMPTS) {
    lockoutUntil = now + LOCKOUT_MS;
  }

  store.set("log_in_attempt", {
    count: newCount,
    lockoutUntil,
    lastSeenTime: now,
  });

  if (lockoutUntil > 0) {
    const remainingSeconds = Math.ceil(LOCKOUT_MS / 1000);
    return {
      success: false,
      locked: true,
      retryAfterSeconds: remainingSeconds,
      message: "Too many incorrect attempts. App locked for 15 minutes.",
    };
  }

  const remainingAttempts = MAX_ATTEMPTS - newCount;
  return {
    success: false,
    locked: false,
    remainingAttempts,
    message: `Incorrect password. ${remainingAttempts} attempt(s) remaining.`,
  };
};

export const authIPCs = () => {
  ipcMain.handle("auth:is-authenticated", () => {
    return authSession.isAuthenticated();
  });

  ipcMain.handle("auth:get-remain-time", () => {
    return timeSkipCheck();
  });

  ipcMain.handle("auth:has-password", () => {
    return authSession.hasPassword();
  });

  ipcMain.handle("auth:set-password", async (_, plainPassword) => {
    try {
      if (authSession.has2FA() && !twoFactorSession.is2FAVerified()) {
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

      await storedPassword(plainPassword);
      return { success: true };
    } catch (err) {
      return { success: false, message: "Failed to set password." };
    }
  });

  protectedHandle(
    "auth:change-password",
    async (_, oldPassword, newPassword) => {
      try {
        if (authSession.has2FA() && !twoFactorSession.is2FAVerified()) {
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

        const checkTimeSkip = timeSkipCheck();

        if (!checkTimeSkip?.success) {
          return checkTimeSkip;
        }

        const verify = await verifyPassword(oldPassword);

        if (verify.success) {
          await storedPassword(newPassword);
          return { success: true };
        } else {
          return verify;
        }
      } catch (err) {
        return { success: false, message: "Failed to change password." };
      }
    },
  );

  ipcMain.handle("auth:verify-password", async (_, plainPassword) => {
    const storedHash = store.get("user_password_hash");
    if (!storedHash) return { success: false, message: "No password set." };

    const checkTimeSkip = timeSkipCheck();

    if (!checkTimeSkip?.success) {
      return checkTimeSkip;
    }

    const verify = verifyPassword(plainPassword);

    return verify;
  });
};
