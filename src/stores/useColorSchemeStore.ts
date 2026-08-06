// stores/color-scheme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorScheme = "default" | "blue" | "red" | "pink" | "orange";
const COLOR_SCHEMES: ColorScheme[] = [
  "default",
  "blue",
  "red",
  "pink",
  "orange",
];

interface ColorSchemeState {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

export const useColorSchemeStore = create<ColorSchemeState>()(
  persist(
    (set) => ({
      colorScheme: "default",
      setColorScheme: (scheme) => {
        const root = document.documentElement;
        COLOR_SCHEMES.forEach((s) => root.classList.remove(`theme-${s}`));
        if (scheme !== "default") root.classList.add(`theme-${scheme}`);
        set({ colorScheme: scheme });
      },
    }),
    {
      name: "color-scheme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const root = document.documentElement;
          COLOR_SCHEMES.forEach((s) => root.classList.remove(`theme-${s}`));
          if (state.colorScheme !== "default") {
            root.classList.add(`theme-${state.colorScheme}`);
          }
        }
      },
    },
  ),
);
