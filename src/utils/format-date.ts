import i18next from "i18next";
import { replaceLocalDigit } from "./replace-local-digit";

export const myanmarMonths = [
  "ဇန်နဝါရီ",
  "ဖေဖော်ဝါရီ",
  "မတ်",
  "ဧပြီ",
  "မေ",
  "ဇွန်",
  "ဇူလိုင်",
  "ဩဂုတ်",
  "စက်တင်ဘာ",
  "အောက်တိုဘာ",
  "နိုဝင်ဘာ",
  "ဒီဇင်ဘာ",
];

export const formatDate = (date: Date) => {
  if (i18next.language === "my-MM") {
    return replaceLocalDigit(
      `${date.getDate()} ${myanmarMonths[date.getMonth()]} ${date.getFullYear()}`,
    );
  }

  return date.toLocaleDateString(i18next.language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
