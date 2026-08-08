import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./languages/en.json";
import myTranslation from "./languages/my.json";
import jaTranslation from "./languages/ja.json";

export const SUPPORTED_LANGUAGES = [
  { value: "my-MM", label: "မြန်မာ" },
  { value: "en-GB", label: "English" },
  { value: "ja-JP", label: "日本語" },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-GB": { translation: enTranslation },
      "my-MM": { translation: myTranslation },
      "ja-JP": { translation: jaTranslation },
    },
    fallbackLng: "en-GB",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
