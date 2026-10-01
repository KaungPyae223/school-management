import { prisma } from "../db/prisma";
import { buildSkip } from "../utils/query-utils";

export const dashboardRepository = {
  async schedule_utilization() {
    return prisma.$queryRaw`
        WITH days(day_order, day_name) AS (
            SELECT 1, 'Monday'
            UNION ALL SELECT 2, 'Tuesday'
            UNION ALL SELECT 3, 'Wednesday'
            UNION ALL SELECT 4, 'Thursday'
            UNION ALL SELECT 5, 'Friday'
            UNION ALL SELECT 6, 'Saturday'
            UNION ALL SELECT 7, 'Sunday'
        ),
        classes_with_enrollment AS (
            SELECT 
                c.id,
                c.days, 
                c.endDate, 
                COUNT(e.id) AS enrollment_count 
            FROM classes c
            LEFT JOIN enrollments e
                ON c.id = e.classId
            WHERE c.endDate IS NULL
            GROUP BY c.id
        )
        SELECT
            d.day_order,
            d.day_name,
            COUNT(ce.id) AS class_count,
            SUM(ce.enrollment_count) AS total_enrollment_count
        FROM days d
        LEFT JOIN classes_with_enrollment ce
            ON
            ce.endDate IS NULL
            AND LOWER(ce.days) LIKE '%' || d.day_name || '%'
        GROUP BY d.day_order
        ORDER BY d.day_order;
    `;
  },
  async age_demographics() {
    const [genderCounts, ageGroupCounts] = await Promise.all([
      await prisma.student.groupBy({
        by: ["gender"],
        _count: {
          id: true,
        },
      }),
      await prisma.$queryRaw`
            SELECT
                CASE
                    WHEN dob IS NULL THEN 'Unknown'
                    WHEN (strftime('%Y', 'now') - strftime('%Y', dob)) < 15
                        THEN '<15'
                    WHEN (strftime('%Y', 'now') - strftime('%Y', dob)) BETWEEN 15 AND 18
                        THEN '15-18'
                    WHEN (strftime('%Y', 'now') - strftime('%Y', dob)) BETWEEN 19 AND 24
                        THEN '19-24'
                    WHEN (strftime('%Y', 'now') - strftime('%Y', dob)) BETWEEN 25 AND 34
                        THEN '25-34'
                    ELSE '35+'
                END AS age_group,
                COUNT(*) AS total
            FROM students
            GROUP BY age_group
            ORDER BY
            CASE age_group
                WHEN '<15' THEN 1
                WHEN '15-18' THEN 2
                WHEN '19-24' THEN 3
                WHEN '25-34' THEN 4
                WHEN '35+' THEN 5
                ELSE 6
            END
          `,
    ]);

    return {
      genderCounts,
      ageGroupCounts,
    };
  },
  async retention() {
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
      ),
      monthly_events AS (
        SELECT 
          strftime('%Y-%m', createdAt) AS date,
          1 AS is_enrollment,
          0 AS is_withdrawn
        FROM enrollments
        WHERE createdAt IS NOT NULL

        UNION ALL

        SELECT 
          strftime('%Y-%m', updatedAt) AS date,
          0 AS is_enrollment,
          1 AS is_withdrawn
        FROM enrollments
        WHERE withdrawn = 0 AND updatedAt IS NOT NULL
      )
      SELECT 
        e.date,
        m.month,
        COALESCE(SUM(e.is_enrollment), 0) AS total_enrollments,
        COALESCE(SUM(e.is_withdrawn), 0) AS total_withdrawns
      FROM monthly_events e
      JOIN months m ON m.month_number = CAST(substr(e.date, 6, 2) AS INTEGER)
      GROUP BY e.date
      ORDER BY e.date DESC
      LIMIT 6
    `;
  },
  async courses(data: any) {
    const { page = 1, limit = 10 } = data;

    const skip = buildSkip(page, limit);

    return prisma.$queryRaw<any[]>`
      WITH classes_enrollments AS (
        SELECT 
          c.courseId AS courseId, 
          COUNT(DISTINCT c.id) AS total_classes,
          COUNT(DISTINCT c.teacherId) AS total_teachers,
          COUNT(DISTINCT e.studentId) AS total_students,
          SUM(e.price) AS total_revenue
        FROM classes c
        JOIN enrollments e ON c.id = e.classId
        WHERE e.withdrawn = 0
        GROUP BY c.courseId
      )
      select 
        c.id,
        c.image,
        c.name,
        ce.total_classes,
        ce.total_teachers,
        ce.total_students,
        ce.total_revenue
      from courses c
      LEFT JOIN classes_enrollments ce ON c.id = ce.courseId
      WHERE c.deleted = 0
      ORDER BY ce.total_revenue DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
  },
  async teacherRevenue() {
    return prisma.$queryRaw`
      WITH teacher_revenue AS (
        SELECT
          t.id,
          t.name,
          COUNT(e.id) AS total_enrollments,
          SUM(e.price) AS total_revenue,
          ROW_NUMBER() OVER (ORDER BY SUM(e.price) DESC, t.id) AS rn
        FROM teachers t
        LEFT JOIN classes cl      ON cl.teacherId = t.id
        LEFT JOIN enrollments e   ON e.classId   = cl.id
        WHERE t.deleted = 0
        GROUP BY t.id
      )
      SELECT name, total_revenue, total_enrollments
      FROM teacher_revenue 
      WHERE rn <= 5

      UNION ALL

      SELECT 'Others' AS name, SUM(total_revenue) AS total_revenue, SUM(total_enrollments) AS total_enrollments
      FROM teacher_revenue 
      WHERE rn > 5
      HAVING COUNT(id) > 0

      ORDER BY total_revenue DESC;
    `;
  },
  async teacherWorkload(data: any) {
    const { page = 1, limit = 10 } = data;
    const skip = buildSkip(page, limit);
    return await prisma.$queryRaw<any[]>`
      WITH classes_enrollments AS (
        SELECT 
          c.teacherId AS teacherId, 
          COUNT(DISTINCT c.id) AS total_classes,
          COUNT(CASE WHEN c.endDate IS NULL THEN 1 END) AS total_active_classes,
          COUNT(DISTINCT e.studentId) AS total_students
        FROM classes c
        JOIN enrollments e ON c.id = e.classId
        WHERE e.withdrawn = 0
        GROUP BY c.teacherId
      )
      select 
        t.id,
        t.image,
        t.name,
        t.email,
        ce.total_classes,
        ce.total_active_classes,
        ce.total_students
      from teachers t
      LEFT JOIN classes_enrollments ce ON t.id = ce.teacherId
      WHERE t.deleted = 0
      ORDER BY ce.total_active_classes DESC
      LIMIT ${limit}
      OFFSET ${skip}
    `;
  },
};
