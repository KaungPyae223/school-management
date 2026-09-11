import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { electronStorage } from "./electronStorage";
import { SUPPORTED_LANGUAGES } from "../translate/i18n";
import i18n from "../translate/i18n";

export type Language = (typeof SUPPORTED_LANGUAGES)[number]["value"];

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en-GB",
      setLanguage: (language: Language) => {
        i18n.changeLanguage(language);
        set({ language: language });
      },
    }),
    {
      name: "preferredLanguage",
      storage: createJSONStorage(() => electronStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          i18n.changeLanguage(state.language);
        }
      },
    },
  ),
);
