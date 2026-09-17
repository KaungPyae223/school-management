import type { StateStorage } from "zustand/middleware";
import { storeService } from "../services/store";

export const electronStorage: StateStorage = {
  getItem: async (name) => {
    return (await storeService.get(name)) ?? null;
  },
  setItem: async (name, value) => {
    window.electronStore.set(name, value);
  },
  removeItem: async (name) => {
    window.electronStore.delete(name);
  },
};
