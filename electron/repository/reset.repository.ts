import { prisma } from "../db/prisma";

export const resetRepository = {
  async reset() {
    await prisma.$transaction([
      prisma.payment.deleteMany(),
      prisma.enrollment.deleteMany(),
      prisma.student.deleteMany(),
      prisma.class.deleteMany(),
      prisma.course.deleteMany(),
      prisma.teacher.deleteMany(),
    ]);
  },
};
