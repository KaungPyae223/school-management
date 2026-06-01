import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { showImage } from "../utils/showImage.js";
import { deleteImage } from "../utils/deleteImage.js";

export const studentIPCs = () => {
  ipcMain.handle("student:index", async (_, data) => {
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
      "dob",
      "gender",
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
          ],
        }
      : {};

    try {
      const [students, totalData] = await Promise.all([
        prisma.student.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            [finalSort]: finalSortDirection,
          },
        }),
        prisma.student.count({ where }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: students.map((student) => ({
          ...student,
          image: showImage(student.image),
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

  ipcMain.handle("student:show", async (_, id) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id },
      });
      if (!student) {
        return { error: "Student not found" };
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

  ipcMain.handle("student:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.student.create({
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

  ipcMain.handle("student:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        const { image: oldImage } = await prisma.student.findUnique({
          where: { id },
          select: { image: true },
        });

        if (oldImage) {
          await deleteImage(oldImage);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await prisma.student.update({
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

  ipcMain.handle("student:delete", async (_, id) => {
    try {
      const { image } = await prisma.student.findUnique({
        where: { id },
        select: { image: true },
      });

      if (image) {
        await deleteImage(image);
      }

      await prisma.student.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
