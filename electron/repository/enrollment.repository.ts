import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const enrollmentRepository = {
  async findExisting(studentId: number, classId: number) {
    return prisma.enrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });
  },
  async findClassById(id: number) {
    return prisma.class.findUnique({
      where: {
        id,
      },
    });
  },
  async create(data: any) {
    return prisma.enrollment.create({ data });
  },
  async createPayment(data: any) {
    return prisma.payment.create({ data });
  },
  async show(id: number) {
    return prisma.enrollment.findUnique({
      where: {
        id,
      },
      include: {
        student: true,
        class: {
          include: {
            course: true,
          },
        },
      },
    });
  },
  async delete(id: number) {
    return prisma.enrollment.delete({
      where: {
        id,
      },
    });
  },
  async findById(id: number) {
    return prisma.enrollment.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
  async updateWithdraw(id: number, withdrawn: boolean) {
    return prisma.enrollment.update({
      where: {
        id,
      },
      data: {
        withdrawn,
      },
    });
  },
  async getEnrollmentByClass(data: any) {
    const {
      page = 1,
      limit = 10,
      search,
      sort = "e.createdAt",
      sortDirection = "desc",
      classId,
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "studentName",
        "studentPhone",
        "studentEmail",
        "paidAmount",
        "remainingAmount",
        "e.createdAt",
      ]),
      {
        sort: "e.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER(s.email) LIKE LOWER(${`%${search}%`}) OR
      LOWER(s.phone) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    const [enrollments, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
        SELECT
          e.*,
          SUM(p.amount) as paidAmount,
          e.price - SUM(p.amount) as remainingAmount,
          s.name as studentName,
          s.phone as studentPhone,
          s.email as studentEmail,
          s.image as studentImage
        FROM enrollments e
        LEFT JOIN payments p ON e.id = p.enrollmentId
        JOIN students s ON e.studentId = s.id
        WHERE e.classId = ${classId}
        ${searchFilter}
        GROUP BY e.id
        ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
        LIMIT ${limit} OFFSET ${skip}
      `,
      prisma.enrollment.count({
        where: {
          classId,
          ...(search && {
            student: {
              OR: [
                { name: { contains: search } },
                { email: { contains: search } },
                { phone: { contains: search } },
              ],
            },
          }),
        },
      }),
    ]);

    return { enrollments, totalData };
  },
};
