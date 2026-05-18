import fs from "fs";
import path from "path";
import { app } from "electron";

export const saveImage = (imageBuffer, originalFileName) => {
  const imagesDir = path.join(app.getPath("userData"), "images");

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const ext = path.extname(originalFileName);
  const uniqueFileName = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}${ext}`;

  const filePath = path.join(imagesDir, uniqueFileName);

  fs.writeFileSync(filePath, imageBuffer);

  return filePath;
};
