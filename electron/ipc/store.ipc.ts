import { ipcMain } from "electron";
import { store, StoreSchema } from "../store";

export const storeIPCs = () => {
  ipcMain.handle(
    "store:get",
    async (_, key: Exclude<keyof StoreSchema, "user_password_hash">) => {
      if ((key as string) === "user_password_hash") {
        return null;
      }
      const result = (await store.get(key)) ?? null;
      return result;
    },
  );
  ipcMain.handle(
    "store:set",
    async (
      _,
      key: Exclude<keyof StoreSchema, "user_password_hash">,
      value: string,
    ) => {
      if ((key as string) === "user_password_hash") {
        return;
      }
      await store.set(key, value);
    },
  );
  ipcMain.handle(
    "store:delete",
    async (_, key: Exclude<keyof StoreSchema, "user_password_hash">) => {
      if ((key as string) === "user_password_hash") {
        return;
      }
      await store.delete(key);
    },
  );
};
