import Store from "electron-store";

export interface StoreSchema {
  log_in_attempt: {
    count: number;
    lockoutUntil: number;
    lastSeenTime: number;
  };
  user_password_hash: string | null;
  preferredLanguage: string;
  mode: string;
  colorScheme: string;
  temp_2fa_secret: string | null;
  two_factor_secret: string | null;
  two_factor_backup_codes: string | null;
}

export const store = new Store<StoreSchema>({
  defaults: {
    log_in_attempt: {
      count: 0,
      lockoutUntil: 0,
      lastSeenTime: 0,
    },
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
    temp_2fa_secret: null,
    two_factor_secret: null,
    two_factor_backup_codes: null,
  },
});
