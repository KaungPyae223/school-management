import { prisma } from "../db/prisma";
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

    const teacherSort = finalSort.startsWith("t.")
      ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
          finalSortDirection,
        )} LIMIT ${limit} OFFSET ${skip}`
      : Prisma.empty;

    const metaSort = !finalSort.startsWith("t.")
      ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
          finalSortDirection,
        )} LIMIT ${limit} OFFSET ${skip}`
      : Prisma.empty;

    try {
      const [teachers, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          WITH
          teacher_query AS (
            SELECT 
              id 
            FROM teachers t
            WHERE t.deleted = ${!!trash} 
            ${searchFilter}
            ${teacherSort}
          ),
          teacher_meta AS (
            SELECT c.teacherId, 
            COUNT(DISTINCT e.studentID) AS total_students,
            COUNT(DISTINCT c.id) AS total_classes
            FROM classes c
            JOIN teacher_query tq ON tq.id = c.teacherId
            LEFT JOIN enrollments e ON e.classId = c.id
            GROUP BY c.teacherId
            ${metaSort}
          )
          SELECT
            t.*,
            COALESCE(tm.total_classes, 0) AS total_classes,
            COALESCE(tm.total_students, 0) AS total_students
          FROM teachers t
          JOIN teacher_query tq ON tq.id = t.id
          LEFT JOIN teacher_meta tm ON tm.teacherId = t.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.teacher.count({
          where: {
            ...(search && {
              OR: [
                { name: { contains: search } },
                { phone: { contains: search } },
                { email: { contains: search } },
                { address: { contains: search } },
                { nrc: { contains: search } },
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
      "withdrawn_students",
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
          COUNT(DISTINCT e.id) AS total_students,
          COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students
          FROM classes cl
          JOIN courses c ON c.id = cl.courseId
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

  protectedHandle("teacher:search-all", async (_, data) => {
    const {
      search = "",
      page = 1,
      limit = 10,
      onlyActive = false,
      teacherIDs = [],
    } = data;
    const skip = Number(page - 1) * Number(limit);

    try {
      const teachers = await prisma.teacher.findMany({
        select: { id: true, name: true, image: true },
        where: {
          ...(onlyActive && {
            deleted: false,
          }),
          ...(search && {
            OR: [
              { name: { contains: search } },
              { phone: { contains: search } },
              { email: { contains: search } },
              { nrc: { contains: search } },
            ],
          }),
          ...(teacherIDs &&
            teacherIDs.length > 0 && {
              id: {
                in: teacherIDs,
              },
            }),
        },
        ...((!teacherIDs || teacherIDs.length === 0) && {
          take: limit,
          skip: skip,
        }),
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

  protectedHandle("teacher:show-details", async (_, id) => {
    try {
      const teacher = await prisma.$queryRaw<any[]>`
       WITH 
          teacher_classes AS (
            SELECT 
              id 
            FROM classes c
            WHERE c.teacherId = ${id}
          ),
          classes_revenue AS (
            SELECT e.classId, 
            SUM(p.amount) AS total_revenue,
            COUNT(DISTINCT e.studentID) AS total_students,
            COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students
            FROM enrollments e
            LEFT JOIN payments p ON p.enrollmentId = e.id
            JOIN teacher_classes tc ON tc.id = e.classId
            GROUP BY e.classId
          ),
          teacher_meta AS (
            SELECT c.teacherId, 
            COUNT(DISTINCT c.courseId) AS total_courses,
            COUNT(DISTINCT c.id) AS total_classes,
            COUNT(DISTINCT CASE WHEN c.endDate IS NULL THEN c.id END) AS total_active_classes,
            COALESCE(SUM(cr.total_revenue), 0) AS total_revenue,
            COALESCE(SUM(cr.total_students), 0) AS total_students,
            COALESCE(SUM(cr.withdrawn_students), 0) AS withdrawn_students
            FROM classes c
            LEFT JOIN classes_revenue cr ON cr.classId = c.id
            WHERE c.teacherId = ${id}
            GROUP BY c.teacherId
          )
          SELECT
            t.*,
            COALESCE(tm.total_classes, 0) AS total_classes,
            COALESCE(tm.total_students, 0) AS total_students,
            COALESCE(tm.total_courses, 0) AS total_courses,
            COALESCE(tm.withdrawn_students, 0) AS withdrawn_students,
            COALESCE(tm.total_active_classes, 0) AS total_active_classes,
            COALESCE(tm.total_revenue, 0) AS total_revenue
          FROM teachers t
          LEFT JOIN teacher_meta tm ON tm.teacherId = t.id
          WHERE t.id = ${id}
      `;
      if (!teacher) {
        return { error: "Teacher not found" };
      }
      return {
        data: {
          ...teacher[0],
          image: showImage(teacher[0].image),
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("teacher:create", async (_, data) => {
    try {
      const { image, imageName, nrc, email, phone, ...restData } = data;

      if (nrc !== null) {
        const checkNRC = await prisma.teacher.findFirst({
          where: {
            nrc,
          },
        });

        if (checkNRC) {
          return { success: false, error: "NRC already exists" };
        }
      }

      if (email !== null) {
        const checEmail = await prisma.teacher.findFirst({
          where: {
            email,
          },
        });

        if (checEmail) {
          return { success: false, error: "Email already exists" };
        }
      }

      if (phone !== null) {
        const checPhone = await prisma.teacher.findFirst({
          where: {
            phone,
          },
        });

        if (checPhone) {
          return { success: false, error: "Phone already exists" };
        }
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.teacher.create({
        data: {
          ...restData,
          ...(imageUrl ? { image: imageUrl } : {}),
          phone,
          email,
          nrc,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:update", async (_, data) => {
    try {
      const { id, image, imageName, nrc, email, phone, ...restData } = data;

      if (nrc !== null) {
        const checkNRC = await prisma.teacher.findFirst({
          where: {
            nrc,
            id: { not: id },
          },
        });

        if (checkNRC) {
          return { success: false, error: "NRC already exists" };
        }
      }

      if (email !== null) {
        const checEmail = await prisma.teacher.findFirst({
          where: {
            email,
            id: { not: id },
          },
        });

        if (checEmail) {
          return { success: false, error: "Email already exists" };
        }
      }

      if (phone !== null) {
        const checPhone = await prisma.teacher.findFirst({
          where: {
            phone,
            id: { not: id },
          },
        });

        if (checPhone) {
          return { success: false, error: "Phone already exists" };
        }
      }

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
