import { ipcMain } from "electron";
import { store } from "../store";

export const setupIPCs = () => {
  ipcMain.handle("setup:is-complete", () => {
    return store.get("setup");
  });
  ipcMain.handle("setup:complete", () => {
    store.set("setup", true);
  });
};
