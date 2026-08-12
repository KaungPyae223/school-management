import { ipcMain } from "electron";
import { prisma } from "../../db/prisma";
import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { Prisma } from "../../generated/prisma/client";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";


export const teacherIPCs = () => {
  protectedHandle("teacher:index", async (_, data) => {
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

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.phone) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.email) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.address) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.nrc) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    try {
      const [teachers, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
           WITH class_counts AS (
            SELECT teacherId, COUNT(*) AS total_classes
            FROM classes
            GROUP BY teacherId
          ),
          student_counts AS (
            SELECT c.teacherId, COUNT(DISTINCT e.studentID) AS total_students
            FROM classes c
            LEFT JOIN enrollments e ON e.classId = c.id
            GROUP BY c.teacherId
          )
          SELECT
            t.*,
            COALESCE(cc.total_classes, 0) AS total_classes,
            COALESCE(sc.total_students, 0) AS total_students
          FROM teachers t
          LEFT JOIN class_counts cc ON cc.teacherId = t.id
          LEFT JOIN student_counts sc ON sc.teacherId = t.id
          WHERE t.deleted = ${!!trash}
          ${searchFilter}
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
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
    } catch (error: any) {
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

  protectedHandle("teacher:get-teacher-classes", async (_, data) => {
    const {
      id,
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set([
      "cl.createdAt",
      "cl.updatedAt",
      "course_name",
      "cl.price",
      "cl.startDate",
      "cl.startTime",
      "total_students",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "cl.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(c.name) LIKE LOWER(${`%${search}%`}) 
    )`
      : Prisma.empty;

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          SELECT
          cl.*,
          c.name as course_name,
          c.image as course_image,
          COUNT(DISTINCT e.studentID) AS total_students
          FROM classes cl
          LEFT JOIN courses c ON c.id = cl.courseId
          LEFT JOIN enrollments e ON e.classId = cl.id
          WHERE cl.teacherId = ${id}
          ${searchFilter}
          GROUP BY cl.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.class.count({
          where: {
            teacherId: id,
            ...(search && {
              course: { name: { contains: search } },
            }),
          },
        }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: classes.map((classData) => ({
          ...classData,
          image: showImage(classData.course_image),
          status: generateStatus(classData.startDate, classData.endDate),
        })),
        meta: { total_data: totalData, total_pages, page, limit },
      };
    } catch (error: any) {
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

  protectedHandle("teacher:search-all-active", async (_, data) => {
    const { search = "", page = 1, limit = 10 } = data;
    const skip = Number(page - 1) * Number(limit);

    try {
      const teachers = await prisma.teacher.findMany({
        select: { id: true, name: true, image: true },
        where: {
          deleted: false,
          ...(search && {
            OR: [
              { name: { contains: search } },
              { phone: { contains: search } },
              { email: { contains: search } },
              { nrc: { contains: search } },
            ],
          }),
        },
        take: 10,
        skip: skip,
      });
      return {
        data: teachers.map((teacher) => ({
          ...teacher,
          image: showImage(teacher.image),
        })),
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("teacher:show", async (_, id) => {
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
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("teacher:create", async (_, data) => {
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
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const existingTeacher = await prisma.teacher.findUnique({
        where: { id },
        select: { deleted: true, image: true },
      });

      if (existingTeacher?.deleted) {
        return { success: false, error: "Deleted teacher cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingTeacher?.image) {
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
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:delete", async (_, id) => {
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

      const teacherData = await prisma.teacher.findUnique({
        where: { id },
        select: { image: true },
      });

      if (teacherData?.image) {
        await deleteImage(teacherData.image);
      }

      await prisma.teacher.delete({
        where: { id },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:restore", async (_, id) => {
    try {
      await prisma.teacher.update({
        where: { id },
        data: {
          deleted: false,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
};
