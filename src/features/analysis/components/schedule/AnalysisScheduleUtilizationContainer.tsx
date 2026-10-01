import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen, CalendarDays } from "lucide-react";
import AnalysisScheduleUtilizationChart from "./AnalysisScheduleUtilizationChart";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const AnalysisScheduleUtilizationContainer = ({
  data = [],
}: {
  data: any[];
}) => {
  const { t } = useTranslation();

  const peak = data.reduce(
    (a, b) => (b.total_enrollment_count > a.total_enrollment_count ? b : a),
    data[0],
  );

  const slots = data.reduce((acc, d) => acc + Number(d.class_count), 0);

  return (
    <DashboardCard
      className="lg:col-span-2"
      title={t("analysis.schedule.title")}
      description={t("analysis.schedule.description")}
      icon={CalendarDays}
    >
      <DataShow
        isLoading={false}
        dataLength={data.length}
        emptyTitle={t("analysis.schedule.emptyTitle")}
        emptyDescription={t("analysis.schedule.emptyDescription")}
        emptyIcon={BookOpen}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0 flex-1">
          <AnalysisScheduleUtilizationChart data={data} />
        </CardContent>

        <CardFooter className="py-3 mt-auto text-xs flex justify-between items-center">
          <span className="text-muted-foreground">
            {t("analysis.schedule.busiestDay")}:{" "}
            <span className="text-primary font-medium">
              {peak?.day_name ? t(`general.days.${peak.day_name}`) : "—"} (
              {t("analysis.schedule.studentsCount", {
                count: replaceLocalDigit(peak?.total_enrollment_count ?? 0),
              })}
              )
            </span>
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary font-medium">
              {replaceLocalDigit(slots)}
            </span>{" "}
            {t("analysis.schedule.weeklyClassSlots")}
          </span>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};

export default AnalysisScheduleUtilizationContainer;
