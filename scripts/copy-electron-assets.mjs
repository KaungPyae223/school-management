// Copies the main-process side assets that esbuild cannot bundle.
// They are resolved at runtime with `__dirname` (the folder of
// dist-electron/main.js), so they must sit next to the built bundle.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "electron");
const target = path.join(root, "dist-electron");

fs.mkdirSync(target, { recursive: true });

for (const entry of ["preload.js", "loading.html", "assets"]) {
  fs.cpSync(path.join(source, entry), path.join(target, entry), {
    recursive: true,
  });
}
