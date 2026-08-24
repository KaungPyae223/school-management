import i18n from "../translate/i18n";

export const translateError = (
  error: unknown,
  customT?: (key: string, options?: any) => string,
): string => {
  if (!error) return "";

  const t = customT || i18n.t.bind(i18n);

  let rawMessage = "";
  if (typeof error === "string") {
    rawMessage = error.trim();
  } else if (error instanceof Error) {
    rawMessage = error.message.trim();
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    rawMessage = String((error as any).message).trim();
  } else {
    rawMessage = String(error).trim();
  }

  if (!rawMessage) return "";

  // 1. Schedule conflict pattern
  const scheduleMatch = rawMessage.match(
    /Teacher has a schedule conflict on (.+?) at (.+?) to (.+?)\./i,
  );
  if (scheduleMatch) {
    const rawDays = scheduleMatch[1];
    const startTime = scheduleMatch[2];
    const endTime = scheduleMatch[3];

    const localizedDay = t(`classes.days.${rawDays}`, {
      defaultValue: rawDays,
    });

    return t("errors.teacherScheduleConflict", {
      days: localizedDay,
      startTime,
      endTime,
      defaultValue: rawMessage,
    });
  }

  // 2. Lockout with countdown
  const retryMatch = rawMessage.match(/Try again (?:in|after) (\d+) seconds/i);
  if (retryMatch) {
    const secs = retryMatch[1];
    return t("auth.login.lockedCountdown", {
      time: `${secs}${t("general.timeUnits.secondShort", "s")}`,
      defaultValue: rawMessage,
    });
  }

  // 3. Remaining attempts
  const attemptsMatch = rawMessage.match(
    /Incorrect password\.\s*(\d+)\s*attempt\(s\)\s*remaining/i,
  );
  if (attemptsMatch) {
    const count = parseInt(attemptsMatch[1], 10);
    return t("auth.login.attemptsRemaining", {
      count,
      defaultValue: rawMessage,
    });
  }

  // 4. Exact & substring matching for known Electron error messages
  const errorMap: Record<string, string> = {
    unauthorized: "errors.unauthorized",
    "please verify two-factor authentication first.": "errors.verify2FAFirst",
    "incorrect password.": "errors.incorrectPassword",
    "password cannot be set.": "errors.passwordCannotBeSet",
    "password cannot be empty.": "errors.passwordCannotBeEmpty",
    "no password set.": "errors.noPasswordSet",
    "secure storage is not available.": "errors.secureStorageUnavailable",
    "failed to set password.": "errors.failedToSetPassword",
    "failed to change password.": "errors.failedToChangePassword",
    "system clock tampering detected! lockout penalty applied.":
      "errors.systemClockTampered",
    "too many incorrect attempts. app locked for 15 minutes.":
      "errors.tooManyAttemptsLockout",
    "2fa is not configured.": "errors.twoFactorNotConfigured",
    "invalid 2fa code.": "errors.invalid2FACode",
    "no active 2fa setup session found.": "errors.noActive2FASession",
    "invalid verification code. check your authenticator app.":
      "errors.invalidVerificationCode",
    "failed to enable 2fa.": "errors.failedToEnable2FA",
    "verification failed.": "errors.verificationFailed",
    "failed to disable 2fa.": "errors.failedToDisable2FA",
    "backup code used successfully.": "errors.backupCodeUsed",
    "backup canceled by user.": "errors.backupCanceled",
    "backup file not found on disk.": "errors.backupFileNotFound",
    "password is required to decrypt backup.": "errors.passwordRequiredDecrypt",
    "please select a zip backup.": "errors.selectZipBackup",
    "backup file is missing app.db or images folder.":
      "errors.backupMissingFiles",
    "backup file is missing database or images folder.":
      "errors.backupMissingFiles",
    "failed to restore backup.": "errors.failedToRestoreBackup",
    "class has linked students": "errors.classHasLinkedStudents",
    "class has linked enrollments. cannot delete":
      "errors.classHasLinkedStudents",
    "class not found": "errors.classNotFound",
    "class not found.": "errors.classNotFound",
    "class is finished": "errors.classIsFinished",
    "active class cannot be deleted": "errors.activeClassCannotDelete",
    "active class cannot be updated": "errors.activeClassCannotUpdate",
    "course has linked classes": "errors.courseHasLinkedClasses",
    "course has linked classes. cannot delete": "errors.courseHasLinkedClasses",
    "deleted course cannot be updated": "errors.deletedCourseCannotUpdate",
    "course not found": "errors.courseNotFound",
    "course not found.": "errors.courseNotFound",
    "student not found": "errors.studentNotFound",
    "student not found.": "errors.studentNotFound",
    "student has linked enrollment. cannot delete":
      "errors.studentHasLinkedEnrollment",
    "student has linked enrollments": "errors.studentHasLinkedEnrollment",
    "teacher not found": "errors.teacherNotFound",
    "teacher not found.": "errors.teacherNotFound",
    "teacher has linked classes": "errors.teacherHasLinkedClasses",
    "teacher has linked classes. cannot delete":
      "errors.teacherHasLinkedClasses",
    "deleted teacher cannot be updated": "errors.deletedTeacherCannotUpdate",
    "enrollment already exists": "errors.enrollmentAlreadyExists",
    "payment not found": "errors.paymentNotFound",
    "payment not found.": "errors.paymentNotFound",
    "you pay exceed the price": "errors.paymentExceedsPrice",
    "payment exceeds course price": "errors.paymentExceedsPrice",
  };

  const normalized = rawMessage.toLowerCase().trim();

  // Direct map lookup
  if (errorMap[normalized]) {
    return t(errorMap[normalized]);
  }

  // Check 7zip wrong password or archive corruption errors
  if (
    normalized.includes("wrong password") ||
    normalized.includes("cannot open the file as archive") ||
    normalized.includes("unsupported command")
  ) {
    return t("errors.backupWrongPassword");
  }

  // Substring match for known errors
  for (const [key, translationKey] of Object.entries(errorMap)) {
    if (normalized.includes(key)) {
      return t(translationKey);
    }
  }

  return rawMessage;
};
