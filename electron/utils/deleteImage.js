import fs from "fs";
import path from "path";
import { app } from "electron";

export const deleteImage = async (fileName) => {
  if (!fileName) return false;

  try {
    const imagesDir = path.join(app.getPath("userData"), "images");
    const filePath = path.join(imagesDir, fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn("File not found:", filePath);
      return false;
    }

    await fs.promises.unlink(filePath);

    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};
