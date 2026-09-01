import { prisma } from "../db/prisma";
import { showImage } from "../utils/showImage";
import { Prisma } from "../../generated/prisma/client";
import { deleteImage } from "../utils/deleteImage";
import { saveImage } from "../utils/saveImage";
import { protectedHandle } from "../auth/protected-ipc";

export const paymentIPCs = () => {
  protectedHandle("payment:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      view = "outstanding",
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
    }

    const searchQuery =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.empty;

    const havingFilter =
      view === "outstanding"
        ? Prisma.sql`HAVING SUM(p.amount) IS NULL OR e.price - SUM(p.amount) > 0`
        : Prisma.empty;

    try {
      const [enrollments, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
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
            c.image as courseImage,
            cl.batch as batch,
            e.withdrawn
          FROM enrollments e
          LEFT JOIN payments p ON e.id = p.enrollmentId
          LEFT JOIN students s ON e.studentId = s.id
          LEFT JOIN classes cl ON e.classId = cl.id
          LEFT JOIN courses c ON cl.courseId = c.id
          ${searchQuery}
          GROUP BY e.id
          ${havingFilter}
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

  protectedHandle("payment:get-by-enrollment", async (_, id) => {
    try {
      const payments = await prisma.payment.findMany({
        where: { enrollmentId: id },
        orderBy: { createdAt: "desc" },
      });
      if (!payments) {
        return { error: "Payment not found", data: [] };
      }
      return {
        error: null,
        data: payments.map((payment) => ({
          ...payment,
          image: showImage(payment.image),
        })),
      };
    } catch (error: any) {
      return { error: error.message, data: null };
    }
  });

  protectedHandle("payment:delete", async (_, id) => {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id },
        select: { image: true },
      });

      if (!payment) {
        return { error: "Payment not found", data: null };
      }

      if (payment.image) {
        await deleteImage(payment.image);
      }

      await prisma.payment.delete({ where: { id } });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("payment:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.payment.create({
        data: {
          enrollmentId: restData.enrollmentId,
          amount: Number(restData.amount),
          image: imageUrl,
          description: restData.description,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
};
