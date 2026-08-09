import { ipcMain,safeStorage } from "electron";

export const authIPCs = () => {
  ipcMain.handle("auth:login", async (_, data) => {
    try {

        
    } catch (error: any) {
      return {
        error: error.message,
        data: [],
      };
    }
  });
};
