import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const paymentRepository = {
  async index(data: any) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      view = "outstanding",
    } = data;
    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "paidAmount",
        "remainingAmount",
        "lastPaidAt",
        "firstPaidAt",
        "totalPayments",
        "studentName",
        "studentPhone",
        "studentEmail",
        "courseName",
        "e.createdAt",
        "e.updatedAt",
      ]),
      { sort: "createdAt", direction: "asc" },
    );

    const skip = buildSkip(page, limit);

    const conditions = [];

    if (search) {
      conditions.push(
        Prisma.sql`(
          LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR
          LOWER(s.email) LIKE LOWER(${`%${search}%`}) OR
          LOWER(s.phone) LIKE LOWER(${`%${search}%`}) OR
          LOWER(c.name) LIKE LOWER(${`%${search}%`})
        )`,
      );
    }

    if (view === "outstanding") {
      conditions.push(Prisma.sql`e.withdrawn = 0`);
      conditions.push(Prisma.sql`COALESCE(ep.paidAmount, 0) < e.price`);
    }

    const searchQuery =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.empty;

    const [payments, total] = await Promise.all([
      prisma.$queryRaw<any[]>`
          WITH enrollment_payment AS (
            SELECT
            enrollmentId,
            SUM(p.amount) as paidAmount,
            MAX(p.createdAt) as lastPaidAt,
            MIN(p.createdAt) as firstPaidAt,
            COUNT(p.id) as paymentTimes
            FROM payments p
            GROUP BY p.enrollmentId
          )
          SELECT
            e.*,
            COALESCE(ep.paidAmount,0) as paidAmount,
            ep.lastPaidAt,
            ep.firstPaidAt,
            COALESCE(ep.paymentTimes,0) as paymentTimes,
            e.price - COALESCE(ep.paidAmount,0) as remainingAmount,
            s.name as studentName,
            s.phone as studentPhone,
            s.email as studentEmail,
            s.image as studentImage,
            c.name as courseName,
            c.image as courseImage,
            cl.batch as batch,
            e.withdrawn
          FROM enrollments e
          LEFT JOIN enrollment_payment ep ON e.id = ep.enrollmentId
          JOIN students s ON e.studentId = s.id
          JOIN classes cl ON e.classId = cl.id
          JOIN courses c ON cl.courseId = c.id
          ${searchQuery}
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
      prisma.$queryRaw<any[]>`
          WITH enrollment_payment AS (
            SELECT
            enrollmentId,
            SUM(p.amount) as paidAmount
            FROM payments p
            GROUP BY p.enrollmentId
          )
          SELECT
          COUNT(DISTINCT e.id) as total
          FROM enrollments e
          LEFT JOIN enrollment_payment ep ON e.id = ep.enrollmentId
          JOIN students s ON e.studentId = s.id
          JOIN classes cl ON e.classId = cl.id
          JOIN courses c ON cl.courseId = c.id
          ${searchQuery}
        `,
    ]);

    const totalData = total[0].total;

    return {
      payments,
      totalData,
    };
  },
  async getByEnrollment(enrollmentId: number) {
    return await prisma.payment.findMany({
      where: { enrollmentId },
      orderBy: { createdAt: "desc" },
    });
  },
  async show(id: number) {
    return await prisma.payment.findUnique({
      where: { id },
    });
  },
  async create(data: any) {
    return prisma.payment.create(data);
  },
  async delete(id: number) {
    return prisma.payment.delete({
      where: { id },
    });
  },
};
