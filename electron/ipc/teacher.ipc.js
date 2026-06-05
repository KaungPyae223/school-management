import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { showImage } from "../utils/showImage.js";
import { deleteImage } from "../utils/deleteImage.js";

export const teacherIPCs = () => {
  ipcMain.handle("teacher:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set([
      "createdAt",
      "updatedAt",
      "name",
      "phone",
      "email",
      "address",
      "nrc",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } },
            { nrc: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    try {
      const [teachers, totalData] = await Promise.all([
        prisma.teacher.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            [finalSort]: finalSortDirection,
          },
        }),
        prisma.teacher.count({ where }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: teachers.map((teacher) => ({
          ...teacher,
          image: showImage(teacher.image),
        })),
        meta: { total_data: totalData, total_pages, page, limit },
      };
    } catch (error) {
      return {
        error: error.message,
        data: [],
        meta: {
          total_data: 0,
          total_pages: 0,
          page: 0,
          limit: 0,
        },
      };
    }
  });

  ipcMain.handle("teacher:show", async (_, id) => {
    try {
      const teacher = await prisma.teacher.findUnique({
        where: { id },
      });
      if (!teacher) {
        return { error: "Teacher not found" };
      }
      return {
        data: {
          ...student,
          image: showImage(student.image),
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("teacher:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.teacher.create({
        data: {
          ...restData,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("teacher:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        const { image: oldImage } = await prisma.teacher.findUnique({
          where: { id },
          select: { image: true },
        });

        if (oldImage) {
          await deleteImage(oldImage);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await prisma.teacher.update({
        where: { id },
        data: {
          ...restData,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("teacher:delete", async (_, id) => {
    try {
      const { image } = await prisma.teacher.findUnique({
        where: { id },
        select: { image: true },
      });

      if (image) {
        await deleteImage(image);
      }

      await prisma.teacher.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
