import { Link } from "react-router";
import {
  GraduationCap,
  BookOpen,
  DollarSign,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Phone,
  UserPlus,
} from "lucide-react";

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

import { ScrollArea } from "../../../components/ui/scroll-area";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { formatCurrency } from "../../../utils/format-currency";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../../../components/card-utils/DashboardCard";
import DashboardKPIContainer from "../components/kpi/DashboardKPIContainer";
import { useAppQuery } from "../../../hooks/use-app-query";
import { dashboardService } from "../../../services/dashboard";
import LoadingPage from "../../../components/loading/LoadingPage";
import DashboardRevenueEnrollmentContainer from "../components/revenue-enrollment/DashboardRevenueEnrollmentContainer";
import DashboardCourseEnrollmentContainer from "../components/course-enrollment/DashboardCourseEnrollmentContainer";
import DashboardTodayClassesContainer from "../components/today-classes/DashboardTodayClassesContainer";

// ==========================================
// DUMMY DATA BASED ON PRISMA SCHEMA
// ==========================================
const dummyStats = {
  totalStudents: 1248,
  studentsGrowth: "+14.2%",
  maleStudents: 684,
  femaleStudents: 564,
  totalTeachers: 38,
  teachersGrowth: "+4 this month",
  activeCourses: 18,
  totalClasses: 46,
  activeBatches: 32,
  totalRevenue: 64250000, // in MMK
  collectedRevenue: 54800000,
  pendingRevenue: 9450000,
  revenueGrowth: "+18.6%",
  collectionRate: 85.3,
};

// Dummy Recent Enrollments (Enrollment + Student + Class schema)
const recentEnrollments = [
  {
    id: 1,
    studentName: "Mya Myat Noe",
    studentPhone: "09-798123456",
    studentGender: "FEMALE",
    studentImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    courseName: "Fullstack Web Dev",
    batch: 12,
    price: 350000,
    paidAmount: 350000,
    paymentStatus: "paid", // 'paid' | 'partial' | 'unpaid'
    enrolledAt: "10 mins ago",
  },
  {
    id: 2,
    studentName: "Kaung Sithu",
    studentPhone: "09-420987654",
    studentGender: "MALE",
    studentImage:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    courseName: "UI/UX Design Masterclass",
    batch: 8,
    price: 300000,
    paidAmount: 150000,
    paymentStatus: "partial",
    enrolledAt: "1 hour ago",
  },
  {
    id: 3,
    studentName: "Thiri Shwe Sin",
    studentPhone: "09-976543210",
    studentGender: "FEMALE",
    studentImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    courseName: "Python for Data Science",
    batch: 5,
    price: 400000,
    paidAmount: 400000,
    paymentStatus: "paid",
    enrolledAt: "3 hours ago",
  },
  {
    id: 4,
    studentName: "Aung Phone Myint",
    studentPhone: "09-250123789",
    studentGender: "MALE",
    studentImage:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    courseName: "Japanese Language (N3)",
    batch: 7,
    price: 250000,
    paidAmount: 0,
    paymentStatus: "unpaid",
    enrolledAt: "5 hours ago",
  },
  {
    id: 5,
    studentName: "Khin Wint Wah",
    studentPhone: "09-770889900",
    studentGender: "FEMALE",
    studentImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    courseName: "Flutter Mobile App Dev",
    batch: 4,
    price: 380000,
    paidAmount: 380000,
    paymentStatus: "paid",
    enrolledAt: "Yesterday",
  },
];

// Dummy Recent Payments Feed (Payment + Enrollment schema)
const recentPayments = [
  {
    id: 1001,
    invoiceNo: "PAY-2026-089",
    studentName: "Mya Myat Noe",
    amount: 350000,
    method: "KBZPay",
    courseName: "Fullstack Web Dev (Batch 12)",
    date: "Today, 10:45 AM",
    status: "verified",
  },
  {
    id: 1002,
    invoiceNo: "PAY-2026-088",
    studentName: "Kaung Sithu",
    amount: 150000,
    method: "WavePay",
    courseName: "UI/UX Design Masterclass (Batch 8)",
    date: "Today, 09:20 AM",
    status: "verified",
  },
  {
    id: 1003,
    invoiceNo: "PAY-2026-087",
    studentName: "Thiri Shwe Sin",
    amount: 400000,
    method: "AYA Bank Transfer",
    courseName: "Python for Data Science (Batch 5)",
    date: "Today, 08:05 AM",
    status: "verified",
  },
  {
    id: 1004,
    invoiceNo: "PAY-2026-086",
    studentName: "Min Khant Kyaw",
    amount: 320000,
    method: "Cash Payment",
    courseName: "Business English (Batch 3)",
    date: "Yesterday, 04:15 PM",
    status: "verified",
  },
];

// Dummy Pending Tuition Dues (Enrollment + Student + Class schema)
const pendingTuitionList = [
  {
    id: 1,
    studentName: "Aung Phone Myint",
    studentPhone: "09-250123789",
    studentImage:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    courseName: "Japanese Language (N3)",
    batch: 7,
    totalPrice: 250000,
    paidAmount: 0,
    dueAmount: 250000,
    status: "unpaid" as const,
    dueNote: "Overdue by 5 days",
  },
  {
    id: 2,
    studentName: "Kaung Sithu",
    studentPhone: "09-420987654",
    studentImage:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    courseName: "UI/UX Design Masterclass",
    batch: 8,
    totalPrice: 300000,
    paidAmount: 150000,
    dueAmount: 150000,
    status: "partial" as const,
    dueNote: "Due in 2 days",
  },
  {
    id: 3,
    studentName: "Ei Ei Phyo",
    studentPhone: "09-789012345",
    studentImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    courseName: "Python for Data Science",
    batch: 5,
    totalPrice: 400000,
    paidAmount: 200000,
    dueAmount: 200000,
    status: "partial" as const,
    dueNote: "Due tomorrow",
  },
  {
    id: 4,
    studentName: "Zin Min Htet",
    studentPhone: "09-965432109",
    studentImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    courseName: "Flutter Mobile App Dev",
    batch: 4,
    totalPrice: 380000,
    paidAmount: 0,
    dueAmount: 380000,
    status: "unpaid" as const,
    dueNote: "Overdue by 1 week",
  },
];

const DashboardPage = () => {
  useAddBreadcrumb({
    title: "Dashboard",
  });

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["dashboard"],

    queryFn: async () => {
      const [kpi, revenueEnrollment, courseEnrollment, todayClasses] =
        await Promise.all([
          dashboardService.getKPI(),
          dashboardService.getRevenueEnrollment(),
          dashboardService.getCoursesEnrollments(),
          dashboardService.getTodayClasses(),
        ]);

      return {
        kpi,
        revenueEnrollment,
        courseEnrollment,
        todayClasses,
      };
    },
  }) as {
    data: {
      kpi: any;
      revenueEnrollment: any[];
      courseEnrollment: any[];
      todayClasses: any[];
    };
    isLoading: boolean;
    error: any;
  };

  console.log(data);

  if (isLoading) return <LoadingPage />;

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col space-y-7">
      <DashboardHeader />

      <DashboardKPIContainer kpi={data?.kpi} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardRevenueEnrollmentContainer data={data?.revenueEnrollment} />
        <DashboardCourseEnrollmentContainer
          data={data?.courseEnrollment}
          totalCourses={data?.kpi?.courses}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardTodayClassesContainer data={data?.todayClasses} />

        {/* Recent Enrollments Table (2 Columns) */}
        <Card className="lg:col-span-2 shadow-xs flex flex-col">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Enrollments
              </CardTitle>
              <CardDescription className="text-xs">
                Latest student admissions and class registrations
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs h-8">
              <Link to="/students">View All Students</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-muted/30 text-muted-foreground font-medium">
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-3">Enrolled Course</th>
                    <th className="py-2.5 px-3">Tuition Fee</th>
                    <th className="py-2.5 px-3">Payment Status</th>
                    <th className="py-2.5 px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentEnrollments.map((enrollment) => (
                    <tr
                      key={enrollment.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {/* Student info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={enrollment.studentImage}
                              alt={enrollment.studentName}
                            />
                            <AvatarFallback className="text-xs">
                              {enrollment.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">
                              {enrollment.studentName}
                            </p>
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Phone className="w-2.5 h-2.5" />
                              {enrollment.studentPhone}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-foreground">
                          {enrollment.courseName}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Batch {enrollment.batch}
                        </div>
                      </td>

                      {/* Tuition */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-foreground">
                          {formatCurrency(enrollment.price)} MMK
                        </div>
                        {enrollment.paymentStatus === "partial" && (
                          <div className="text-[10px] text-amber-600">
                            Paid: {formatCurrency(enrollment.paidAmount)}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        {enrollment.paymentStatus === "paid" && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Fully Paid
                          </Badge>
                        )}
                        {enrollment.paymentStatus === "partial" && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[11px] font-medium"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Partial
                          </Badge>
                        )}
                        {enrollment.paymentStatus === "unpaid" && (
                          <Badge
                            variant="secondary"
                            className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[11px] font-medium"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Unpaid
                          </Badge>
                        )}
                      </td>

                      {/* Enrolled time */}
                      <td className="py-3 px-4 text-right text-muted-foreground whitespace-nowrap">
                        {enrollment.enrolledAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="py-2.5 px-4 border-t bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing recent 5 of {dummyStats.totalStudents} registrations
            </span>
            <Link
              to="/classes"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              Enroll Student <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* 5. BOTTOM SECTION: RECENT PAYMENTS FEED & TOP INSTRUCTORS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments Feed (2 Columns) */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Recent Payment Transactions
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time tuition fees receipts and payment methods
              </CardDescription>
            </div>
            <Button asChild variant="outline" size="sm" className="text-xs h-8">
              <Link to="/payments">
                <CreditCard className="w-3.5 h-3.5 mr-1 text-primary" />
                Payments History
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-3.5 px-4 flex items-center justify-between gap-3 hover:bg-muted/25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-foreground">
                          {payment.studentName}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 font-mono text-muted-foreground"
                        >
                          {payment.invoiceNo}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {payment.courseName} •{" "}
                        <span className="font-medium text-foreground/80">
                          {payment.method}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(payment.amount)} MMK
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {payment.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="py-2.5 px-4 border-t text-xs text-muted-foreground flex justify-between">
            <span>4 transactions verified today</span>
            <span className="font-medium text-foreground">
              Total Today: +{formatCurrency(1220000)} MMK
            </span>
          </CardFooter>
        </Card>

        {/* Pending Tuition & Dues Card (1 Column) */}
        <Card className="shadow-xs flex flex-col justify-between">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                Pending Tuition & Dues
              </CardTitle>
              <CardDescription className="text-xs">
                Students with outstanding fee balances
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20 font-mono"
            >
              4 Accounts
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {pendingTuitionList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-lg border bg-card/40 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar className="w-9 h-9 border shrink-0">
                    <AvatarImage
                      src={item.studentImage}
                      alt={item.studentName}
                    />
                    <AvatarFallback className="text-xs">
                      {item.studentName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold text-xs text-foreground truncate">
                        {item.studentName}
                      </p>
                      {item.status === "unpaid" ? (
                        <Badge
                          variant="secondary"
                          className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 text-[9px] px-1 py-0"
                        >
                          Unpaid
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[9px] px-1 py-0"
                        >
                          Partial
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.courseName} (B-{item.batch})
                    </p>
                    <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {item.dueNote}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {formatCurrency(item.dueAmount)} MMK
                  </p>
                  <a
                    href={`tel:${item.studentPhone}`}
                    className="text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-end gap-1 mt-1"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    {item.studentPhone}
                  </a>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="py-2.5 px-4 border-t text-xs text-muted-foreground flex justify-between items-center bg-muted/20">
            <span>
              Total Pending:{" "}
              <strong className="text-amber-600 dark:text-amber-400">
                {formatCurrency(dummyStats.pendingRevenue)} MMK
              </strong>
            </span>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 font-medium text-primary hover:text-primary"
            >
              <Link to="/payments">
                View All Dues <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 6. SYSTEM QUICK SHORTCUTS / MANAGEMENT BAR */}
      <Card className="shadow-xs bg-linear-to-r from-primary/5 via-background to-secondary/10 border">
        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-xs">
              <SchoolIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                Quick Management Actions
              </h3>
              <p className="text-xs text-muted-foreground">
                Direct access to core school management modules
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-background"
            >
              <Link to="/students">
                <UserPlus className="w-3.5 h-3.5 mr-1" />
                Add Student
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-background"
            >
              <Link to="/courses">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                Add Course
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-background"
            >
              <Link to="/teachers">
                <GraduationCap className="w-3.5 h-3.5 mr-1" />
                Add Teacher
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs h-8 bg-background"
            >
              <Link to="/payments">
                <DollarSign className="w-3.5 h-3.5 mr-1" />
                Record Payment
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fallback School Icon for quick actions
const SchoolIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M18 5v17" />
    <path d="m4 6 8-4 8 4" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);

export default DashboardPage;
