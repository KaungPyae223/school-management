import { prisma } from "../db/prisma";
import { showImage } from "../utils/showImage";
import { Prisma } from "../../generated/prisma/client";
import { formatTime } from "../utils/formatTime";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";

export const dashboardIPCs = () => {
  protectedHandle("dashboard:kpi", async (_, data) => {
    try {
      const [students, teachers, classes, courses, enrollments, revenue] =
        await Promise.all([
          await prisma.student.groupBy({
            by: ["gender"],
            _count: {
              id: true,
            },
          }),
          await prisma.teacher.count({
            where: {
              deleted: false,
            },
          }),
          await prisma.class.count({
            where: {
              endDate: null,
            },
          }),
          await prisma.course.count({
            where: {
              deleted: false,
            },
          }),
          prisma.enrollment.count({
            where: {
              class: {
                endDate: null,
              },
            },
          }),
          await prisma.payment.aggregate({
            _sum: {
              amount: true,
            },
          }),
        ]);

      return { students, teachers, classes, courses, enrollments, revenue };
    } catch (error: any) {
      return { error: error.message };
    }
  });
};
