// stores/color-scheme-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Mode = "dark" | "light" | "system";

interface ModeState {
  mode: Mode;
  activeMode: () => "dark" | "light";
  setMode: (mode: Mode) => void;
}

const getSystemMode = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      activeMode: () => {
        const { mode } = get();
        return mode === "system" ? getSystemMode() : mode;
      },
      setMode: (mode) => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        const activeMode = mode === "system" ? getSystemMode() : mode;

        root.classList.add(activeMode);

        set({ mode: mode });
      },
    }),
    {
      name: "mode",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const root = document.documentElement;
          root.classList.remove("light", "dark");

          const mode =
            state.mode === "system"
              ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
              : state.mode;

          root.classList.add(mode);
        }
      },
    },
  ),
);
