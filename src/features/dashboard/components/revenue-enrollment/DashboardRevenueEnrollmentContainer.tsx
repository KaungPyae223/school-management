import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import { formatCurrency } from "../../../../utils/format-currency";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen } from "lucide-react";
import DashboardRevenueEnrollmentChart from "./DashboardRevenueEnrollmentChart";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface RevenueEnrollmentData {
  date: string;
  month: string;
  total_revenue: string;
  total_enrollments: string;
}

const DashboardRevenueEnrollmentContainer = ({
  data,
}: {
  data: RevenueEnrollmentData[];
}) => {
  const { t } = useTranslation();

  const formattedData = data
    .sort((a: RevenueEnrollmentData, b: RevenueEnrollmentData) => {
      return a.date.localeCompare(b.date);
    })
    .map((item: RevenueEnrollmentData) => ({
      month: months[Number(item.month) - 1] || "Unknown",
      revenue: Number(item.total_revenue),
      enrollments: Number(item.total_enrollments),
    }));

  const totalData = data.reduce(
    (
      acc: { revenue: number; enrollments: number },
      item: RevenueEnrollmentData,
    ) => {
      return {
        revenue: acc.revenue + Number(item.total_revenue),
        enrollments: acc.enrollments + Number(item.total_enrollments),
      };
    },
    { revenue: 0, enrollments: 0 },
  );

  return (
    <DashboardCard
      className="lg:col-span-2 "
      title={t("dashboard.revenueEnrollment.title")}
      description={t("dashboard.revenueEnrollment.description")}
      dataTour="revenue-enrollment"
    >
      <DataShow
        isLoading={false}
        dataLength={data?.length}
        emptyTitle={t("dashboard.revenueEnrollment.emptyTitle")}
        emptyDescription={t("dashboard.revenueEnrollment.emptyDescription")}
        emptyIcon={BookOpen}
        action={{
          label: t("dashboard.revenueEnrollment.createEnrollment"),
          link: "/classes",
        }}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0 flex-1">
          <DashboardRevenueEnrollmentChart data={formattedData} />
        </CardContent>
        <CardFooter className="py-2.5 mt-auto text-xs flex justify-around text-center items-center">
          <div>
            <p className="text-[11px] text-muted-foreground">
              {t("dashboard.revenueEnrollment.monthlyAvg")}{" "}
              {formattedData.length > 0
                ? `(${formattedData[0].month} - ${formattedData[formattedData.length - 1].month})`
                : ""}
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              {replaceLocalDigit(formatCurrency(totalData.revenue))}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">
              {t("dashboard.revenueEnrollment.totalEnrolled")}{" "}
              {formattedData.length > 0
                ? `(${formattedData[0].month} - ${formattedData[formattedData.length - 1].month})`
                : ""}
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              {replaceLocalDigit(totalData.enrollments)}{" "}
              {t("dashboard.revenueEnrollment.students")}
            </p>
          </div>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};

export default DashboardRevenueEnrollmentContainer;
