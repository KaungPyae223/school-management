import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { showImage } from "../utils/showImage.js";
import { deleteImage } from "../utils/deleteImage.js";
import { Prisma } from "../../generated/prisma/index.js";

export const courseIPCs = () => {
  ipcMain.handle("course:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      trash = null,
    } = data;

    const avilableSort = new Set([
      "c.name",
      "c.price",
      "c.createdAt",
      "c.updatedAt",
      "total_classes",
      "total_active_classes",
      "total_enrollments",
      "total_teachers",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "c.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    try {
      const [courses, totalData] = await Promise.all([
        prisma.$queryRaw`
          SELECT
            c.*,
            COUNT(DISTINCT cl.id) as total_classes,
            COUNT(DISTINCT CASE WHEN cl.startDate >= datetime('now') AND cl.endDate IS NULL THEN cl.id END) as total_active_classes,
            COUNT(DISTINCT e.id) as total_enrollments,
            COUNT(DISTINCT t.id) as total_teachers
          FROM courses c
          LEFT JOIN classes cl ON c.id = cl.courseId
          LEFT JOIN enrollments e ON cl.id = e.classId
          LEFT JOIN teachers t ON cl.teacherId = t.id
          WHERE c.deleted = ${!!trash}
          ${search ? Prisma.sql`AND (c.name LIKE LOWER(${`%${search}%`}) OR c.description LIKE LOWER(${`%${search}%`}))` : Prisma.empty}
          GROUP BY c.id
          ORDER BY ${Prisma.raw(`${finalSort} ${finalSortDirection}`)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.course.count({
          where: {
            ...(search && {
              OR: [
                { name: { contains: search } },
                { description: { contains: search } },
              ],
            }),
            deleted: !!trash,
          },
        }),
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

  ipcMain.handle("course:search-all-active", async (_, data) => {
    try {
      const courses = await prisma.course.findMany({
        where: {
          deleted: false,
          ...(data.search && {
            name: { contains: data.search },
          }),
        },
        select: { id: true, name: true, price: true, image: true },
      });
      return {
        data: courses.map((course) => ({
          ...course,
          image: showImage(course.image),
        })),
      };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("course:show", async (_, id) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
      });
      if (!course) {
        return { error: "Course not found" };
      }
      return {
        data: {
          ...course,
          image: showImage(course.image),
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("course:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.course.create({
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

  ipcMain.handle("course:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const existingCourse = await prisma.course.findUnique({
        where: { id },
        select: { deleted: true, image: true },
      });

      if (existingCourse.deleted) {
        return { success: false, error: "Deleted course cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingCourse.image) {
          await deleteImage(existingCourse.image);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await prisma.course.update({
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

  ipcMain.handle("course:delete", async (_, id) => {
    try {
      const hasLinkedClasses = await prisma.class.findFirst({
        where: { courseId: id },
        select: { id: true },
      });

      if (hasLinkedClasses) {
        await prisma.course.update({
          where: { id },
          data: {
            deleted: true,
          },
        });
        return { success: true };
      }

      const course = await prisma.course.findUnique({
        where: { id },
        select: { image: true },
      });

      if (!course) {
        return { success: false, error: "Course not found." };
      }

      if (course.image) {
        await deleteImage(course.image);
      }

      await prisma.course.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
