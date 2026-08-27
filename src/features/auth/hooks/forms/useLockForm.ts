import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { authService } from "../../../../services/auth";

export const formatTime = (
  totalSeconds: number,
  minsUnit = "m",
  secsUnit = "s",
) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins > 0) {
    return `${mins}${minsUnit} ${secs.toString().padStart(2, "0")}${secsUnit}`;
  }
  return `${secs}${secsUnit}`;
};

export const useLockForm = (
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState<number>(0);
  const isLocked = countdown > 0;

  const getLockoutMessage = (seconds: number) => {
    const formatted = formatTime(
      seconds,
      t("general.timeUnits.minuteShort", { defaultValue: "m" }),
      t("general.timeUnits.secondShort", { defaultValue: "s" }),
    );
    return t("auth.login.lockedCountdown", { time: formatted });
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setErrorMessage("");
          return 0;
        }
        const next = prev - 1;
        setErrorMessage(getLockoutMessage(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, t]);

  useEffect(() => {
    authService.getRemainTime().then((res) => {
      if (!res.success && res.retryAfterSeconds) {
        setErrorMessage(getLockoutMessage(res.retryAfterSeconds));
        setCountdown(res.retryAfterSeconds);
      }
    });
  }, [t]);

  return {
    isLocked,
    setCountdown,
    formatTime: (sec: number) =>
      formatTime(
        sec,
        t("general.timeUnits.minuteShort", { defaultValue: "m" }),
        t("general.timeUnits.secondShort", { defaultValue: "s" }),
      ),
    getLockoutMessage,
  };
};
