import i18next from "i18next";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString(i18next.language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
