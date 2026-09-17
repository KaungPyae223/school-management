import { formatCurrency } from "../../../../utils/format-currency";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import DashboardKPI from "./DashboardKPI";
import { BookOpen, DollarSign, GraduationCap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const DashboardKPIContainer = ({ kpi }: { kpi: any }) => {
  const { t } = useTranslation();

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      data-tour="kpi"
    >
      <DashboardKPI
        title={t("dashboard.kpi.totalStudents")}
        icon={Users}
        statistics={replaceLocalDigit(
          formatCurrency(kpi.students?.total_students || 0),
        )}
        iconBg="bg-blue-500/10 text-blue-600 dark:text-blue-400"
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {t("dashboard.kpi.male")}:{" "}
            <strong className="text-foreground">
              {replaceLocalDigit(
                formatCurrency(kpi.students?.total_male_students || 0),
              )}
            </strong>
          </span>
          <span>
            {t("dashboard.kpi.female")}:{" "}
            <strong className="text-foreground">
              {replaceLocalDigit(
                formatCurrency(kpi.students?.total_female_students || 0),
              )}
            </strong>
          </span>
        </div>
      </DashboardKPI>

      <DashboardKPI
        title={t("dashboard.kpi.activeTeachingStaff")}
        icon={GraduationCap}
        statistics={replaceLocalDigit(formatCurrency(kpi?.teachers || 0))}
        iconBg="bg-purple-500/10 text-purple-600 dark:text-purple-400"
      >
        <div className="text-xs text-muted-foreground">
          {t("dashboard.kpi.classLoad")}:{" "}
          <strong className="text-foreground">
            {replaceLocalDigit(
              Math.round(
                Number(kpi.active_class_status?.total_active_classes ?? 0) /
                  Number(kpi.teachers || 1),
              ),
            )}{" "}
            {t("dashboard.kpi.batchesPerTeacher")}
          </strong>
        </div>
      </DashboardKPI>

      <DashboardKPI
        title={t("dashboard.kpi.coursesAndBatches")}
        icon={BookOpen}
        statistics={
          <>
            <span>{replaceLocalDigit(kpi?.courses || 0)}</span>
            <span className="text-sm font-normal text-muted-foreground">
              /{" "}
              {replaceLocalDigit(
                kpi.active_class_status?.total_active_classes || 0,
              )}{" "}
              {t("dashboard.kpi.activeBatches")}
            </span>
          </>
        }
        iconBg="bg-amber-500/10 text-amber-600 dark:text-amber-400"
      >
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>
            {t("dashboard.kpi.avgClassSize")}:{" "}
            <strong className="text-foreground">
              {replaceLocalDigit(
                kpi.active_class_status?.avg_enrollments_per_class || 0,
              )}{" "}
              {t("dashboard.kpi.students")}
            </strong>
          </span>
        </div>
      </DashboardKPI>

      <DashboardKPI
        title={t("dashboard.kpi.tuitionCollected")}
        icon={DollarSign}
        statistics={replaceLocalDigit(
          formatCurrency(kpi?.total_collected?.total_paid_amount || 0),
        )}
        iconBg="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      >
        <div className="flex items-center text-xs text-muted-foreground">
          <span>
            {t("dashboard.kpi.unpaidBalance")}:{" "}
            <strong className="text-amber-600 dark:text-amber-400">
              {replaceLocalDigit(
                formatCurrency(
                  kpi?.total_collected?.total_remaining_amount || 0,
                ),
              )}
            </strong>
          </span>
        </div>
      </DashboardKPI>
    </div>
  );
};

export default DashboardKPIContainer;
