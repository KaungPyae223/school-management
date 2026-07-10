import { ipcMain } from "electron";
import { prisma } from "../../db/prisma.js";
import { showImage } from "../utils/showImage.js";
import { Prisma } from "../../generated/prisma/index.js";
import { formatTime } from "../utils/formatTime.js";

export const classesIPCs = () => {
  ipcMain.handle("class:index", async (_, data) => {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "createdAt",
      sortDirection = "asc",
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

    try {
      const [classes, totalData] = await Promise.all([
        prisma.$queryRaw`
          SELECT 
            cl.*,
            COUNT(DISTINCT e.id) as total_students,
            t.name as teacher_name,
            t.image as teacher_image,
            c.name as course_name,
            c.image as course_image
          FROM classes cl
          LEFT JOIN enrollments e ON cl.id = e.classId 
          LEFT JOIN teachers t ON cl.teacherId = t.id 
          LEFT JOIN courses c ON cl.courseId = c.id 
           
          ${search ? Prisma.sql`WHERE (cl.description LIKE LOWER(${`%${search}%`}) OR t.name LIKE LOWER(${`%${search}%`}) OR c.name LIKE LOWER(${`%${search}%`}))` : Prisma.empty}
          GROUP BY cl.id
          ORDER BY ${Prisma.raw(`${finalSort} ${finalSortDirection}`)}
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
          },
        }),
      ]);

      const total_pages = Math.ceil(Number(totalData) / Number(limit));

      return {
        error: null,
        data: classes.map((classData) => ({
          ...classData,
          course_image: showImage(classData.course_image),
          teacher_image: showImage(classData.teacher_image),
        })),
        meta: { total_data: totalData, total_pages, page, limit },
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

  ipcMain.handle("class:search-all-active", async (_, data) => {
    try {
      const classes = await prisma.class.findMany({
        where: {
          endDate: null,
          ...(data.search && {
            course: {
              name: { contains: data.search },
            },
          }),
        },
        select: {
          id: true,
          batch: true,
          startDate: true,
          startTime: true,
          endTime: true,
          days: true,
          price: true,
          course: {
            select: {
              name: true,
              image: true,
            },
          },
          teacher: {
            select: {
              name: true,
            },
          },
        },
      });
      return {
        data: classes.map((classData) => ({
          ...classData,
          image: showImage(classData.course.image),
          teacher_name: classData.teacher.name,
          course_name: classData.course.name,
        })),
      };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("class:show", async (_, id) => {
    try {
      const classes = await prisma.class.findUnique({
        where: { id },
        select: {
          id: true,
          batch: true,
          startDate: true,
          startTime: true,
          endTime: true,
          days: true,
          price: true,
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
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  });

  ipcMain.handle("class:create", async (_, data) => {
    try {
      const latestBath = await prisma.class.findFirst({
        where: {
          courseId: data.courseId,
        },
        orderBy: {
          batch: "desc",
        },
      });

      const daysArray = data.days.split(",").map((d) => d.trim());

      const daysCondition = Prisma.join(
        daysArray.map((day) => Prisma.sql`days LIKE ${"%" + day + "%"}`),
        " OR ",
      );

      const checkTeacherBusy = await prisma.$queryRaw`
        SELECT startTime, endTime, days, id 
        FROM classes 
        WHERE teacherId = ${data.teacherId}
        AND (endDate IS NULL OR endDate > ${data.startDate})
        AND (
          (
            time(startTime) < time(${data.startTime})
            AND
            time(endTime) > time(${data.startTime})
          ) OR (
            time(startTime) < time(${data.endTime})
            AND
            time(endTime) > time(${data.endTime})
          )
        )
        AND (
          ${daysCondition}
        )
        LIMIT 1
      `;

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
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("class:update", async (_, data) => {
    try {
      const { id, ...restData } = data;

      await prisma.class.update({
        where: { id },
        data: {
          ...restData,
        },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("class:delete", async (_, id) => {
    try {
      const hasLinkedStudents = await prisma.enrollment.findFirst({
        where: { classId: id },
        select: { id: true },
      });

      if (hasLinkedStudents) {
        return { success: false, error: "Class has linked students" };
      }

      await prisma.course.delete({
        where: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
};
