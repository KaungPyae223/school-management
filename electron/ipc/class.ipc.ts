import { prisma } from "../db/prisma";
import { showImage } from "../utils/showImage";
import { Prisma } from "../../generated/prisma/client";
import { formatTime } from "../utils/formatTime";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";

const isTeacherBusy = async (
  teacherId: number,
  days: string,
  startTime: string,
  endTime: string,
  classId: number | null = null,
) => {
  const daysArray = days.split(",").map((d) => d.trim());

  const daysCondition = Prisma.join(
    daysArray.map((day) => Prisma.sql`days LIKE ${"%" + day + "%"}`),
    " OR ",
  );

  const checkTeacherBusy = await prisma.$queryRaw<any[]>`
        SELECT startTime, endTime, days, id 
        FROM classes 
        WHERE teacherId = ${teacherId}
        AND (Date(endDate) IS NULL OR Date(endDate) > Date(${startTime}))
        AND (
          (
            TIME(startTime, 'localtime') < TIME(${startTime}, 'localtime')
            AND
            TIME(endTime, 'localtime') > TIME(${startTime}, 'localtime')
          ) OR (
            TIME(startTime, 'localtime') < TIME(${endTime}, 'localtime')
            AND
            TIME(endTime, 'localtime') > TIME(${endTime}, 'localtime')
          )
        )
        AND (
          ${daysCondition}
        )
        ${classId ? Prisma.sql`AND id <> ${classId}` : Prisma.empty}
        LIMIT 1
      `;

  return checkTeacherBusy;
};

export const classesIPCs = () => {
  protectedHandle("class:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
      start_month = null,
      start_year = null,
      end_month = null,
      end_year = null,
      teacherId = null,
      courseId = null,
      courseIds,
      teacherIds,
      startTime,
      endTime,
      startDate,
      endDate,
      minPrice,
      maxPrice,
    } = data;

    const avilableSort = new Set([
      "cl.startDate",
      "cl.startTime",
      "cl.endTime",
      "cl.price",
      "cl.endDate",
      "cl.createdAt",
      "cl.updatedAt",
      "total_students",
      "teacher_name",
      "course_name",
    ]);
    const avilableSortDirection = new Set(["asc", "desc"]);

    const finalSort = avilableSort.has(sort) ? sort : "cl.createdAt";
    const finalSortDirection = avilableSortDirection.has(sortDirection)
      ? sortDirection
      : "asc";

    const skip = Number(page - 1) * Number(limit);

    const conditions = [];

    if (start_month && start_year && end_month && end_year) {
      conditions.push(Prisma.sql`
      (
        (
          strftime('%Y', cl.startDate) < ${end_year.toString()}
          OR (
            strftime('%Y', cl.startDate) = ${end_year.toString()}
            AND CAST(strftime('%m', cl.startDate) AS INTEGER) <= ${end_month}
          )
        )
        AND
        (
          cl.endDate IS NULL
          OR strftime('%Y', cl.endDate) > ${start_year.toString()}
          OR (
            strftime('%Y', cl.endDate) = ${start_year.toString()}
            AND CAST(strftime('%m', cl.endDate) AS INTEGER) >= ${start_month}
          )
        )
      )
    `);
    } else if (search) {
      conditions.push(Prisma.sql`
        LOWER(cl.description) LIKE LOWER(${`%${search}%`}) OR
        LOWER(t.name) LIKE LOWER(${`%${search}%`}) OR
        LOWER(c.name) LIKE LOWER(${`%${search}%`})
      `);
    }

    if (teacherId) {
      conditions.push(Prisma.sql`cl.teacherId = ${teacherId}`);
    }

    if (courseId) {
      conditions.push(Prisma.sql`cl.courseId = ${courseId}`);
    }

    if (courseIds) {
      const courseIdsArray = courseIds
        .split(",")
        .map((id: string) => id.trim());
      conditions.push(
        Prisma.sql`cl.courseId IN (${Prisma.join(courseIdsArray, ",")})`,
      );
    }

    if (teacherIds) {
      const teacherIdsArray = teacherIds
        .split(",")
        .map((id: string) => id.trim());
      conditions.push(
        Prisma.sql`cl.teacherId IN (${Prisma.join(teacherIdsArray, ",")})`,
      );
    }

    if (startTime) {
      conditions.push(
        Prisma.sql`TIME(cl.startTime,, 'localtime') >= TIME(${startTime}, 'localtime')`,
      );
    }

    if (endTime) {
      conditions.push(
        Prisma.sql`TIME(cl.endTime, 'localtime') <= TIME(${endTime}, 'localtime')`,
      );
    }

    if (startDate) {
      conditions.push(Prisma.sql`Date(cl.startDate) >= Date(${startDate})`);
    }

    if (endDate) {
      conditions.push(Prisma.sql`Date(cl.endDate) <= Date(${endDate})`);
    }

    if (minPrice) {
      conditions.push(Prisma.sql`cl.price >= ${minPrice}`);
    }

    if (maxPrice) {
      conditions.push(Prisma.sql`cl.price <= ${maxPrice}`);
    }

    const searchQuery =
      conditions.length > 0
        ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
        : Prisma.empty;

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw<any[]>`
          SELECT 
            cl.*,
            COUNT(DISTINCT CASE WHEN e.withdraw = 0 THEN e.id END) as total_students,
            COUNT(DISTINCT CASE WHEN e.withdraw = 1 THEN e.id END) as withdraw_students,
            t.name as teacher_name,
            t.email as teacher_email,
            t.image as teacher_image,
            c.name as course_name,
            c.image as course_image
          FROM classes cl
          LEFT JOIN enrollments e ON cl.id = e.classId 
          LEFT JOIN teachers t ON cl.teacherId = t.id 
          LEFT JOIN courses c ON cl.courseId = c.id 
          ${searchQuery}
          GROUP BY cl.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          ${start_month ? Prisma.sql`LIMIT ${limit} OFFSET ${skip}` : Prisma.empty}
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
            ...(teacherId && { teacherId }),
            ...(courseId && { courseId }),
          },
        }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: classes.map((classData: any) => ({
          ...classData,
          course_image: showImage(classData.course_image),
          teacher_image: showImage(classData.teacher_image),
          status: generateStatus(classData.startDate, classData.endDate),
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

  protectedHandle("class:show", async (_, id) => {
    try {
      const classes = await prisma.class.findUnique({
        where: { id },
        select: {
          id: true,
          batch: true,
          startDate: true,
          startTime: true,
          endTime: true,
          endDate: true,
          days: true,
          price: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          course: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          teacher: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              enrollments: {
                where: {
                  withdraw: false,
                },
              },
            },
          },
        },
      });
      if (!classes) {
        return { error: "Class not found" };
      }
      return {
        data: {
          ...classes,
          course_image: showImage(classes.course.image),
          teacher_image: showImage(classes.teacher.image),
          status: generateStatus(classes.startDate, classes.endDate),
        },
      };
    } catch (error: any) {
      return { error: error.message };
    }
  });

  protectedHandle("class:create", async (_, data) => {
    try {
      const latestBath = await prisma.class.findFirst({
        where: {
          courseId: data.courseId,
        },
        orderBy: {
          batch: "desc",
        },
      });

      const checkTeacherBusy: any[] = await isTeacherBusy(
        data.teacherId,
        data.days,
        data.startTime,
        data.endTime,
      );

      if (checkTeacherBusy.length > 0) {
        throw new Error(
          `Teacher has a schedule conflict on ${checkTeacherBusy[0].days} at ${formatTime(checkTeacherBusy[0].startTime)} to ${formatTime(checkTeacherBusy[0].endTime)}. Please choose another day or time.`,
        );
      }

      await prisma.class.create({
        data: {
          ...data,
          batch: latestBath ? latestBath.batch + 1 : 1,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:update", async (_, data) => {
    try {
      const { id, ...restData } = data;

      if (restData.teacherId) {
        const checkTeacherBusy: any[] = await isTeacherBusy(
          restData.teacherId,
          restData.days,
          restData.startTime,
          restData.endTime,
          id,
        );

        if (checkTeacherBusy.length > 0) {
          throw new Error(
            `Teacher has a schedule conflict on ${checkTeacherBusy[0].days} at ${formatTime(checkTeacherBusy[0].startTime)} to ${formatTime(checkTeacherBusy[0].endTime)}. Please choose another day or time.`,
          );
        }
      }

      await prisma.class.update({
        where: { id },
        data: {
          ...restData,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:delete", async (_, id) => {
    try {
      const hasLinkedStudents = await prisma.enrollment.findFirst({
        where: { classId: id },
        select: { id: true },
      });

      if (hasLinkedStudents) {
        return { success: false, error: "Class has linked students" };
      }

      await prisma.class.delete({
        where: { id },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:complete", async (_, id) => {
    try {
      await prisma.class.update({
        where: { id },
        data: {
          endDate: new Date().toISOString(),
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  });
};
