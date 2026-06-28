import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { showImage } from "../utils/showImage.js";
import { deleteImage } from "../utils/deleteImage.js";
import { Prisma } from "../../generated/prisma/index.js";

export const teacherIPCs = () => {
  ipcMain.handle("teacher:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      trash = null,
    } = data;

    const avilableSort = new Set([
      "t.createdAt",
      "t.updatedAt",
      "t.name",
      "t.phone",
      "t.email",
      "t.nrc",
      "total_classes",
      "total_students",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "t.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    try {
      const [teachers, totalData] = await Promise.all([
        prisma.$queryRaw`
          SELECT 
            t.*,
            COUNT(DISTINCT c.id) as total_classes,
            COUNT(DISTINCT e.studentID) as total_students
          FROM teachers as t
          LEFT JOIN classes as c ON t.id = c.teacherId
          LEFT JOIN enrollments as e ON c.id = e.classId
          WHERE t.deleted = ${!!trash}
          ${search ? Prisma.sql`AND (t.name LIKE LOWER(${`%${search}%`}) OR t.phone LIKE LOWER(${`%${search}%`}) OR t.email LIKE LOWER(${`%${search}%`}) OR t.address LIKE LOWER(${`%${search}%`}) OR t.nrc LIKE LOWER(${`%${search}%`}))` : Prisma.empty}
          GROUP BY t.id
          ORDER BY ${Prisma.raw(`${finalSort} ${finalSortDirection}`)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.teacher.count({
          where: {
            ...(search && {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
                { nrc: { contains: search, mode: "insensitive" } },
              ],
            }),
            deleted: !!trash,
          },
        }),
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

  ipcMain.handle("teacher:search-all-active", async (_, data) => {
    try {
      const teachers = await prisma.teacher.findMany({
        where: {
          deleted: false,
          ...(data.search && {
            name: { contains: data.search },
          }),
        },
        select: { id: true, name: true, image: true },
      });
      return {
        data: teachers.map((teacher) => ({
          ...teacher,
          image: showImage(teacher.image),
        })),
      };
    } catch (error) {
      return { error: error.message };
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
          ...teacher,
          image: showImage(teacher.image),
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

      const existingTeacher = await prisma.teacher.findUnique({
        where: { id },
        select: { deleted: true, image: true },
      });

      if (existingTeacher.deleted) {
        return { success: false, error: "Deleted teacher cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingTeacher.image) {
          await deleteImage(existingTeacher.image);
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
      const hasLinkedClasses = await prisma.class.findFirst({
        where: { teacherId: id },
        select: { id: true },
      });

      if (hasLinkedClasses) {
        await prisma.teacher.update({
          where: { id },
          data: {
            deleted: true,
          },
        });
        return { success: true };
      }

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
