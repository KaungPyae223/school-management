import type { StateStorage } from "zustand/middleware";

export const electronStorage: StateStorage = {
  getItem: async (name) => {
    return (await window.electronStore.get(name)) ?? null;
  },
  setItem: async (name, value) => {
    window.electronStore.set(name, value);
  },
  removeItem: async (name) => {
    window.electronStore.delete(name);
  },
};
