import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { showImage } from "../utils/showImage.js";
import { deleteImage } from "../utils/deleteImage.js";

export const courseIPCs = () => {
  ipcMain.handle("course:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set(["createdAt", "updatedAt", "name", "price"]);
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
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    try {
      const [courses, totalData] = await Promise.all([
        prisma.course.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            [finalSort]: finalSortDirection,
          },
        }),
        prisma.course.count({ where }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: courses.map((course) => ({
          ...course,
          image: showImage(course.image),
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

  ipcMain.handle("course:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      const imageUrl = await saveImage(image, imageName);

      const course = await prisma.course.create({
        data: {
          ...restData,
          image: imageUrl,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("course:delete", async (_, id) => {
    try {
      const { image } = await prisma.course.findUnique({
        where: { id },
        select: { image: true },
      });

      if (image) {
        await deleteImage(image);
      }

      const course = await prisma.course.delete({
        where: { id },
      });
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
