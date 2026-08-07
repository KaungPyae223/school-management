import Store from "electron-store";

interface StoreSchema {
  mode: string;
  colorScheme: string;
}

export const store = new Store<StoreSchema>({
  defaults: {
    mode: JSON.stringify({ state: { mode: "system" }, version: 0 }),
    colorScheme: JSON.stringify({
      state: { colorScheme: "default" },
      version: 0,
    }),
  },
});
