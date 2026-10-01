import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import { PieChart } from "lucide-react";
import AnalysisTeacherRevenueTable from "./AnalysisTeacherRevenueTable";
import AnalysisTeacherRevenueChart from "./AnalysisTeacherRevenueChart";
import { useTranslation } from "react-i18next";

const colors = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

const AnalysisTeacherRevenueContainer = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const formattedData = data.map((item: any, i: number) => ({
    id: i,
    name:
      item.name === "Others" ? t("analysis.teacherRevenue.others") : item.name,
    total_revenue: Number(item.total_revenue),
    total_enrollments: Number(item.total_enrollments),
    color: colors[i % colors.length],
    fill: colors[i % colors.length],
  }));

  return (
    <DashboardCard
      className="lg:col-span-2"
      title={t("analysis.teacherRevenue.title")}
      description={t("analysis.teacherRevenue.description")}
      icon={PieChart}
    >
      <CardContent className=" flex-1 grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
        <AnalysisTeacherRevenueChart formattedData={formattedData} />

        <AnalysisTeacherRevenueTable formattedData={formattedData} />
      </CardContent>
    </DashboardCard>
  );
};

export default AnalysisTeacherRevenueContainer;
