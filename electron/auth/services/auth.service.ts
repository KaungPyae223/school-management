import bcrypt from "bcryptjs";
import { store } from "../../store";
import { safeStorage } from "electron";
import { authSession } from "../session/auth.session";

const SALT_ROUNDS = 10;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

export const authService = {
  storedPassword: async (password: string) => {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const encryptedHash = safeStorage.encryptString(passwordHash);

    store.set("user_password_hash", encryptedHash.toString("base64"));
  },

  checkMatch: async (password: string): Promise<boolean> => {
    const encryptedHash = store.get("user_password_hash");

    if (!encryptedHash) {
      return false;
    }

    const hash = safeStorage.decryptString(
      Buffer.from(encryptedHash, "base64"),
    );

    return bcrypt.compare(password, hash);
  },

  timeSkipCheck: () => {
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
  },

  verifyPassword: async (plainPassword: string) => {
    const now = Date.now();
    const loginAttempt = store.get("log_in_attempt");

    const isMatch = await authService.checkMatch(plainPassword);

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
  },
};
