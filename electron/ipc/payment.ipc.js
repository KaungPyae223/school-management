import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { showImage } from "../utils/showImage.js";
import { Prisma } from "../../generated/prisma/index.js";

export const paymentIPCs = () => {
  ipcMain.handle("payment:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set([
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
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "e.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER(s.email) LIKE LOWER(${`%${search}%`}) OR
      LOWER(s.phone) LIKE LOWER(${`%${search}%`}) OR
      LOWER(c.name) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    try {
      const [enrollments, totalData] = await Promise.all([
        prisma.$queryRaw`
          SELECT
            e.*,
            SUM(p.amount) as paidAmount,
            MAX(p.createdAt) as lastPaidAt,
            MIN(p.createdAt) as firstPaidAt,
            COUNT(p.id) as paymentTimes,
            e.price - SUM(p.amount) as remainingAmount,
            s.name as studentName,
            s.phone as studentPhone,
            s.email as studentEmail,
            s.image as studentImage,
            c.name as courseName,
            c.image as courseImage
          FROM enrollments e
          LEFT JOIN payments p ON e.id = p.enrollmentId
          LEFT JOIN students s ON e.studentId = s.id
          LEFT JOIN classes cl ON e.classId = cl.id
          LEFT JOIN courses c ON cl.courseId = c.id
          ${searchFilter}
          GROUP BY e.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.enrollment.count(),
      ]);

      const totalPages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: enrollments.map((enrollment) => ({
          ...enrollment,
          studentImage: showImage(enrollment.studentImage),
          courseImage: showImage(enrollment.courseImage),
        })),
        meta: { total_data: totalData, total_pages: totalPages, page, limit },
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
};
