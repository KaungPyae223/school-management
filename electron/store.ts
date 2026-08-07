import Store from "electron-store";

export interface StoreSchema {
  preferredLanguage: string;
  mode: string;
  colorScheme: string;
}

export const store = new Store<StoreSchema>({
  defaults: {
    preferredLanguage: JSON.stringify({
      state: { language: "en" },
      version: 0,
    }),
    mode: JSON.stringify({ state: { mode: "system" }, version: 0 }),
    colorScheme: JSON.stringify({
      state: { colorScheme: "default" },
      version: 0,
    }),
  },
});
