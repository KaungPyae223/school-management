import { prisma } from "../db/prisma";
import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { Prisma } from "../../generated/prisma/client";
import { protectedHandle } from "../auth/protected-ipc";

export const studentIPCs = () => {
  protectedHandle("student:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set([
      "s.createdAt",
      "s.updatedAt",
      "s.name",
      "s.phone",
      "s.email",
      "s.address",
      "s.dob",
      "s.gender",
      "total_classes",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "s.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const searchFilter = search
      ? Prisma.sql`WHERE 
        LOWER(s.name) LIKE LOWER(${`%${search}%`}) OR 
        LOWER(s.phone) LIKE LOWER(${`%${search}%`}) OR 
        LOWER(s.address) LIKE LOWER(${`%${search}%`})`
      : Prisma.empty;

    try {
      const [students, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          SELECT 
            s.*,
            COUNT(DISTINCT CASE WHEN e.withdrawn = 0 THEN e.id END) as total_classes
          FROM students s
          LEFT JOIN enrollments e ON s.id = e.studentID
          ${searchFilter}
          GROUP BY s.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          LIMIT ${limit} OFFSET ${skip}
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

      const total_pages = Math.ceil(Number(totalData) / Number(limit));
      return {
        error: null,
        data: students.map((student) => ({
          ...student,
          image: showImage(student.image),
        })),
        meta: { total_data: totalData, total_pages, page, limit },
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

  protectedHandle("student:show", async (_, id) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id },
      });
      if (!student) {
        return { error: "Student not found" };
      }
      return {
        data: {
          ...student,
          image: showImage(student.image),
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("student:search-all-active", async (_, data) => {
    const { search = "", page = 1, limit = 10 } = data;

    const skip = Number(page - 1) * Number(limit);

    try {
      const students = await prisma.student.findMany({
        where: {
          ...(search && {
            OR: [
              { name: { contains: data.search } },
              { phone: { contains: data.search } },
              { email: { contains: data.search } },
              { address: { contains: data.search } },
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
      return {
        data: students.map((student) => ({
          ...student,
          image: showImage(student.image),
        })),
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("student:create", async (_, data) => {
    try {
      const { image, imageName, email, phone, ...restData } = data;

      if (email !== null) {
        const checEmail = await prisma.student.findFirst({
          where: {
            email,
          },
        });

        if (checEmail) {
          return { success: false, error: "Email already exists" };
        }
      }

      if (phone !== null) {
        const checPhone = await prisma.student.findFirst({
          where: {
            phone,
          },
        });

        if (checPhone) {
          return { success: false, error: "Phone already exists" };
        }
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await prisma.student.create({
        data: {
          ...restData,
          phone,
          email,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:update", async (_, data) => {
    try {
      const { id, image, imageName, email, phone, ...restData } = data;

      if (email !== null && email !== undefined) {
        const checkEmail = await prisma.student.findFirst({
          where: {
            email,
            id: { not: id },
          },
        });

        if (checkEmail) {
          return { success: false, error: "Email already exists" };
        }
      }

      if (phone !== null && phone !== undefined) {
        const checkPhone = await prisma.student.findFirst({
          where: {
            phone,
            id: { not: id },
          },
        });

        if (checkPhone) {
          return { success: false, error: "Phone already exists" };
        }
      }

      let imageUrl = undefined;
      if (image && imageName) {
        const existingStudent = await prisma.student.findUnique({
          where: { id },
          select: { image: true },
        });

        if (existingStudent) {
          const oldImage = existingStudent.image;

          if (oldImage) {
            await deleteImage(oldImage);
          }
        }

        imageUrl = await saveImage(image, imageName);
      }

      await prisma.student.update({
        where: { id },
        data: {
          ...restData,
          phone,
          email,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:delete", async (_, id) => {
    try {
      const hasLinkedEnrollment = await prisma.enrollment.findFirst({
        where: {
          studentId: id,
        },
        select: { id: true },
      });

      if (hasLinkedEnrollment) {
        return {
          success: false,
          error: "Student has linked enrollment. Cannot delete",
        };
      }

      const studentData = await prisma.student.findUnique({
        where: { id },
        select: { image: true },
      });

      if (studentData?.image) {
        await deleteImage(studentData.image);
      }

      await prisma.student.delete({
        where: { id },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:get-attended-classes", async (_, data) => {
    const {
      id = 0,
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
    } = data;

    const avilableSort = new Set([
      "cl.startDate",
      "cl.price",
      "cl.createdAt",
      "teacher_name",
      "course_name",
      "remainingAmount",
      "e.createdAt",
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
        Prisma.sql` LOWER(cl.description) LIKE LOWER(${`%${search}%`}) OR
        LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
        LOWER(c.name) LIKE LOWER(${`%${search}%`}) `,
      );
    }

    conditions.push(Prisma.sql` e.studentId = ${id}`);

    const searchQuery =
      conditions.length > 0
        ? Prisma.sql`WHERE (${Prisma.join(conditions, " AND ")})`
        : Prisma.empty;

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          SELECT 
            cl.*,
            t.name as teacher_name,
            t.email as teacher_email,
            t.image as teacher_image,
            c.name as course_name,
            e.id as enrollment_id,
            c.image as course_image,
            e.price - SUM(p.amount) as remainingAmount,
            e.withdrawn
          FROM enrollments e
          LEFT JOIN payments p ON e.id = p.enrollmentId
          LEFT JOIN classes cl ON e.classId = cl.id
          LEFT JOIN teachers t ON cl.teacherId = t.id 
          LEFT JOIN courses c ON cl.courseId = c.id 
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

      const total_pages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: classes.map((item: any) => ({
          ...item,
          teacher_image: showImage(item.teacher_image),
          course_image: showImage(item.course_image),
        })),
        meta: { total_data: totalData, total_pages, page, limit },
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
