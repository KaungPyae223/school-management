import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const DashboardCourseEnrollmentChart = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  const chartConfig = {
    total_enrollments: { label: t("dashboard.courseEnrollment.enrollments") },
    ...Object.fromEntries(
      data.map((row: any) => [
        row.name,
        {
          label: row.name,
          color: row.color,
        },
      ]),
    ),
  } as ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <PieChart>
        <Pie
          data={data}
          dataKey="total_enrollments"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(val, name) =>
                `${t("dashboard.courseEnrollment.enrolled", {
                  count: replaceLocalDigit(val as string | number | undefined),
                })} (${name})`
              }
            />
          }
        />
      </PieChart>
    </ChartContainer>
  );
};

export default DashboardCourseEnrollmentChart;
