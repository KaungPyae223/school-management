import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";

export const createCourse = () => {
  ipcMain.handle("course:create", async (_, data) => {
    try {
      const course = await prisma.course.create({
        data,
      });
      return { success: true, course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};

export const updateCourse = () => {
  ipcMain.handle("course:update", async (_, data) => {
    try {
      const course = await prisma.course.update({
        where: { id: data.id },
        data,
      });
      return { success: true, course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
