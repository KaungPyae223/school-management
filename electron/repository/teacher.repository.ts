import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const teacherRepository = {
  async index(data: any) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      trash = null,
      exportCSV = false,
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "t.createdAt",
        "t.updatedAt",
        "t.name",
        "t.phone",
        "t.email",
        "t.nrc",
        "total_classes",
        "total_students",
      ]),
      {
        sort: "t.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.phone) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.email) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.address) LIKE LOWER(${`%${search}%`}) OR
      LOWER(t.nrc) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    const teacherSort =
      !exportCSV && finalSort.startsWith("t.")
        ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
            finalSortDirection,
          )} LIMIT ${limit} OFFSET ${skip}`
        : Prisma.empty;

    const metaSort =
      !exportCSV && !finalSort.startsWith("t.")
        ? Prisma.sql`ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(
            finalSortDirection,
          )} LIMIT ${limit} OFFSET ${skip}`
        : Prisma.empty;

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
          ${exportCSV ? Prisma.empty : Prisma.sql`LIMIT ${limit} OFFSET ${skip}`}
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

    return { teachers, totalData };
  },
  async getTeacherClasses(data: any) {
    const {
      teacherId,
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
        "course_name",
        "cl.price",
        "cl.startDate",
        "cl.startTime",
        "total_students",
        "withdrawn_students",
      ]),
      {
        sort: "cl.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(c.name) LIKE LOWER(${`%${search}%`}) 
    )`
      : Prisma.empty;

    const [classes, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
        WITH teacher_classes AS (
          SELECT cl.id FROM classes cl
          JOIN courses c ON c.id = cl.courseId
          WHERE cl.teacherId = ${teacherId}
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
          JOIN teacher_classes tc ON tc.id = e.classId
          LEFT JOIN payments p ON p.enrollmentId = e.id
          GROUP BY e.classId
        )
          SELECT
          cl.*,
          c.name as course_name,
          c.image as course_image,
          COALESCE(ce.total_students, 0) as total_students,
          COALESCE(ce.withdrawn_students, 0) as withdrawn_students,
          COALESCE(ce.total_revenue, 0) as total_revenue,
          COALESCE(ce.total_price - ce.paid_amount, 0) as remaining_amount
          FROM classes cl
          JOIN courses c ON c.id = cl.courseId
          LEFT JOIN class_enrollments ce ON ce.classId = cl.id
          WHERE cl.teacherId = ${teacherId}
          ${searchFilter}
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
      prisma.class.count({
        where: {
          teacherId,
          ...(search && {
            course: { name: { contains: search } },
          }),
        },
      }),
    ]);

    return { classes, totalData };
  },
  async searchAll(data: any) {
    const {
      search = "",
      page = 1,
      limit = 10,
      onlyActive = false,
      teacherIDs = [],
    } = data;
    const skip = buildSkip(page, limit);
    return prisma.teacher.findMany({
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
  },
  async show(id: number) {
    return prisma.teacher.findUnique({
      where: { id },
    });
  },
  async showDetals(id: number) {
    return prisma.$queryRaw<any[]>`
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
  },
  async create(data: any) {
    prisma.teacher.create(data);
  },
  async createValidate(data: any) {
    const { nrc, email, phone } = data;

    const conditions = [];
    if (nrc !== null) conditions.push({ nrc });
    if (email !== null) conditions.push({ email });
    if (phone !== null) conditions.push({ phone });

    if (conditions.length > 0) {
      return await prisma.teacher.findFirst({
        where: { OR: conditions },
      });
    }
    return null;
  },
  async updateValidate(id: number, data: any) {
    const { nrc, email, phone } = data;

    const conditions = [];
    if (nrc !== null) conditions.push({ nrc });
    if (email !== null) conditions.push({ email });
    if (phone !== null) conditions.push({ phone });

    if (conditions.length > 0) {
      return await prisma.teacher.findFirst({
        where: { AND: [{ OR: conditions }, { id: { not: id } }] },
      });
    }
    return null;
  },
  async findLinkedClass(id: number) {
    return prisma.class.findFirst({
      where: { teacherId: id },
      select: { id: true },
    });
  },
  async update(id: number, data: any) {
    return prisma.teacher.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    return prisma.teacher.delete({
      where: { id },
    });
  },
};
