import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveimage.js";

export const getAllCourses = () => {
  ipcMain.handle("course:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      order = "desc",
    } = data;

    const avilableSort = new Set([
      "createdAt",
      "updatedAt",
      "name",
      "description",
      "price",
    ]);
    const avilableOrder = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "createdAt";
    const finalOrder = avilableOrder.has(order) ? order : "desc";

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
            [finalSort]: finalOrder,
          },
        }),
        prisma.course.count({ where }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: courses,
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
};

export const createCourse = () => {
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
      return { success: true, data: course };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
