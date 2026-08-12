import { ipcMain, IpcMainInvokeEvent } from "electron";
import { authSession } from "./auth-session";
import { error } from "node:console";

type Handler = (event: IpcMainInvokeEvent, ...args: any) => unknown;

export function protectedHandle(channel: string, handler: Handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (!authSession.isAuthenticated()) {
      return {
        success: false,
        error: "UNAUTHORIZED",
      };
    }

    return handler(event, ...args);
  });
}
