import { prisma } from "../db/prisma";
import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { Prisma } from "../../generated/prisma/client";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";

export const courseIPCs = () => {
  protectedHandle("course:index", async (_, data) => {
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
      "total_students",
      "total_withdrawn_students",
      "total_teachers",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "c.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`AND (LOWER(c.name) LIKE LOWER(${`%${search}%`}) OR LOWER(c.description) LIKE LOWER(${`%${search}%`}))`
      : Prisma.empty;

    try {
      const [courses, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          WITH class_counts AS (
            SELECT
              cl.courseId,
              COUNT(cl.id) AS total_classes,
              COUNT(CASE WHEN cl.startDate <= datetime('now') AND cl.endDate IS NULL THEN cl.id END) AS total_active_classes,
              COUNT(DISTINCT cl.teacherId) AS total_teachers
            FROM classes cl
            GROUP BY cl.courseId
          ),
          enrollment_counts AS (
            SELECT cl.courseId,
              COUNT(e.id) as total_students,
              COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) as total_withdrawn_students
            FROM enrollments e
            LEFT JOIN classes cl ON cl.id = e.classId
            GROUP BY cl.courseId
          )
          SELECT
            c.*,
            COALESCE(cc.total_classes, 0) AS total_classes,
            COALESCE(cc.total_active_classes, 0) AS total_active_classes,
            COALESCE(ec.total_students, 0) AS total_students,
            COALESCE(ec.total_withdrawn_students, 0) AS total_withdrawn_students,
            COALESCE(cc.total_teachers, 0) AS total_teachers
          FROM courses c
          LEFT JOIN class_counts cc ON cc.courseId = c.id
          LEFT JOIN enrollment_counts ec ON ec.courseId = c.id
          WHERE c.deleted = ${!!trash}
          ${searchFilter}
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
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
        data: courses.map((course: any) => ({
          ...course,
          image: showImage(course.image),
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

  protectedHandle("course:search-all", async (_, data) => {
    const {
      search = "",
      page = 1,
      limit = 10,
      onlyActive = false,
      courseIDs = [],
    } = data;
    const skip = Number(page - 1) * Number(limit);

    try {
      const courses = await prisma.course.findMany({
        where: {
          ...(onlyActive && {
            deleted: false,
          }),
          ...(search && {
            name: { contains: search },
          }),
          ...(courseIDs &&
            courseIDs.length > 0 && {
              id: {
                in: courseIDs,
              },
            }),
        },
        select: { id: true, name: true, price: true, image: true },
        ...((!courseIDs || courseIDs.length === 0) && {
          take: limit,
          skip: skip,
        }),
      });
      return {
        data: courses.map((course) => ({
          ...course,
          image: showImage(course.image),
        })),
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("course:show", async (_, id) => {
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
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("course:show-detail", async (_, id) => {
    try {
      const course = await prisma.$queryRaw<any[]>`
          WITH class_counts AS (
            SELECT
              cl.courseId,
              COUNT(cl.id) AS total_classes,
              COUNT(CASE WHEN cl.startDate <= datetime('now') AND cl.endDate IS NULL THEN cl.id END) AS total_active_classes,
              COUNT(DISTINCT cl.teacherId) AS total_teachers,
              COUNT(CASE WHEN cl.startDate >= datetime('now') THEN cl.id END) AS total_upcoming_classes,
              COUNT(CASE WHEN cl.endDate IS NOT NULL THEN cl.id END) AS total_complete_classes
            FROM classes cl
            GROUP BY cl.courseId
          ),
          enrollment_counts AS (
            SELECT cl.courseId,
              COUNT(e.id) AS total_students,
              COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) AS total_withdrawn_students,
              SUM(e.price) AS total_revenue
            FROM enrollments e
            LEFT JOIN classes cl ON cl.id = e.classId
            GROUP BY cl.courseId
          )
          SELECT
            c.*,
            COALESCE(cc.total_active_classes, 0) AS total_active_classes,
            COALESCE(cc.total_classes, 0) AS total_classes,
            COALESCE(ec.total_students, 0) AS total_students,
            COALESCE(ec.total_withdrawn_students, 0) AS total_withdrawn_students,
            COALESCE(cc.total_teachers, 0) AS total_teachers,
            COALESCE(cc.total_upcoming_classes, 0) AS total_upcoming_classes,
            COALESCE(cc.total_complete_classes, 0) AS total_complete_classes,
            COALESCE(ec.total_revenue, 0) AS total_revenue
          FROM courses c
          LEFT JOIN class_counts cc ON cc.courseId = c.id
          LEFT JOIN enrollment_counts ec ON ec.courseId = c.id
          WHERE c.id = ${id}
        `;
      if (!course) {
        return { error: "Course not found" };
      }
      return {
        data: {
          ...course[0],
          image: showImage(course[0].image),
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("course:get-course-classes", async (_, data) => {
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
      "teacher_name",
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
      LOWER(t.name) LIKE LOWER(${`%${search}%`}) 
    )`
      : Prisma.empty;

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          SELECT
          cl.*,
          t.name as teacher_name,
          t.email as teacher_email,
          t.image as teacher_image,
          COUNT(DISTINCT e.studentID) AS total_students
          FROM classes cl
          LEFT JOIN teachers t ON t.id = cl.teacherId
          LEFT JOIN enrollments e ON e.classId = cl.id
          WHERE cl.courseId = ${id}
          ${searchFilter}
          GROUP BY cl.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.class.count({
          where: {
            courseId: id,
            ...(search && {
              teacher: { name: { contains: search } },
            }),
          },
        }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: classes.map((classData) => ({
          ...classData,
          image: showImage(classData.teacher_image),
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

  protectedHandle("course:create", async (_, data) => {
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
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const existingCourse = await prisma.course.findUnique({
        where: { id },
        select: { deleted: true, image: true },
      });

      if (existingCourse?.deleted) {
        return { success: false, error: "Deleted course cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingCourse?.image) {
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
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:delete", async (_, id) => {
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
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:restore", async (_, id) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
        select: { image: true },
      });

      if (!course) {
        return { success: false, error: "Course not found." };
      }

      await prisma.course.update({
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
