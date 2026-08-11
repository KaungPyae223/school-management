import Store from "electron-store";

export interface StoreSchema {
  user_password_hash: string | null;
  preferredLanguage: string;
  mode: string;
  colorScheme: string;
}

export const store = new Store<StoreSchema>({
  defaults: {
    user_password_hash: null,
    preferredLanguage: JSON.stringify({
      state: { language: "en-GB" },
      version: 0,
    }),
    mode: JSON.stringify({ state: { mode: "system" }, version: 0 }),
    colorScheme: JSON.stringify({
      state: { colorScheme: "default" },
      version: 0,
    }),
  },
});
