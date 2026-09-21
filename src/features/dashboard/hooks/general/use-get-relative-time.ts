import { useTranslation } from "react-i18next";

export const useGetRelativeTime = (date: Date): string => {
  const { t, i18n } = useTranslation();

  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) {
    return t("general.invalidDate");
  }

  const diffInSeconds = Math.round((timestamp - Date.now()) / 1000);

  const formatter = new Intl.RelativeTimeFormat(i18n.language, {
    numeric: "always",
  });

  const units: Array<{
    unit: Intl.RelativeTimeFormatUnit;
    seconds: number;
  }> = [
    { unit: "year", seconds: 31_536_000 },
    { unit: "month", seconds: 2_592_000 },
    { unit: "week", seconds: 604_800 },
    { unit: "day", seconds: 86_400 },
    { unit: "hour", seconds: 3_600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds || unit === "second") {
      const value = Math.round(diffInSeconds / seconds);

      return formatter.format(value, unit);
    }
  }

  return t("general.justNow");
};
