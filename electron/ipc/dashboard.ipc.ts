import { prisma } from "../db/prisma";
import { showImage } from "../utils/showImage";
import { Prisma } from "../../generated/prisma/client";
import { formatTime } from "../utils/formatTime";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/protected-ipc";

export const dashboardIPCs = () => {
  protectedHandle("dashboard:kpi", async () => {
    try {
      const [
        students,
        teachers,
        courses,
        active_class_status,
        total_collected,
      ] = await Promise.all([
        await prisma.$queryRaw<any[]>`
          SELECT 
            COUNT(s.id) as total_students,
            COUNT(CASE WHEN s.gender = 'MALE' THEN s.id END) as total_male_students,
            COUNT(CASE WHEN s.gender = 'FEMALE' THEN s.id END) as total_female_students
          FROM students s
        `,
        await prisma.teacher.count({
          where: {
            deleted: false,
          },
        }),
        await prisma.course.count({
          where: {
            deleted: false,
          },
        }),
        await prisma.$queryRaw<any[]>`
          SELECT 
            COUNT(DISTINCT c.id) as total_active_classes,
            COUNT(e.id) as total_enrollments,
            COUNT(e.id) / COUNT(DISTINCT c.id) as avg_enrollments_per_class
          FROM classes c
          LEFT JOIN enrollments e on e.classId = c.id
          WHERE c.endDate IS NULL
        `,
        await prisma.$queryRaw<any[]>`
          WITH remainig_amount as (
            SELECT 
              e.price as price,
              SUM(p.amount) as paid_amount,
              e.withdrawn,
              e.id
            FROM enrollments e
            LEFT JOIN payments p ON e.id = p.enrollmentId
            GROUP BY e.id
          )
          SELECT 
            SUM(CASE WHEN withdrawn = 0 THEN price - paid_amount ELSE 0 END) as total_remaining_amount,
            SUM(paid_amount) as total_paid_amount
          FROM remainig_amount
          `,
      ]);

      return {
        students: students[0],
        teachers,
        courses,
        active_class_status: active_class_status[0],
        total_collected: total_collected[0],
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:revenue-enrollments", async () => {
    try {
      const result = await prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', e.createdAt) AS date,
          strftime('%m', e.createdAt) AS month,
          SUM(e.price) as total_revenue,
          COUNT(e.id) as total_enrollments
        FROM enrollments e
        GROUP BY date
        ORDER BY date DESC
        LIMIT 6
      `;

      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:courses-enrollments", async () => {
    try {
      const result = await prisma.$queryRaw`
       WITH courses_query AS (
          SELECT
            c.id,
            c.name,
            COUNT(e.id) AS total_enrollments,
            ROW_NUMBER() OVER (ORDER BY COUNT(e.id) DESC, c.id) AS rn
          FROM courses c
          LEFT JOIN classes cl      ON cl.courseId = c.id
          LEFT JOIN enrollments e   ON e.classId   = cl.id
          WHERE c.deleted = 0
          GROUP BY c.id, c.name
        )
        SELECT name, total_enrollments
        FROM courses_query 
        WHERE rn <= 5

        UNION ALL

        SELECT 'Others' AS name, SUM(total_enrollments) AS total_enrollments
        FROM courses_query 
        WHERE rn > 5
        HAVING COUNT(id) > 0

        ORDER BY total_enrollments DESC;
      `;
      return result;
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:today-classes", async () => {
    try {
      const today = new Date();

      const DAYS_OF_WEEK = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const today_day = DAYS_OF_WEEK[today.getDay()];

      const result = await prisma.$queryRaw<any[]>`
         SELECT 
            cl.id,
            cl.batch,
            cl.startTime,
            cl.endTime,
            cl.days,
            COUNT(e.id) as total_students,
            t.name as teacher_name,
            t.image as teacher_image,
            c.name as course_name
          FROM classes cl
          LEFT JOIN enrollments e ON cl.id = e.classId 
          JOIN teachers t ON cl.teacherId = t.id 
          JOIN courses c ON cl.courseId = c.id 
          WHERE 
            cl.startDate <= ${today.toISOString()}
            AND cl.days LIKE '%' || ${today_day} || '%'
            AND cl.endDate IS NULL
          GROUP BY cl.id
      `;
      return result.map((item: any) => ({
        ...item,
        teacher_image: showImage(item.teacher_image),
      }));
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:recent-enrollment", async (_, data) => {
    const { page = 1, limit = 10 } = data;

    const skip = Number(page - 1) * Number(limit);

    try {
      const result = await prisma.$queryRaw<any[]>`
        SELECT 
          e.id,
          e.createdAt,
          e.price,
          cl.batch,
          s.name as student_name,
          s.image as student_image,
          s.phone as student_phone,
          c.name as course_name,
          COALESCE(SUM(p.amount), 0) as paid_amount
        FROM enrollments e
        JOIN classes cl ON e.classId = cl.id
        JOIN students s ON e.studentId = s.id
        JOIN courses c ON cl.courseId = c.id
        LEFT JOIN payments p ON e.id = p.enrollmentId
        WHERE e.createdAt >= ${new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
        ).toISOString()}
        GROUP BY e.id
        ORDER BY e.createdAt DESC
        LIMIT ${limit} OFFSET ${skip}
      `;

      return {
        data: result.map((item: any) => ({
          ...item,
          student_image: showImage(item.student_image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });
};
