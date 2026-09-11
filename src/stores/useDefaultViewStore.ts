import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { electronStorage } from "./electronStorage";

export type View = "grid" | "list";

interface ViewState {
  view: View;
  setView: (view: View) => void;
}

export const useDefaultViewStore = create<ViewState>()(
  persist(
    (set) => ({
      view: "grid",
      setView: (view) => {
        set({ view });
      },
    }),
    {
      name: "defaultView",
      storage: createJSONStorage(() => electronStorage),
    },
  ),
);
