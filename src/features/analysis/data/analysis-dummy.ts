// Dummy datasets shaped after the Prisma schema
// (Course, Teacher, Class, Enrollment, Payment)

export interface MonthlyTrend {
  month: string;
  revenue: number;
  enrollments: number;
  withdrawn: number;
}

export interface WeekdayUsage {
  day: string;
  classes: number;
  students: number;
}

export interface AgeBucket {
  range: string;
  count: number;
}

export interface TeacherRevenue {
  id: number;
  name: string;
  revenue: number;
  color: string;
}

export interface TeacherWorkload {
  id: number;
  name: string;
  classes: number;
  students: number;
}

export interface TopClass {
  id: number;
  batch: number;
  course: string;
  teacher: string;
  days: string;
  students: number;
  revenue: number;
}

// Last 12 months — payments aggregated by createdAt
export const monthlyTrend: MonthlyTrend[] = [
  { month: "Oct", revenue: 1_240_000, enrollments: 18, withdrawn: 2 },
  { month: "Nov", revenue: 1_385_000, enrollments: 21, withdrawn: 3 },
  { month: "Dec", revenue: 1_120_000, enrollments: 14, withdrawn: 4 },
  { month: "Jan", revenue: 1_650_000, enrollments: 27, withdrawn: 2 },
  { month: "Feb", revenue: 1_720_000, enrollments: 24, withdrawn: 1 },
  { month: "Mar", revenue: 1_585_000, enrollments: 19, withdrawn: 3 },
  { month: "Apr", revenue: 1_410_000, enrollments: 16, withdrawn: 5 },
  { month: "May", revenue: 1_830_000, enrollments: 31, withdrawn: 2 },
  { month: "Jun", revenue: 1_960_000, enrollments: 28, withdrawn: 1 },
  { month: "Jul", revenue: 1_745_000, enrollments: 22, withdrawn: 4 },
  { month: "Aug", revenue: 2_080_000, enrollments: 34, withdrawn: 2 },
  { month: "Sep", revenue: 2_215_000, enrollments: 30, withdrawn: 3 },
];

// Active enrollments expanded over Class.days string
export const weekdayUsage: WeekdayUsage[] = [
  { day: "Mon", classes: 6, students: 92 },
  { day: "Tue", classes: 5, students: 78 },
  { day: "Wed", classes: 6, students: 90 },
  { day: "Thu", classes: 5, students: 76 },
  { day: "Fri", classes: 4, students: 58 },
  { day: "Sat", classes: 7, students: 104 },
  { day: "Sun", classes: 2, students: 24 },
];

// Derived from Student.gender and Student.dob
export const genderSplit = {
  male: 231,
  female: 181,
};

export const ageDistribution: AgeBucket[] = [
  { range: "<15", count: 86 },
  { range: "15-18", count: 168 },
  { range: "19-24", count: 104 },
  { range: "25-34", count: 42 },
  { range: "35+", count: 12 },
];

// Payments attributed through Class.teacherId
export const teacherRevenue: TeacherRevenue[] = [
  { id: 1, name: "U Kyaw Min", revenue: 5_920_000, color: "#2563eb" },
  { id: 2, name: "Daw Ninn Wai", revenue: 4_760_000, color: "#10b981" },
  { id: 3, name: "Sayar Aung Ko", revenue: 4_130_000, color: "#f59e0b" },
  { id: 4, name: "Ma Thiri", revenue: 3_240_000, color: "#8b5cf6" },
  { id: 5, name: "U Zaw Lin", revenue: 1_690_000, color: "#06b6d4" },
];

// Classes grouped by teacherId
export const teacherWorkload: TeacherWorkload[] = [
  { id: 1, name: "U Kyaw Min", classes: 5, students: 58 },
  { id: 2, name: "Daw Ninn Wai", classes: 4, students: 51 },
  { id: 3, name: "Sayar Aung Ko", classes: 4, students: 44 },
  { id: 4, name: "Ma Thiri", classes: 3, students: 37 },
  { id: 5, name: "U Zaw Lin", classes: 2, students: 21 },
];

// Classes ranked by collected payments on their enrollments
export const topClasses: TopClass[] = [
  {
    id: 12,
    batch: 9,
    course: "Mathematics",
    teacher: "U Kyaw Min",
    days: "Mon, Wed, Fri",
    students: 24,
    revenue: 1_920_000,
  },
  {
    id: 7,
    batch: 8,
    course: "Computer",
    teacher: "Daw Ninn Wai",
    days: "Tue, Thu",
    students: 22,
    revenue: 1_760_000,
  },
  {
    id: 3,
    batch: 7,
    course: "English",
    teacher: "Sayar Aung Ko",
    days: "Sat, Sun",
    students: 20,
    revenue: 1_400_000,
  },
  {
    id: 15,
    batch: 9,
    course: "Physics",
    teacher: "Ma Thiri",
    days: "Mon, Wed",
    students: 16,
    revenue: 1_280_000,
  },
  {
    id: 9,
    batch: 6,
    course: "Mathematics",
    teacher: "U Kyaw Min",
    days: "Tue, Thu, Sat",
    students: 18,
    revenue: 1_170_000,
  },
];
