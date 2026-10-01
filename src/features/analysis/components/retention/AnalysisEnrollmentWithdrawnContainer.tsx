import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen, RefreshCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnalysisEnrollmentWithdrawnChart from "./AnalysisEnrollmentWithdrawnChart";

const AnalysisEnrollmentWithdrawnContainer = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const totalNew = data.reduce(
    (acc, item) => acc + Number(item.total_enrollments),
    0,
  );
  const totalWithdrawn = data.reduce(
    (acc, item) => acc + Number(item.total_withdrawns),
    0,
  );
  const retention = totalNew > 0 ? (1 - totalWithdrawn / totalNew) * 100 : 0;

  return (
    <DashboardCard
      className="lg:col-span-2"
      title={t("analysis.retention.title")}
      description={t("analysis.retention.description")}
      icon={RefreshCcw}
    >
      <DataShow
        isLoading={false}
        dataLength={data.length}
        emptyTitle={t("analysis.retention.emptyTitle")}
        emptyDescription={t("analysis.retention.emptyDescription")}
        emptyIcon={BookOpen}
        action={{
          label: t("dashboard.revenueEnrollment.createEnrollment"),
          link: "/classes",
        }}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="ps-0 flex-1 flex items-center">
          <AnalysisEnrollmentWithdrawnChart data={data} />
        </CardContent>

        <CardFooter className="py-3 mt-auto text-xs flex justify-between items-center">
          <span className="text-muted-foreground">
            {t("analysis.retention.retentionRate")}{" "}
            <span className="text-primary font-medium">
              (
              {t("analysis.retention.inOut", {
                inCount: totalNew,
                outCount: totalWithdrawn,
              })}
              )
            </span>
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary font-medium">
              {retention.toFixed(1)}%
            </span>
          </span>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};

export default AnalysisEnrollmentWithdrawnContainer;
