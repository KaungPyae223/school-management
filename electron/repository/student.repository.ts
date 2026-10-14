import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const studentRepository = {
  async index(data: any) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      exportCSV = false,
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "s.createdAt",
        "s.updatedAt",
        "s.name",
        "s.phone",
        "s.email",
        "s.address",
        "s.dob",
        "s.gender",
        "total_classes",
        "withdrawn_classes",
      ]),
      {
        sort: "s.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

    const searchFilter = search
      ? Prisma.sql`WHERE 
        LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR 
        LOWER(s.phone) LIKE LOWER(${`%${search}%`}) OR 
        LOWER(s.address) LIKE LOWER(${`%${search}%`})`
      : Prisma.empty;

    const [students, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
        SELECT 
          s.*,
          COUNT(DISTINCT  e.id) as total_classes,
          COUNT(DISTINCT CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_classes
        FROM students s
        LEFT JOIN enrollments e ON s.id = e.studentID
        ${searchFilter}
        GROUP BY s.id
        ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
        ${exportCSV ? Prisma.empty : Prisma.raw(`LIMIT ${limit} OFFSET ${skip}`)}
      `,
      prisma.student.count({
        where: {
          ...(search && {
            OR: [
              { name: { contains: search } },
              { phone: { contains: search } },
              { email: { contains: search } },
              { address: { contains: search } },
            ],
          }),
        },
      }),
    ]);

    return { students, totalData };
  },
  async show(id: number) {
    return prisma.student.findUnique({
      where: { id },
    });
  },
  async showDetails(id: number) {
    return prisma.$queryRaw<any[]>`
      WITH total_payments AS (
        SELECT e.studentID, 
        SUM(p.amount) AS total_payments,
        SUM(CASE WHEN e.withdrawn = 0 THEN p.amount ELSE 0 END) as total_active_payments,
        SUM(CASE WHEN e.withdrawn = 0 THEN e.price ELSE 0 END) as total_active_amount,
        COUNT(DISTINCT e.id) as total_classes,
        COUNT(DISTINCT CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_classes
        FROM enrollments e
        LEFT JOIN payments p ON p.enrollmentId = e.id
        WHERE e.studentID = ${id}
        GROUP BY e.studentID
      )
      SELECT 
        s.*,
        COALESCE(tp.total_classes,0) as total_classes,
        COALESCE(tp.withdrawn_classes,0) as withdrawn_classes,
        COALESCE(tp.total_active_amount - tp.total_active_payments, 0) as total_remaining_amount,
        COALESCE(tp.total_payments, 0) as total_paid
      FROM students s
      LEFT JOIN total_payments tp ON tp.studentID = s.id
      WHERE s.id = ${id}
    `;
  },
  async searchAllActive(data: any) {
    const { search = "", page = 1, limit = 10 } = data;

    const skip = buildSkip(page, limit);

    return prisma.student.findMany({
      where: {
        ...(search && {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
          ],
        }),
      },
      select: { id: true, name: true, image: true },
      take: Number(limit),
      skip: Number(skip),
      orderBy: {
        name: "asc",
      },
    });
  },
  async createValidate(data: any) {
    const { email, phone } = data;

    const conditions = [];
    if (email !== null) conditions.push({ email });
    if (phone !== null) conditions.push({ phone });

    if (conditions.length > 0) {
      return await prisma.student.findFirst({
        where: { OR: conditions },
      });
    }
    return null;
  },
  async updateValidate(id: number, data: any) {
    const { email, phone } = data;

    const conditions = [];
    if (email !== null) conditions.push({ email });
    if (phone !== null) conditions.push({ phone });

    if (conditions.length > 0) {
      return await prisma.student.findFirst({
        where: { AND: [{ OR: conditions }, { id: { not: id } }] },
      });
    }
    return null;
  },
  async findImageById(id: number) {
    return prisma.student.findUnique({
      where: { id },
      select: { image: true },
    });
  },
  async hasLinkedEnrollment(id: number) {
    return prisma.enrollment.findFirst({
      where: {
        studentId: id,
      },
      select: { id: true },
    });
  },
  async create(data: any) {
    return prisma.student.create({ data });
  },
  async update(id: number, data: any) {
    return prisma.student.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    return prisma.student.delete({
      where: { id },
    });
  },
  async getAttendedClasses(data: any) {
    const {
      id = 0,
      page = 1,
      limit = 10,
      search = "",
      sort = "e.createdAt",
      sortDirection = "asc",
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "cl.startDate",
        "cl.startTime",
        "e.price",
        "teacher_name",
        "course_name",
        "remainingAmount",
        "e.createdAt",
      ]),
      {
        sort: "e.createdAt",
        direction: "asc",
      },
    );

    const skip = buildSkip(page, limit);

    const conditions = [];

    if (search) {
      conditions.push(
        Prisma.sql` LOWER(cl.description) LIKE LOWER(${`%${search}%`}) OR
        LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
        LOWER(c.name) LIKE LOWER(${`%${search}%`}) `,
      );
    }

    conditions.push(Prisma.sql` e.studentId = ${id}`);

    const searchQuery = Prisma.sql`WHERE (${Prisma.join(conditions, " AND ")})`;

    const [classes, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
        WITH enrollment_payments AS (
          SELECT
            e.classId,
            e.price - SUM(p.amount) as remainingAmount
          FROM enrollments e
          LEFT JOIN payments p ON p.enrollmentId = e.id
          WHERE e.studentID = ${id}
          GROUP BY e.classId
        )
        SELECT 
          e.*,
          cl.startDate,
          cl.startTime,
          cl.batch,
          cl.endTime,
          cl.days,
          t.name as teacher_name,
          t.email as teacher_email,
          t.image as teacher_image,
          c.name as course_name,
          e.id as enrollment_id,
          c.image as course_image,
          COALESCE(ep.remainingAmount, e.price) as remainingAmount
        FROM classes cl
        LEFT JOIN enrollment_payments ep ON ep.classId = cl.id
        JOIN enrollments e ON e.classId = cl.id
        JOIN teachers t ON cl.teacherId = t.id 
        JOIN courses c ON cl.courseId = c.id 
        ${searchQuery}
        GROUP BY cl.id
        ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
        LIMIT ${limit} OFFSET ${skip}
      `,
      prisma.class.count({
        where: {
          ...(search && {
            OR: [
              { description: { contains: search } },
              { teacher: { name: { contains: search } } },
              { course: { name: { contains: search } } },
            ],
          }),
          enrollments: {
            some: {
              studentId: id,
            },
          },
        },
      }),
    ]);

    return { classes, totalData };
  },
};
