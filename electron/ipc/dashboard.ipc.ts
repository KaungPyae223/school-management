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
        await prisma.$queryRaw<
          {
            total_students: number;
            total_male_students: number;
            total_female_students: number;
          }[]
        >`
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
        await prisma.$queryRaw<
          {
            total_active_classes: number;
            total_enrollments: number;
            avg_enrollments_per_class: number;
          }[]
        >`
          SELECT 
            COUNT(DISTINCT c.id) as total_active_classes,
            COUNT(e.id) as total_enrollments,
            COUNT(e.id) / COUNT(DISTINCT c.id) as avg_enrollments_per_class
          FROM classes c
          LEFT JOIN enrollments e on e.classId = c.id
          WHERE c.endDate IS NULL
        `,
        await prisma.$queryRaw<
          {
            total_remaining_amount: number;
            total_paid_amount: number;
          }[]
        >`
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
      return { error: error.message };
    }
  });
  protectedHandle("dashboard:revenue-enrollments", async () => {
    try {
      const result = await prisma.$queryRaw`
        SELECT 
          strftime('%Y', e.createdAt) AS year,
          strftime('%m', e.createdAt) AS month,
          SUM(e.price) as total_revenue,
          COUNT(e.id) as total_enrollments
        FROM enrollments e
        GROUP BY year, month
        ORDER BY year DESC, month DESC
        LIMIT 6
      `;

      return result;
    } catch (error: any) {
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
      return { error: error.message };
    }
  });
};
