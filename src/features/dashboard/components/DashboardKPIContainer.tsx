import { formatCurrency } from "../../../utils/format-currency";
import DashboardKPI from "./DashboardKPI";
import { BookOpen, DollarSign, GraduationCap, Users } from "lucide-react";

const dummyStats = {
  totalStudents: 1248,
  maleStudents: 684,
  femaleStudents: 564,
  activeCourses: 18,
  activeBatches: 32,
  collectedRevenue: 54800000,
  pendingRevenue: 9450000,
};

const DashboardKPIContainer = ({ kpi }: { kpi: any }) => {
  const studentStats = kpi?.students.reduce(
    (acc, item) => {
      const count = item._count.id;

      acc.total += count;

      if (item.gender === "MALE") {
        acc.male += count;
      }

      if (item.gender === "FEMALE") {
        acc.female += count;
      }

      return acc;
    },
    {
      total: 0,
      male: 0,
      female: 0,
    },
  ) ?? {
    total: 0,
    male: 0,
    female: 0,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardKPI
        title="Total Students"
        icon={Users}
        statistics={formatCurrency(studentStats.total)}
        iconBg="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Male:{" "}
            <strong className="text-foreground">
              {formatCurrency(studentStats.male)}
            </strong>
          </span>
          <span>
            Female:{" "}
            <strong className="text-foreground">
              {formatCurrency(studentStats.female)}
            </strong>
          </span>
        </div>
      </DashboardKPI>

      <DashboardKPI
        title="Active Teaching Staff"
        icon={GraduationCap}
        statistics={formatCurrency(kpi?.teachers)}
        iconBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
      >
        <div className="text-xs text-muted-foreground">
          Class load:{" "}
          <strong className="text-foreground">
            {Math.round((kpi?.classes || 0) / (kpi?.teachers || 1))}{" "}
            batches/teacher
          </strong>
        </div>
      </DashboardKPI>

      {/* Card 3: Active Courses & Batches */}

      <DashboardKPI
        title="Courses & Batches"
        icon={BookOpen}
        statistics={
          <>
            <span>{kpi?.courses}</span>
            <span className="text-sm font-normal text-muted-foreground">
              / {kpi?.classes} active batches
            </span>
          </>
        }
        iconBg="bg-amber-500/10 text-amber-600 dark:text-amber-400"
      >
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            Avg. class size:{" "}
            <strong className="text-foreground">
              {Math.round((kpi?.enrollments || 0) / (kpi?.classes || 1))}{" "}
              students
            </strong>
          </span>
        </div>
      </DashboardKPI>

      {/* Card 4: Tuition Collections & Revenue */}

      <DashboardKPI
        title="Tuition Collected"
        icon={DollarSign}
        statistics={formatCurrency(kpi?.revenue?._sum.amount || 0)}
        iconBg="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <div className="flex items-center text-xs text-muted-foreground">
          <span>
            Unpaid balance:{" "}
            <strong className="text-amber-600 dark:text-amber-400">
              {formatCurrency(dummyStats.pendingRevenue)}
            </strong>
          </span>
        </div>
      </DashboardKPI>
    </div>
  );
};

export default DashboardKPIContainer;
