import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const courseRepository = {
  async index(data: any) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      trash = null,
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "c.name",
        "c.price",
        "c.createdAt",
        "c.updatedAt",
        "total_classes",
        "total_active_classes",
        "total_students",
        "withdrawn_students",
        "total_teachers",
      ]),
      {
        sort: "c.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

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

    const [courses, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
          WITH 
          course_query AS (
            SELECT 
              c.id
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

    return { courses, totalData };
  },
  async searchAll(data: any) {
    const {
      search = "",
      page = 1,
      limit = 10,
      onlyActive = false,
      courseIDs = [],
    } = data;

    const skip = buildSkip(page, limit);

    return prisma.course.findMany({
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
        skip: skip,
        take: limit,
      }),
    });
  },
  async show(id: number) {
    return prisma.course.findUnique({
      where: { id },
    });
  },
  async showDetails(id: number) {
    return prisma.$queryRaw<any[]>`
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
  },
  async showCourseClasses(data: any) {
    const {
      courseId,
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
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
      ]),
      {
        sort: "cl.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER (t.email) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

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
          JOIN course_classes cc ON cc.id = cl.id
          JOIN teachers t ON t.id = cl.teacherId
          LEFT JOIN class_enrollments ce ON ce.classId = cl.id
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

    return { classes, totalData };
  },
  async findLinkedClass(id: number) {
    return prisma.class.findFirst({
      where: { courseId: id },
      select: { id: true },
    });
  },
  async create(data: any) {
    prisma.course.create({ data });
  },
  async update(id: number, data: any) {
    return prisma.course.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    return prisma.course.delete({
      where: { id },
    });
  },
};
