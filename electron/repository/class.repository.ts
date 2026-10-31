import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../db/prisma";
import { buildSkip, normalizeSort } from "../utils/query-utils";

export const classRepository = {
  async index(data: any) {
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
      exportCSV = false,
    } = data;

    const { finalSort, finalSortDirection } = normalizeSort(
      sort,
      sortDirection,
      new Set([
        "cl.startDate",
        "cl.startTime",
        "cl.endTime",
        "cl.price",
        "cl.endDate",
        "cl.createdAt",
        "cl.updatedAt",
        "total_students",
        "withdrawn_students",
        "teacher_name",
        "course_name",
      ]),
      {
        sort: "cl.createdAt",
        direction: "desc",
      },
    );

    const skip = buildSkip(page, limit);

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

    const [classes, totalData] = await Promise.all([
      prisma.$queryRaw<any[]>`
          SELECT 
            cl.*,
            COUNT(e.id) as total_students,
            COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) as withdrawn_students,
            t.name as teacher_name,
            t.email as teacher_email,
            t.image as teacher_image,
            c.name as course_name,
            c.image as course_image
          FROM classes cl
          LEFT JOIN enrollments e ON cl.id = e.classId 
          JOIN teachers t ON cl.teacherId = t.id 
          JOIN courses c ON cl.courseId = c.id 
          ${searchQuery}
          GROUP BY cl.id
          ORDER BY ${Prisma.raw(finalSort)} ${Prisma.raw(finalSortDirection)}
          ${!start_month && !exportCSV ? Prisma.sql`LIMIT ${limit} OFFSET ${skip}` : Prisma.empty}
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
          ...(courseIds && {
            courseId: {
              in: courseIds.split(",").map((id: string) => Number(id.trim())),
            },
          }),
          ...(teacherIds && {
            teacherId: {
              in: teacherIds.split(",").map((id: string) => Number(id.trim())),
            },
          }),
          ...(startTime && {
            startTime: {
              gte: startTime,
            },
          }),
          ...(endTime && {
            endTime: {
              lte: endTime,
            },
          }),
          ...(startDate && {
            startDate: {
              gte: startDate,
            },
          }),
          ...(endDate && {
            endDate: {
              lte: endDate,
            },
          }),
          ...(minPrice && {
            price: {
              gte: minPrice,
            },
          }),
          ...(maxPrice && {
            price: {
              lte: maxPrice,
            },
          }),
        },
      }),
    ]);

    return { classes, totalData };
  },
  async show(id: number) {
    return await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: true,
        course: true,
      },
    });
  },
  async showDetails(id: number) {
    return prisma.$queryRaw<any[]>`
      WITH  total_revenue AS (
        select 
        e.classId,
        COUNT(e.id) as total_students,
        COUNT(CASE WHEN e.withdrawn = 1 THEN e.id END) as withdraw_students,
        SUM(p.amount) as total_revenue   
        FROM enrollments e
        LEFT JOIN payments p on e.id = p.enrollmentId
        WHERE e.classId = ${id}
        GROUP BY e.classId
      )
      SELECT 
        cl.*,
        t.name as teacher_name,
        t.email as teacher_email,
        t.image as teacher_image,
        c.name as course_name,
        c.image as course_image,
        COALESCE(tr.total_students, 0) as total_students,
        COALESCE(tr.withdraw_students, 0) as withdrawn_students,
        COALESCE(tr.total_revenue, 0) as total_revenue
      FROM classes cl
      LEFT JOIN total_revenue tr ON cl.id = tr.classId 
      JOIN teachers t ON cl.teacherId = t.id 
      JOIN courses c ON cl.courseId = c.id 
      WHERE cl.id = ${id}
    `;
  },
  async getCourseLastClassBatch(courseId: number) {
    return await prisma.class.findFirst({
      where: { courseId },
      orderBy: { batch: "desc" },
    });
  },
  async isTeacherBusy(
    teacherId: number,
    days: string,
    startTime: string,
    endTime: string,
    classId: number | null = null,
  ) {
    const daysArray = days.split(",").map((d) => d.trim());

    const daysCondition = Prisma.join(
      daysArray.map((day) => Prisma.sql`days LIKE ${"%" + day + "%"}`),
      " OR ",
    );

    return prisma.$queryRaw<any[]>`
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
  },
  async hasLinkedStudents(classId: number) {
    return await prisma.enrollment.findFirst({
      where: { classId },
      select: { id: true },
    });
  },

  async create(data: any) {
    prisma.class.create({ data });
  },
  async update(id: number, data: any) {
    prisma.class.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    prisma.class.delete({ where: { id } });
  },
};
