import { prisma } from "../db/prisma";
import { buildSkip } from "../utils/query-utils";

export const dashboardRepository = {
  async kpi() {
    const [students, teachers, courses, activeClassStatus, totalCollected] =
      await Promise.all([
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
      active_class_status: activeClassStatus[0],
      total_collected: totalCollected[0],
    };
  },
  async revenueEnrollments() {
    return prisma.$queryRaw`
      WITH months(month_number, month) AS (
        SELECT 1, 'Jan'
        UNION ALL SELECT 2, 'Feb'
        UNION ALL SELECT 3, 'Mar'
        UNION ALL SELECT 4, 'Apr'
        UNION ALL SELECT 5, 'May'
        UNION ALL SELECT 6, 'Jun'
        UNION ALL SELECT 7, 'Jul'
        UNION ALL SELECT 8, 'Aug'
        UNION ALL SELECT 9, 'Sep'
        UNION ALL SELECT 10, 'Oct'
        UNION ALL SELECT 11, 'Nov'
        UNION ALL SELECT 12, 'Dec'
      )
      SELECT 
        strftime('%Y-%m', e.createdAt) AS date,
        m.month,
        COALESCE(SUM(p.amount), 0) AS total_revenue,
        COUNT(e.id) AS total_enrollments
      FROM enrollments e
      LEFT JOIN payments p ON e.id = p.enrollmentId
      JOIN months m ON m.month_number = CAST(strftime('%m', e.createdAt) AS INTEGER)
      GROUP BY date
      ORDER BY date DESC
      LIMIT 6
    `;
  },
  async coursesEnrollments() {
    return prisma.$queryRaw`
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
  },
  async todayClasses() {
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

    return prisma.$queryRaw<any[]>`
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
  },
  async recentEnrollments(data: any) {
    const { page = 1, limit = 10 } = data;

    const skip = buildSkip(page, limit);

    return prisma.$queryRaw<any[]>`
      SELECT 
        e.id,
        e.createdAt,
        e.price,
        cl.batch,
        s.name as student_name,
        s.image as student_image,
        s.phone as student_phone,
        c.name as course_name,
        c.image as course_image,
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
  },
  async recentPayments(data: any) {
    const { page = 1, limit = 10 } = data;

    const skip = buildSkip(page, limit);

    return prisma.$queryRaw<any[]>`
      SELECT 
        p.id,
        p.createdAt,
        p.amount,
        e.id as enrollment_id,
        s.name as student_name,
        s.image as student_image,
        c.name as course_name,
        cl.batch
      FROM payments p
      JOIN enrollments e ON p.enrollmentId = e.id
      JOIN students s ON e.studentId = s.id
      JOIN classes cl ON e.classId = cl.id
      JOIN courses c ON cl.courseId = c.id
      ORDER BY p.createdAt DESC
      LIMIT ${limit} OFFSET ${skip}
    `;
  },
  async totalPendingAmount() {
    const result = await prisma.$queryRaw<any[]>`
      WITH total_paid AS (
        SELECT
          enrollmentId,
          SUM(amount) AS total_paid
        FROM payments
        GROUP BY enrollmentId
      )
      SELECT
        COALESCE(SUM(
          e.price - COALESCE(p.total_paid, 0)
        ), 0) AS total_pending_amount
      FROM enrollments e
      LEFT JOIN total_paid p ON e.id = p.enrollmentId
      WHERE e.withdrawn = 0
    `;

    return result[0].total_pending_amount;
  },
 
};
