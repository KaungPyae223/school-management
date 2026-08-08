import i18next from "i18next";

export const changeTime = (date: Date) => {
  return date.toLocaleTimeString(i18next.language, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
