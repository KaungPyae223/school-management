import { useState } from "react";
import { Link } from "react-router";
import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  DollarSign,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ClipboardList,
  UserPen,
} from "lucide-react";

import Table from "../../../components/table/Table";
import TableHeader from "../../../components/table/TableHeader";
import TableHead from "../../../components/table/TableHead";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";
import TableIconContent from "../../../components/table/TableIconContent";
import ImageDisplay from "../../../components/image/ImageDisplay";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { formatCurrency } from "../../../utils/format-currency";

// =========================================================================
// DUMMY DATA STRICTLY DERIVED FROM PRISMA SCHEMA:
// Course, Teacher, Student, Class, Enrollment, Payment
// =========================================================================

// --- 1. Financial & Tuition Data ---
const monthlyRevenueData = [
  { month: "Jan", billed: 14700000, collected: 12500000, rate: 85.0, pending: 2200000, enrollments: 42 },
  { month: "Feb", billed: 17500000, collected: 15200000, rate: 86.8, pending: 2300000, enrollments: 50 },
  { month: "Mar", billed: 21000000, collected: 18400000, rate: 87.6, pending: 2600000, enrollments: 60 },
  { month: "Apr", billed: 22800000, collected: 19600000, rate: 85.9, pending: 3200000, enrollments: 65 },
  { month: "May", billed: 27300000, collected: 23800000, rate: 87.1, pending: 3500000, enrollments: 78 },
  { month: "Jun", billed: 29400000, collected: 25100000, rate: 85.3, pending: 4300000, enrollments: 84 },
];

const cumulativeCashflowData = [
  { month: "Jan", cumulative: 12500000 },
  { month: "Feb", cumulative: 27700000 },
  { month: "Mar", cumulative: 46100000 },
  { month: "Apr", cumulative: 65700000 },
  { month: "May", cumulative: 89500000 },
  { month: "Jun", cumulative: 114600000 },
];

const paymentStatusShare = [
  { status: "Fully Paid", count: 268, share: 71.1, fill: "#10b981" },
  { status: "Partially Paid", count: 74, share: 19.6, fill: "#f59e0b" },
  { status: "Unpaid / Balance Due", count: 35, share: 9.3, fill: "#ef4444" },
];

const courseOutstandingDebt = [
  { course: "Fullstack Web", pending: 16500000, fill: "#3b82f6" },
  { course: "Python Data Sci", pending: 10800000, fill: "#10b981" },
  { course: "UI/UX Design", pending: 9500000, fill: "#8b5cf6" },
  { course: "Flutter Mobile", pending: 9300000, fill: "#f59e0b" },
  { course: "Japanese (N3)", pending: 4750000, fill: "#ec4899" },
  { course: "Business English", pending: 3960000, fill: "#06b6d4" },
];

// --- 2. Course & Batch Performance Data ---
const courseRevenueData = [
  { course: "Fullstack Web", revenue: 119000000, collected: 102500000, batches: 12, fill: "#3b82f6" },
  { course: "Python Data Sci", revenue: 84000000, collected: 73200000, batches: 6, fill: "#10b981" },
  { course: "UI/UX Design", revenue: 78000000, collected: 68500000, batches: 8, fill: "#8b5cf6" },
  { course: "Flutter Mobile", revenue: 70300000, collected: 61000000, batches: 5, fill: "#f59e0b" },
  { course: "Japanese (N3)", revenue: 36250000, collected: 31500000, batches: 7, fill: "#ec4899" },
  { course: "Business English", revenue: 23760000, collected: 19800000, batches: 4, fill: "#06b6d4" },
];

const courseEnrollmentShare = [
  { name: "Fullstack Web", students: 340, fill: "#3b82f6" },
  { name: "UI/UX Design", students: 260, fill: "#8b5cf6" },
  { name: "Python Data Sci", students: 210, fill: "#10b981" },
  { name: "Flutter Mobile", students: 185, fill: "#f59e0b" },
  { name: "Japanese (N3)", students: 145, fill: "#ec4899" },
  { name: "Business English", students: 108, fill: "#06b6d4" },
];

const courseBatchAverageData = [
  { course: "Fullstack Web", avgStudents: 28.3, batches: 12 },
  { course: "UI/UX Design", avgStudents: 32.5, batches: 8 },
  { course: "Python Data Sci", avgStudents: 35.0, batches: 6 },
  { course: "Flutter Mobile", avgStudents: 37.0, batches: 5 },
  { course: "Japanese (N3)", avgStudents: 20.7, batches: 7 },
  { course: "Business English", avgStudents: 27.0, batches: 4 },
];

const coursePriceDistribution = [
  { course: "Python Data Sci", price: 400000, fill: "#10b981" },
  { course: "Flutter Mobile", price: 380000, fill: "#f59e0b" },
  { course: "Fullstack Web", price: 350000, fill: "#3b82f6" },
  { course: "UI/UX Design", price: 300000, fill: "#8b5cf6" },
  { course: "Japanese (N3)", price: 250000, fill: "#ec4899" },
  { course: "Business English", price: 220000, fill: "#06b6d4" },
];

// --- 3. Student Demographics & Admissions Data ---
const courseGenderData = [
  { course: "Fullstack Web", male: 210, female: 130 },
  { course: "UI/UX Design", male: 110, female: 150 },
  { course: "Python Data Sci", male: 145, female: 65 },
  { course: "Flutter Mobile", male: 125, female: 60 },
  { course: "Japanese (N3)", male: 55, female: 90 },
  { course: "Business English", male: 42, female: 66 },
];

const overallGenderData = [
  { gender: "Male Students", count: 684, fill: "#3b82f6" },
  { gender: "Female Students", count: 564, fill: "#ec4899" },
];

const studentAgeCohorts = [
  { cohort: "Under 18", count: 85, fill: "#38bdf8" },
  { cohort: "18 - 22 yrs", count: 540, fill: "#3b82f6" },
  { cohort: "23 - 27 yrs", count: 380, fill: "#6366f1" },
  { cohort: "28 - 34 yrs", count: 185, fill: "#8b5cf6" },
  { cohort: "35+ yrs", count: 58, fill: "#a855f7" },
];

const monthlyNewStudents = [
  { month: "Jan", newStudents: 42 },
  { month: "Feb", newStudents: 50 },
  { month: "Mar", newStudents: 60 },
  { month: "Apr", newStudents: 65 },
  { month: "May", newStudents: 78 },
  { month: "Jun", newStudents: 82 },
];

// --- 4. Faculty & Schedule Data ---
const classDaysData = [
  { day: "Mon", count: 18, fill: "#3b82f6" },
  { day: "Tue", count: 12, fill: "#6366f1" },
  { day: "Wed", count: 18, fill: "#8b5cf6" },
  { day: "Thu", count: 10, fill: "#ec4899" },
  { day: "Fri", count: 16, fill: "#10b981" },
  { day: "Sat", count: 14, fill: "#f59e0b" },
  { day: "Sun", count: 8, fill: "#06b6d4" },
];

const classTimeSlotsData = [
  { slot: "Morning (08:00 - 12:00)", batches: 16, fill: "#f59e0b" },
  { slot: "Afternoon (12:00 - 16:00)", batches: 12, fill: "#3b82f6" },
  { slot: "Evening (16:00 - 20:00)", batches: 18, fill: "#8b5cf6" },
];

const teacherWeeklyHoursData = [
  { teacher: "Daw Hnin Nu Wai", hours: 16, classes: 4 },
  { teacher: "Dr. Kyaw Zin Thant", hours: 12, classes: 3 },
  { teacher: "U Aung Myat Min", hours: 12, classes: 3 },
  { teacher: "Daw May Thu", hours: 12, classes: 3 },
  { teacher: "U Thant Zin Oo", hours: 8, classes: 2 },
];

const teacherStudentsLoadData = [
  { teacher: "Daw Hnin Nu Wai", students: 142, fill: "#3b82f6" },
  { teacher: "Dr. Kyaw Zin Thant", students: 118, fill: "#10b981" },
  { teacher: "U Aung Myat Min", students: 95, fill: "#8b5cf6" },
  { teacher: "U Thant Zin Oo", students: 82, fill: "#f59e0b" },
  { teacher: "Daw May Thu", students: 75, fill: "#ec4899" },
];

const facultyAnalysisList = [
  {
    id: 1,
    name: "Daw Hnin Nu Wai",
    phone: "09-799112233",
    email: "hninnuwai@school.edu.mm",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    subject: "Fullstack Web Dev",
    classesCount: 4,
    studentsCount: 142,
    weeklyHours: 16,
    totalBilled: 49700000,
    totalCollected: 43200000,
  },
  {
    id: 2,
    name: "Dr. Kyaw Zin Thant",
    phone: "09-977445566",
    email: "kyawzinthant@school.edu.mm",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    subject: "Data Science & AI",
    classesCount: 3,
    studentsCount: 118,
    weeklyHours: 12,
    totalBilled: 47200000,
    totalCollected: 41100000,
  },
  {
    id: 3,
    name: "U Aung Myat Min",
    phone: "09-422667788",
    email: "aungmyatmin@school.edu.mm",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    subject: "UI/UX Design",
    classesCount: 3,
    studentsCount: 95,
    weeklyHours: 12,
    totalBilled: 28500000,
    totalCollected: 25100000,
  },
  {
    id: 4,
    name: "U Thant Zin Oo",
    phone: "09-511889922",
    email: "thantzinoo@school.edu.mm",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    subject: "Flutter Mobile",
    classesCount: 2,
    studentsCount: 82,
    weeklyHours: 8,
    totalBilled: 31160000,
    totalCollected: 27000000,
  },
  {
    id: 5,
    name: "Daw May Thu",
    phone: "09-250334455",
    email: "maythu@school.edu.mm",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    subject: "Japanese Language",
    classesCount: 3,
    studentsCount: 75,
    weeklyHours: 12,
    totalBilled: 18750000,
    totalCollected: 16300000,
  },
];

// =========================================================================
// CHART CONFIGURATIONS
// =========================================================================

const revenueChartConfig: ChartConfig = {
  billed: {
    label: "Total Billed (MMK)",
    color: "#2563eb",
  },
  collected: {
    label: "Payments Collected (MMK)",
    color: "#10b981",
  },
};

const cashflowChartConfig: ChartConfig = {
  cumulative: {
    label: "Cumulative Cash (MMK)",
    color: "#10b981",
  },
};

const paymentStatusChartConfig: ChartConfig = {
  paid: {
    label: "Fully Paid",
    color: "#10b981",
  },
  partial: {
    label: "Partially Paid",
    color: "#f59e0b",
  },
  unpaid: {
    label: "Unpaid",
    color: "#ef4444",
  },
};

const outstandingDebtChartConfig: ChartConfig = {
  pending: {
    label: "Pending Debt (MMK)",
    color: "#ef4444",
  },
};

const courseRevenueChartConfig: ChartConfig = {
  revenue: {
    label: "Total Billed (MMK)",
    color: "#2563eb",
  },
  collected: {
    label: "Payments Collected (MMK)",
    color: "#10b981",
  },
};

const courseEnrollmentChartConfig: ChartConfig = {
  students: {
    label: "Enrolled Students",
    color: "#3b82f6",
  },
};

const batchAverageChartConfig: ChartConfig = {
  avgStudents: {
    label: "Avg Students / Batch",
    color: "#8b5cf6",
  },
};

const coursePriceChartConfig: ChartConfig = {
  price: {
    label: "Catalog Fee (MMK)",
    color: "#06b6d4",
  },
};

const genderChartConfig: ChartConfig = {
  male: {
    label: "Male Students",
    color: "#3b82f6",
  },
  female: {
    label: "Female Students",
    color: "#ec4899",
  },
};

const overallGenderChartConfig: ChartConfig = {
  count: {
    label: "Students",
    color: "#3b82f6",
  },
};

const ageCohortChartConfig: ChartConfig = {
  count: {
    label: "Students Count",
    color: "#3b82f6",
  },
};

const newStudentsChartConfig: ChartConfig = {
  newStudents: {
    label: "New Enrollments",
    color: "#2563eb",
  },
};

const daysChartConfig: ChartConfig = {
  count: {
    label: "Active Batches",
    color: "#6366f1",
  },
};

const timeSlotsChartConfig: ChartConfig = {
  batches: {
    label: "Batches Running",
    color: "#8b5cf6",
  },
};

const teacherHoursChartConfig: ChartConfig = {
  hours: {
    label: "Weekly Teaching Hours",
    color: "#f59e0b",
  },
};

const teacherStudentsChartConfig: ChartConfig = {
  students: {
    label: "Enrolled Students",
    color: "#3b82f6",
  },
};

// =========================================================================
// MAIN ANALYSIS COMPONENT
// =========================================================================

const AnalysisPage = () => {
  useAddBreadcrumb({
    title: "Analysis",
  });

  const [activeTab, setActiveTab] = useState("financial");
  const [selectedTerm, setSelectedTerm] = useState("2026-h1");

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* 1. HEADER & FILTER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Academic & Financial Analysis
            </h1>
            <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5 border-primary/30 text-primary">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-primary" />
              Statistical Reports
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Visual breakdown of tuition collections, course enrollments, demographics, and faculty schedules.
          </p>
        </div>

        {/* Global Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Select defaultValue={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-[170px] h-9 text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Academic Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-h1">2026 H1 (Jan - Jun)</SelectItem>
              <SelectItem value="2025-h2">2025 H2 (Jul - Dec)</SelectItem>
              <SelectItem value="2025-h1">2025 H1 (Jan - Jun)</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Button asChild size="sm" variant="outline" className="h-9 gap-1.5 text-xs">
            <Link to="/timetable">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Timetable
            </Link>
          </Button>

          <Button asChild size="sm" className="h-9 gap-1.5 text-xs">
            <Link to="/payments">
              <DollarSign className="w-3.5 h-3.5" />
              Payments
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <Tabs defaultValue="financial" className="w-full space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-auto h-9">
            <TabsTrigger value="financial" className="text-xs gap-1.5">
              <DollarSign className="w-3.5 h-3.5" />
              Tuition & Revenue
            </TabsTrigger>
            <TabsTrigger value="courses" className="text-xs gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Courses & Batches
            </TabsTrigger>
            <TabsTrigger value="demographics" className="text-xs gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Student Demographics
            </TabsTrigger>
            <TabsTrigger value="faculty" className="text-xs gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Faculty & Schedule
            </TabsTrigger>
          </TabsList>

          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Viewing: <strong className="text-foreground capitalize">{activeTab}</strong> Analytics
          </span>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TUITION & REVENUE (4 GRAPHS) */}
        {/* ========================================================================= */}
        <TabsContent value="financial" className="space-y-6 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Graph 1: Monthly Tuition Invoiced vs Collected (2 Columns) */}
            <Card className="lg:col-span-2 shadow-xs">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-semibold">Monthly Tuition: Billed vs Collected</CardTitle>
                  <CardDescription className="text-xs">
                    Aggregated Enrollment prices vs actual Payment receipts recorded
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  H1 2026
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={revenueChartConfig} className="h-full w-full">
                    <BarChart
                      data={monthlyRevenueData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) => (
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">{name}:</span>
                                <span className="font-semibold text-foreground">
                                  {formatCurrency(Number(value))} MMK
                                </span>
                              </div>
                            )}
                          />
                        }
                      />
                      <Bar dataKey="billed" name="billed" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="collected" name="collected" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
              <CardFooter className="py-2.5 px-4 border-t bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
                <span>Total Billed: <strong>{formatCurrency(132700000)} MMK</strong></span>
                <span>Total Collected: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(114600000)} MMK</strong></span>
              </CardFooter>
            </Card>

            {/* Graph 2: Payment Status Distribution (1 Column) */}
            <Card className="shadow-xs flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Enrollment Payment Status</CardTitle>
                <CardDescription className="text-xs">
                  Fully Paid vs Partial vs Unpaid students
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] w-full flex items-center justify-center">
                  <ChartContainer config={paymentStatusChartConfig} className="h-full w-full">
                    <PieChart>
                      <Pie
                        data={paymentStatusShare}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {paymentStatusShare.map((entry, index) => (
                          <Cell key={`cell-pay-status-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val, name) => `${val} Enrollments (${name})`}
                          />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                </div>

                <div className="space-y-2 mt-2">
                  {paymentStatusShare.map((status, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: status.fill }} />
                        <span className="text-muted-foreground">{status.status}</span>
                      </div>
                      <span className="font-semibold text-foreground">{status.count} ({status.share}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-3 border-t text-xs text-muted-foreground">
                <span>377 Total Student Enrollments</span>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 3: Cumulative Cashflow Growth */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Cumulative Tuition Cash Flow</CardTitle>
                <CardDescription className="text-xs">
                  Aggregate cash collection trajectory over the semester
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={cashflowChartConfig} className="h-full w-full">
                    <AreaChart
                      data={cumulativeCashflowData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${formatCurrency(Number(val))} MMK Collected`}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#cashGrad)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 4: Outstanding Balance by Course */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Outstanding Tuition by Course</CardTitle>
                <CardDescription className="text-xs">
                  Unpaid tuition balance (Enrollment price - Payments) per course
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={outstandingDebtChartConfig} className="h-full w-full">
                    <BarChart
                      data={courseOutstandingDebt}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                      />
                      <YAxis
                        dataKey="course"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        width={110}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${formatCurrency(Number(val))} MMK Pending`}
                          />
                        }
                      />
                      <Bar dataKey="pending" name="pending" fill="#ef4444" radius={[0, 4, 4, 0]}>
                        {courseOutstandingDebt.map((entry, index) => (
                          <Cell key={`cell-debt-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FINANCIAL & TUITION REVENUE MATRIX TABLE */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <h3 className="text-base font-semibold text-foreground">Monthly Tuition & Collections Matrix</h3>
                <p className="text-xs text-muted-foreground">
                  Monthly breakdown of student enrollments, gross billing, cash collections, and recovery rates
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs w-fit">
                <Link to="/payments">
                  <DollarSign className="w-3.5 h-3.5" />
                  Payments Ledger
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableHead>Billing Period</TableHead>
                <TableHead>New Enrollments</TableHead>
                <TableHead align="right">Gross Invoiced</TableHead>
                <TableHead align="right">Payments Collected</TableHead>
                <TableHead align="right">Outstanding Balance</TableHead>
                <TableHead align="right">Collection Rate</TableHead>
              </TableHeader>
              <TableBody>
                {monthlyRevenueData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-xs shrink-0">
                          {item.month}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">2026 {item.month}</p>
                          <p className="text-xs text-muted-foreground">Semester Term 1</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={ClipboardList} value={`${item.enrollments} students`} />
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <p className="font-semibold text-foreground">{formatCurrency(item.billed)} MMK</p>
                        <p className="text-xs text-muted-foreground">invoiced</p>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(item.collected)} MMK</p>
                        <p className="text-xs text-muted-foreground">collected</p>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <p className="font-semibold text-amber-600 dark:text-amber-400">{formatCurrency(item.pending)} MMK</p>
                        <p className="text-xs text-muted-foreground">unpaid</p>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-semibold">
                        {item.rate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 2: COURSES & BATCHES */}
        {/* ========================================================================= */}
        <TabsContent value="courses" className="space-y-6 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 1: Course Revenue (Billed vs Collected) */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Tuition Invoiced vs Collected by Course</CardTitle>
                <CardDescription className="text-xs">
                  Gross tuition revenue vs verified payment collections
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={courseRevenueChartConfig} className="h-full w-full">
                    <BarChart
                      data={courseRevenueData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis
                        dataKey="course"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => val.split(" ")[0]}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) => (
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-muted-foreground">{name}:</span>
                                <span className="font-semibold">{formatCurrency(Number(value))} MMK</span>
                              </div>
                            )}
                          />
                        }
                      />
                      <Bar dataKey="revenue" name="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="collected" name="collected" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 2: Student Enrollment Share */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Student Enrollment Volume</CardTitle>
                <CardDescription className="text-xs">
                  Total student registration distribution per course
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={courseEnrollmentChartConfig} className="h-full w-full">
                    <BarChart
                      data={courseEnrollmentShare}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        width={110}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} Enrolled Students`}
                          />
                        }
                      />
                      <Bar dataKey="students" name="students" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                        {courseEnrollmentShare.map((entry, index) => (
                          <Cell key={`cell-enr-share-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 3: Average Students per Batch */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Average Students per Batch</CardTitle>
                <CardDescription className="text-xs">
                  Class density calculated per course program
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={batchAverageChartConfig} className="h-full w-full">
                    <BarChart
                      data={courseBatchAverageData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis
                        dataKey="course"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => val.split(" ")[0]}
                      />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} avg. students / batch`}
                          />
                        }
                      />
                      <Bar dataKey="avgStudents" name="avgStudents" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 4: Course Base Price Comparison */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Course Catalog Pricing</CardTitle>
                <CardDescription className="text-xs">
                  Standard course price (from Course.price)
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={coursePriceChartConfig} className="h-full w-full">
                    <BarChart
                      data={coursePriceDistribution}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                      />
                      <YAxis
                        dataKey="course"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        width={110}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${formatCurrency(Number(val))} MMK`}
                          />
                        }
                      />
                      <Bar dataKey="price" name="price" fill="#06b6d4" radius={[0, 4, 4, 0]}>
                        {coursePriceDistribution.map((entry, index) => (
                          <Cell key={`cell-price-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* COURSE PERFORMANCE MATRIX TABLE */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <h3 className="text-base font-semibold text-foreground">Course Performance & Financial Matrix</h3>
                <p className="text-xs text-muted-foreground">
                  Course catalog pricing, active class batches, student enrollments, and tuition revenue
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs w-fit">
                <Link to="/courses">
                  <BookOpen className="w-3.5 h-3.5" />
                  View All Courses
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableHead>Course</TableHead>
                <TableHead align="right">Catalog Price</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Avg Density</TableHead>
                <TableHead align="right">Gross Invoiced</TableHead>
                <TableHead align="right">Total Collected</TableHead>
                <TableHead align="right">Balance Due</TableHead>
              </TableHeader>
              <TableBody>
                {courseRevenueData.map((course, idx) => {
                  const pending = course.revenue - course.collected;
                  const students = courseEnrollmentShare[idx]?.students || 0;
                  const avg = students / (course.batches || 1);
                  const price = coursePriceDistribution.find(p => p.course === course.course)?.price || 300000;
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageDisplay
                            image={null}
                            alt={course.course}
                            fallbackIcon={BookOpen}
                            display="list"
                          />
                          <div>
                            <p className="font-medium text-foreground">{course.course}</p>
                            <p className="text-xs text-muted-foreground">Active Program</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <p className="font-semibold text-foreground">{formatCurrency(price)}</p>
                          <p className="text-xs text-muted-foreground">per course</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TableIconContent icon={BookOpen} value={`${course.batches} batches`} />
                      </TableCell>
                      <TableCell>
                        <TableIconContent icon={ClipboardList} value={`${students} students`} />
                      </TableCell>
                      <TableCell>
                        <TableIconContent icon={GraduationCap} value={`${avg.toFixed(1)} / batch`} />
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <p className="font-semibold text-foreground">{formatCurrency(course.revenue)} MMK</p>
                          <p className="text-xs text-muted-foreground">invoiced</p>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <p className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(course.collected)} MMK</p>
                          <p className="text-xs text-muted-foreground">{((course.collected / course.revenue) * 100).toFixed(0)}% paid</p>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <p className="font-semibold text-amber-600 dark:text-amber-400">{formatCurrency(pending)} MMK</p>
                          <p className="text-xs text-muted-foreground">pending</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 3: STUDENT DEMOGRAPHICS */}
        {/* ========================================================================= */}
        <TabsContent value="demographics" className="space-y-6 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Graph 1: Gender Distribution per Course (2 Columns) */}
            <Card className="lg:col-span-2 shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Gender Distribution per Course</CardTitle>
                <CardDescription className="text-xs">
                  Male vs Female student enrollment from Student.gender
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={genderChartConfig} className="h-full w-full">
                    <BarChart
                      data={courseGenderData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis
                        dataKey="course"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        tickFormatter={(val) => val.split(" ")[0]}
                      />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val, name) => (
                              <div className="flex items-center justify-between gap-3">
                                <span className="capitalize text-muted-foreground">{name}:</span>
                                <span className="font-semibold text-foreground">{val} students</span>
                              </div>
                            )}
                          />
                        }
                      />
                      <Bar dataKey="male" name="male" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="female" name="female" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
              <CardFooter className="py-2.5 px-4 border-t text-xs text-muted-foreground flex justify-between">
                <span>Total Male: 684 (54.8%)</span>
                <span>Total Female: 564 (45.2%)</span>
              </CardFooter>
            </Card>

            {/* Graph 2: Overall Gender Share Pie (1 Column) */}
            <Card className="shadow-xs flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Overall Gender Ratio</CardTitle>
                <CardDescription className="text-xs">
                  Male vs Female student population
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[200px] w-full flex items-center justify-center">
                  <ChartContainer config={overallGenderChartConfig} className="h-full w-full">
                    <PieChart>
                      <Pie
                        data={overallGenderData}
                        dataKey="count"
                        nameKey="gender"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                      >
                        {overallGenderData.map((entry, index) => (
                          <Cell key={`cell-gender-pie-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val, name) => `${val} students (${name})`}
                          />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                </div>

                <div className="space-y-2 mt-2">
                  {overallGenderData.map((gender, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: gender.fill }} />
                        <span className="text-muted-foreground">{gender.gender}</span>
                      </div>
                      <span className="font-semibold text-foreground">{gender.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-3 border-t text-xs text-muted-foreground">
                <span>1,248 Total Students Recorded</span>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 3: Student Age Cohorts */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Student Age Cohorts</CardTitle>
                <CardDescription className="text-xs">
                  Age brackets calculated from Student.dob
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={ageCohortChartConfig} className="h-full w-full">
                    <BarChart
                      data={studentAgeCohorts}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="cohort" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} Students`}
                          />
                        }
                      />
                      <Bar dataKey="count" name="count" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                        {studentAgeCohorts.map((entry, index) => (
                          <Cell key={`cell-age-cohort-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 4: Monthly New Admissions Trajectory */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Monthly Admission Inflow</CardTitle>
                <CardDescription className="text-xs">
                  New student registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[260px] w-full">
                  <ChartContainer config={newStudentsChartConfig} className="h-full w-full">
                    <AreaChart
                      data={monthlyNewStudents}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="studentsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} New Students`}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="newStudents"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#studentsGrad)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* STUDENT DEMOGRAPHICS MATRIX TABLE */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <h3 className="text-base font-semibold text-foreground">Program Demographics & Admission Matrix</h3>
                <p className="text-xs text-muted-foreground">
                  Gender distribution and student cohort profile across active course programs
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs w-fit">
                <Link to="/students">
                  <Users className="w-3.5 h-3.5" />
                  View All Students
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableHead>Course Program</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Male Enrolled</TableHead>
                <TableHead>Female Enrolled</TableHead>
                <TableHead>Gender Ratio</TableHead>
                <TableHead align="right">Dominant Gender</TableHead>
              </TableHeader>
              <TableBody>
                {courseGenderData.map((item, idx) => {
                  const total = item.male + item.female;
                  const malePercent = ((item.male / total) * 100).toFixed(1);
                  const femalePercent = ((item.female / total) * 100).toFixed(1);
                  const isMaleDominant = item.male >= item.female;
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageDisplay
                            image={null}
                            alt={item.course}
                            fallbackIcon={BookOpen}
                            display="list"
                          />
                          <div>
                            <p className="font-medium text-foreground">{item.course}</p>
                            <p className="text-xs text-muted-foreground">Course Program</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TableIconContent icon={GraduationCap} value={`${total} students`} />
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {item.male} ({malePercent}%)
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-pink-600 dark:text-pink-400">
                          {item.female} ({femalePercent}%)
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="w-28 h-2 rounded-full bg-pink-400/30 overflow-hidden flex">
                            <div className="h-full bg-blue-500" style={{ width: `${malePercent}%` }} />
                          </div>
                          <div className="flex justify-between text-[10px] text-muted-foreground w-28">
                            <span>{malePercent}% M</span>
                            <span>{femalePercent}% F</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {isMaleDominant ? (
                          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                            Male ({malePercent}%)
                          </Badge>
                        ) : (
                          <Badge className="bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20 text-xs">
                            Female ({femalePercent}%)
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ========================================================================= */}
        {/* TAB 4: FACULTY & SCHEDULE (2 GRAPHS PER ROW + TABLE) */}
        {/* ========================================================================= */}
        <TabsContent value="faculty" className="space-y-6 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 1: Classes by Day of Week */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Active Classes by Day</CardTitle>
                <CardDescription className="text-xs">
                  Class batch count from Class.days
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={daysChartConfig} className="h-full w-full">
                    <BarChart
                      data={classDaysData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} active batches`}
                          />
                        }
                      />
                      <Bar dataKey="count" name="count" fill="#6366f1" radius={[4, 4, 0, 0]}>
                        {classDaysData.map((entry, index) => (
                          <Cell key={`cell-days-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 2: Class Time Slots */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Class Time Slots</CardTitle>
                <CardDescription className="text-xs">
                  Morning, Afternoon & Evening sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={timeSlotsChartConfig} className="h-full w-full">
                    <BarChart
                      data={classTimeSlotsData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis
                        dataKey="slot"
                        tickLine={false}
                        axisLine={false}
                        fontSize={10}
                        tickFormatter={(val) => val.split(" ")[0]}
                      />
                      <YAxis tickLine={false} axisLine={false} fontSize={11} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} Batches`}
                          />
                        }
                      />
                      <Bar dataKey="batches" name="batches" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                        {classTimeSlotsData.map((entry, index) => (
                          <Cell key={`cell-slots-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 3: Weekly Teaching Hours */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Weekly Teaching Hours</CardTitle>
                <CardDescription className="text-xs">
                  Teaching hours load per instructor
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={teacherHoursChartConfig} className="h-full w-full">
                    <BarChart
                      data={teacherWeeklyHoursData}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis
                        dataKey="teacher"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        fontSize={10}
                        width={95}
                        tickFormatter={(val) => val.split(" ").slice(0, 2).join(" ")}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} hrs/week`}
                          />
                        }
                      />
                      <Bar dataKey="hours" name="hours" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graph 4: Teacher Student Mentorship */}
            <Card className="shadow-xs">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Teacher Mentorship & Student Load</CardTitle>
                <CardDescription className="text-xs">
                  Total enrolled students mentored across active batches
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[280px] w-full">
                  <ChartContainer config={teacherStudentsChartConfig} className="h-full w-full">
                    <BarChart
                      data={teacherStudentsLoadData}
                      layout="vertical"
                      margin={{ top: 5, right: 20, left: 35, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                      <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
                      <YAxis
                        dataKey="teacher"
                        type="category"
                        tickLine={false}
                        axisLine={false}
                        fontSize={10}
                        width={95}
                        tickFormatter={(val) => val.split(" ").slice(0, 2).join(" ")}
                      />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(val) => `${val} Students Mentored`}
                          />
                        }
                      />
                      <Bar dataKey="students" name="students" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                        {teacherStudentsLoadData.map((entry, index) => (
                          <Cell key={`cell-teacher-stud-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* REDESIGNED FACULTY LOAD MATRIX TABLE (matching TeachersList) */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <div>
                <h3 className="text-base font-semibold text-foreground">Faculty Class & Revenue Load Matrix</h3>
                <p className="text-xs text-muted-foreground">
                  Assigned classes, weekly hours, total students, and tuition revenue handled per teacher
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 text-xs w-fit">
                <Link to="/teachers">
                  <UserPen className="w-3.5 h-3.5" />
                  View All Teachers
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableHead>Instructor</TableHead>
                <TableHead>Contact Phone</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead>Weekly Hours</TableHead>
                <TableHead>Students</TableHead>
                <TableHead align="right">Gross Invoiced</TableHead>
                <TableHead align="right">Total Collected</TableHead>
              </TableHeader>
              <TableBody>
                {facultyAnalysisList.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={teacher.image} alt={teacher.name} />
                          <AvatarFallback>{generateImageFallBack(teacher.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{teacher.name}</p>
                          <p className="text-xs text-muted-foreground">{teacher.subject}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={Phone} value={teacher.phone} />
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={Mail} value={teacher.email} />
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">{teacher.subject}</span>
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={BookOpen} value={`${teacher.classesCount} batches`} />
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={Clock} value={`${teacher.weeklyHours} hrs/wk`} />
                    </TableCell>
                    <TableCell>
                      <TableIconContent icon={GraduationCap} value={`${teacher.studentsCount} students`} />
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <p className="font-semibold text-foreground">{formatCurrency(teacher.totalBilled)} MMK</p>
                        <p className="text-xs text-muted-foreground">invoiced</p>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(teacher.totalCollected)} MMK</p>
                        <p className="text-xs text-muted-foreground">collected</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalysisPage;
