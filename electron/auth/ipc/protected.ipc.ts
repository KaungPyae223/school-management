import { ipcMain, IpcMainInvokeEvent } from "electron";
import { authSession } from "../session/auth.session";

type Handler = (event: IpcMainInvokeEvent, ...args: any) => unknown;

export function protectedHandle(channel: string, handler: Handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    if (!authSession.isAuthenticated() && authSession.hasPassword()) {
      return {
        success: false,
        error: "UNAUTHORIZED",
      };
    }

    return handler(event, ...args);
  });
}
