import { ipcMain } from "electron";
import { store, StoreSchema } from "../store";

export const storeIPCs = () => {
  ipcMain.handle("store:get", async (_, key: keyof StoreSchema) => {
    const result = (await store.get(key)) ?? null;
    return result;
  });
  ipcMain.handle(
    "store:set",
    async (_, key: keyof StoreSchema, value: string) => {
      await store.set(key, value);
    },
  );
  ipcMain.handle("store:delete", async (_, key: keyof StoreSchema) => {
    await store.delete(key);
  });
};
