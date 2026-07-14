import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { saveImage } from "../utils/saveImage.js";
import { deleteImage } from "../utils/deleteImage.js";
import { Prisma } from "../../generated/prisma/index.js";

export const enrollmentIPCs = () => {
  ipcMain.handle("enrollment:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      const checkExistingEnrollment = await prisma.enrollment.findFirst({
        where: {
          studentId: restData.studentId,
          classId: restData.classId,
        },
      });

      if (checkExistingEnrollment) {
        return { success: false, error: "Enrollment already exists" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      const enrollment = await prisma.enrollment.create({
        data: {
          studentId: restData.studentId,
          classId: restData.classId,
          price: restData.price,
        },
      });

      await prisma.payment.create({
        data: {
          enrollmentId: enrollment.id,
          amount: restData.price,
          image: imageUrl,
          description: restData.description,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("enrollment:delete", async (_, id) => {
    try {
      // find payments related to this enrollment and delete their image if exist
      const payments = await prisma.payment.findMany({
        where: {
          enrollmentId: id,
        },
      });

      for (const payment of payments) {
        if (payment.image) {
          await deleteImage(payment.image);
        }
      }

      // delete payments related to this enrollment
      await prisma.payment.deleteMany({
        where: {
          enrollmentId: id,
        },
      });

      // delete enrollment
      await prisma.enrollment.delete({
        where: {
          id,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("enrollment:getEnrollmentByClass", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search,
      sort = "createdAt",
      sortDirection = "desc",
      classId,
    } = data;

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`AND (
      LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR
      LOWER(s.email) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    try {
      const [enrollments, totalData] = await Promise.all([
        prisma.$queryRaw`
          SELECT
            e.*,
            SUM(p.amount) as paidAmount,
            e.price - SUM(p.amount) as remainingAmount,
            s.name as studentName,
            s.phone as studentPhone,
            s.email as studentEmail
          FROM enrollments e
          LEFT JOIN payments p ON e.id = p.enrollmentId
           JOIN students s ON e.studentId = s.id
          WHERE e.classId = ${classId}
          ${searchFilter}
          GROUP BY e.id
          ORDER BY ${Prisma.raw(sort)} ${Prisma.raw(sortDirection)}
          LIMIT ${limit} OFFSET ${skip}
        `,
        prisma.enrollment.count(),
      ]);

      const totalPages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: enrollments,
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
