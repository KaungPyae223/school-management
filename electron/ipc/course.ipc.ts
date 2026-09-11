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
      "withdrawn_students",
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

    const courseSort = finalSort.startsWith("c.")
      ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
          finalSortDirection,
        )} LIMIT ${limit} OFFSET ${skip}`
      : Prisma.empty;

    const metaSort = !finalSort.startsWith("c.")
      ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
          finalSortDirection,
        )} LIMIT ${limit} OFFSET ${skip}`
      : Prisma.empty;

    try {
      const [courses, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          WITH 
          course_query AS (
            SELECT 
              c.id,
            FROM courses c 
            WHERE c.deleted = ${!!trash}
            ${searchFilter} 
            ${courseSort}
           ),
          course_meta AS (
            SELECT
              cl.courseId,
              COUNT(DISTINCT cl.id) AS total_classes,
              COUNT(DISTINCT CASE WHEN cl.startDate <= datetime('now') AND cl.endDate IS NULL THEN cl.id END) AS total_active_classes,
              COUNT(DISTINCT cl.teacherId) AS total_teachers,
              COUNT(DISTINCT e.id) as total_students,
              COUNT(DISTINCT CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students
            FROM classes cl
            LEFT JOIN enrollments e ON e.classId = cl.id
            JOIN course_query cq ON cq.id = cl.courseId
            GROUP BY cl.courseId
            ${metaSort}
          )
          SELECT
            c.*,
            COALESCE(cm.total_classes, 0) AS total_classes,
            COALESCE(cm.total_active_classes, 0) AS total_active_classes,
            COALESCE(cm.total_students, 0) AS total_students,
            COALESCE(cm.withdrawn_students, 0) AS withdrawn_students,
            COALESCE(cm.total_teachers, 0) AS total_teachers
          FROM courses c
          LEFT JOIN course_meta cm ON cm.courseId = c.id
          JOIN course_query cq ON cq.id = c.id 
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

  protectedHandle("course:show-details", async (_, id) => {
    try {
      const course = await prisma.$queryRaw<any[]>`
          WITH
          course_classes AS (
            SELECT 
            cl.id
            FROM classes cl
            WHERE cl.courseId = ${id}
          ),
          total_revenue AS (
            SELECT 
            e.classId,
            COUNT(DISTINCT e.id) as total_students,
            COUNT(DISTINCT CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students,
            SUM(p.amount) as total_revenue   
            FROM enrollments e
            JOIN course_classes cc ON e.classId = cc.id
            LEFT JOIN payments p on e.id = p.enrollmentId
            GROUP BY e.classId
          ),
          course_meta AS (
            SELECT
              cl.courseId,
              COUNT(cl.id) AS total_classes,
              COUNT(CASE WHEN cl.endDate IS NULL THEN cl.id END) AS total_active_classes,
              COUNT(DISTINCT cl.teacherId) AS total_teachers,
              COUNT(CASE WHEN cl.endDate IS NOT NULL THEN cl.id END) AS total_complete_classes,
              SUM(tr.total_revenue) AS total_revenue,
              SUM(tr.total_students) AS total_students,
              SUM(tr.withdrawn_students) AS withdrawn_students
            FROM classes cl
            JOIN total_revenue tr ON cl.id = tr.classId
            where cl.courseId = ${id}
            GROUP BY cl.courseId
          )
          SELECT
            c.*,
            COALESCE(cm.total_active_classes, 0) AS total_active_classes,
            COALESCE(cm.total_classes, 0) AS total_classes,
            COALESCE(cm.total_complete_classes, 0) AS total_complete_classes,
            COALESCE(cm.total_students, 0) AS total_students,
            COALESCE(cm.withdrawn_students, 0) AS withdrawn_students,
            COALESCE(cm.total_teachers, 0) AS total_teachers,
            COALESCE(cm.total_revenue, 0) AS total_revenue,
            COALESCE(CAST(COALESCE(cm.total_students, 0) / COALESCE(cm.total_classes, 0) AS INT),0) AS avg_class_per_student
          FROM courses c
          LEFT JOIN course_meta cm ON cm.courseId = c.id
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
      courseId,
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
      "withdrawn_students",
      "total_revenue",
      "remaining_amount",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "cl.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER (t.email) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
        WITH course_classes AS (
          SELECT cl.id FROM classes cl
          JOIN teachers t ON t.id = cl.teacherId
          WHERE cl.courseId = ${courseId}
          ${searchFilter}
        ),
        class_enrollments AS (
          SELECT
            classId,
            COUNT(DISTINCT e.id) as total_students,
            COUNT(DISTINCT CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students,
            SUM(p.amount) as total_revenue,
            SUM(CASE WHEN e.withdrawn = 0 THEN p.amount ELSE 0 END) as paid_amount,
            SUM(CASE WHEN e.withdrawn = 0 THEN e.price ELSE 0 END) as total_price
          FROM enrollments e
          JOIN course_classes cc ON cc.id = e.classId
          LEFT JOIN payments p ON p.enrollmentId = e.id
          GROUP BY e.classId
        )
          SELECT
          cl.*,
          t.name as teacher_name,
          t.email as teacher_email,
          t.image as teacher_image,
          COALESCE(ce.total_students, 0) as total_students,
          COALESCE(ce.withdrawn_students, 0) as withdrawn_students,
          COALESCE(ce.total_revenue, 0) as total_revenue,
          COALESCE(ce.total_price - ce.paid_amount, 0) as remaining_amount
          FROM classes cl
          JOIN teachers t ON t.id = cl.teacherId
          LEFT JOIN class_enrollments ce ON ce.classId = cl.id
          WHERE cl.courseId = ${courseId}
          ${searchFilter}
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.class.count({
          where: {
            courseId,
            ...(search && {
              teacher: {
                name: { contains: search },
                email: { contains: search },
              },
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
