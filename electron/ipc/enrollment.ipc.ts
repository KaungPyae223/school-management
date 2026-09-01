import { prisma } from "../db/prisma";
import { saveImage } from "../utils/saveImage";
import { Prisma } from "../../generated/prisma/client";
import { showImage } from "../utils/showImage";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";

export const enrollmentIPCs = () => {
  protectedHandle("enrollment:create", async (_, data) => {
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

      const checkClass = await prisma.class.findUnique({
        where: {
          id: restData.classId,
        },
      });

      if (!checkClass) {
        return { success: false, error: "Class not found" };
      }

      if (
        generateStatus(checkClass.startDate, checkClass.endDate) === "complete"
      ) {
        return { success: false, error: "Class is finished" };
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

  protectedHandle("enrollment:show", async (_, id) => {
    try {
      const enrollment = await prisma.enrollment.findUnique({
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
      return {
        data: {
          ...enrollment,
          courseImage: showImage(enrollment?.class?.course.image),
          studentImage: showImage(enrollment?.student.image),
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("enrollment:delete", async (_, id) => {
    try {
      await prisma.enrollment.delete({
        where: {
          id,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("enrollment:toggleWithdraw", async (_, id: number) => {
    try {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!enrollment) {
        return { success: false, error: "Enrollment not found" };
      }

      const updatedEnrollment = await prisma.enrollment.update({
        where: {
          id: Number(id),
        },
        data: {
          withdrawn: !enrollment.withdrawn,
        },
      });

      return { success: true, data: updatedEnrollment };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("enrollment:getEnrollmentByClass", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search,
      sort = "e.createdAt",
      sortDirection = "desc",
      classId,
    } = data;

    const avilableSort = new Set([
      "studentName",
      "studentPhone",
      "studentEmail",
      "paidAmount",
      "remainingAmount",
      "e.createdAt",
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
      LOWER(s.phone) LIKE LOWER(${`%${search}%`})
    )`
      : Prisma.empty;

    try {
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
          LEFT JOIN students s ON e.studentId = s.id
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

      const totalPages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: enrollments.map((enrollment) => ({
          ...enrollment,
          image: showImage(enrollment.studentImage),
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
};
