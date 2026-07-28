import path from "path";
import fs from "fs";
import { app } from "electron";

export const showImage = (fileName: string | null | undefined) => {
  if (!fileName) return null;

  const filePath = path.join(app.getPath("userData"), "images", fileName);

  if (!app.isPackaged) {
    if (!fs.existsSync(filePath)) return null;
    const data = fs.readFileSync(filePath);
    const ext = path.extname(fileName).slice(1);
    return `data:image/${ext};base64,${data.toString("base64")}`;
  }

  return `image://${filePath}`;
};
