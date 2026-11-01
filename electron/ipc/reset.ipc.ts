import { app } from "electron";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { resetRepository } from "../repository/reset.repository";
import path from "path";
import fs from "fs-extra";
import { authSession } from "../auth/session/auth.session";
import { authService } from "../auth/services/auth.service";

export const resetIPCs = () => {
  protectedHandle("reset:all", async (_, password) => {
    try {
      const hasPassword = await authSession.hasPassword();

      if (hasPassword) {
        const passwordMatch = await authService.verifyPassword(password);

        if (!passwordMatch) {
          return { error: "Incorrect password" };
        }
      }

      await resetRepository.reset();
      const imagesDir = path.join(app.getPath("userData"), "images");

      await fs.remove(imagesDir);
      await fs.mkdir(imagesDir, { recursive: true });

      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
};
