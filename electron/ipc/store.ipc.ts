import { ipcMain } from "electron";
import { store, StoreSchema } from "../store";
import { protectedHandle } from "../auth/protected-ipc";

export const storeIPCs = () => {
  protectedHandle("store:get", async (_, key: keyof StoreSchema) => {
    if (key === "user_password_hash" || key === "log_in_attempt") {
      return null;
    }
    const result = (await store.get(key)) ?? null;
    return result;
  });
  protectedHandle(
    "store:set",
    async (_, key: keyof StoreSchema, value: string) => {
      if (key === "user_password_hash" || key === "log_in_attempt") {
        return;
      }
      await store.set(key, value);
    },
  );
  protectedHandle("store:delete", async (_, key: keyof StoreSchema) => {
    if (key === "user_password_hash" || key === "log_in_attempt") {
      return;
    }
    await store.delete(key);
  });
};
