import fs from "fs";
import path from "path";
import { app } from "electron";

export const saveImage = async (
  image: ArrayBuffer | null | undefined,
  originalFileName: string,
) => {
  if (!image) return null;

  const imageBuffer = Buffer.from(new Uint8Array(image));

  const imagesDir = path.join(app.getPath("userData"), "images");

  if (!fs.existsSync(imagesDir)) {
    await fs.promises.mkdir(imagesDir, { recursive: true });
  }

  const ext = path.extname(originalFileName);
  const uniqueFileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filePath = path.join(imagesDir, uniqueFileName);

  await fs.promises.writeFile(filePath, imageBuffer);

  return uniqueFileName;
};
