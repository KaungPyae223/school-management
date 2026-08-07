import { ipcMain } from "electron";
import { store } from "../store";

export const storeIPCs = () => {
  ipcMain.handle(
    "store:get",
    (_, key: string) => store.get(key as any) ?? null,
  );
  ipcMain.handle("store:set", (_, key: string, value: string) => {
    store.set(key as any, value);
  });
  ipcMain.handle("store:delete", (_, key: string) => {
    store.delete(key as any);
  });
};
