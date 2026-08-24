import i18next from "i18next";
import { replaceLocalDigit } from "./replace-local-digit";

export const changeTime = (date: Date) => {
  return replaceLocalDigit(
    date.toLocaleTimeString(i18next.language, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  );
};
