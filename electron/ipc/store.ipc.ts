import { ipcMain } from "electron";
import { store, StoreSchema } from "../store";
import { protectedHandle } from "../auth/protected-ipc";

export const storeIPCs = () => {
  protectedHandle(
    "store:get",
    async (_, key: Exclude<keyof StoreSchema, "user_password_hash">) => {
      if ((key as string) === "user_password_hash") {
        return null;
      }
      const result = (await store.get(key)) ?? null;
      return result;
    },
  );
  protectedHandle(
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
  protectedHandle(
    "store:delete",
    async (_, key: Exclude<keyof StoreSchema, "user_password_hash">) => {
      if ((key as string) === "user_password_hash") {
        return;
      }
      await store.delete(key);
    },
  );
};
