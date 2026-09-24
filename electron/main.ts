import { app, BrowserWindow, Menu, protocol } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { registerIpcHandlers } from "./ipc/index";
import { applyMigrations } from "./db/migrator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // win.removeMenu();

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  win.once("ready-to-show", () => {
    win.maximize();
    win.show();
  });
}

app.disableHardwareAcceleration();

app.whenReady().then(async () => {
  await applyMigrations();

  protocol.registerFileProtocol("image", (request, callback) => {
    const filePath = decodeURIComponent(new URL(request.url).pathname);

    const safeBase = path.join(__dirname, "images");
    const requested = path.resolve(safeBase, filePath.replace(/^\/+/, ""));

    if (!requested.startsWith(safeBase)) {
      callback({ error: -6 });
      return;
    }

    callback({ path: requested });
  });

  registerIpcHandlers();

  createWindow();
});
