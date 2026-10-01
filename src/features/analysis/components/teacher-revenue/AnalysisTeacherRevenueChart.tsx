import { formatCurrency } from "../../../../utils/format-currency";
import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { useTranslation } from "react-i18next";

const AnalysisTeacherRevenueChart = ({ formattedData }: any) => {
  const { t } = useTranslation();

  const total = formattedData.reduce(
    (pv, cv) => pv + Number(cv.total_revenue),
    0,
  );

  const chartConfig = {
    total_revenue: { label: t("analysis.teacherRevenue.totalRevenue") },
    total_enrollments: { label: t("analysis.teacherRevenue.totalEnrollments") },
    ...Object.fromEntries(
      formattedData.map((row: any) => [
        row.name,
        {
          label: row.name,
          color: row.color,
        },
      ]),
    ),
  } as ChartConfig;

  return (
    <div className="relative">
      <ChartContainer config={chartConfig} className="mx-auto h-80 w-full">
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="total_enrollments"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={95}
            paddingAngle={3}
          >
            {formattedData.map((entry) => (
              <Cell
                key={`inner-${entry.id}`}
                fill={entry.color}
                opacity={0.8}
              />
            ))}
          </Pie>

          <Pie
            data={formattedData}
            dataKey="total_revenue"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={102}
            outerRadius={122}
            paddingAngle={3}
          >
            {formattedData.map((entry) => (
              <Cell key={`outer-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => (
                  <div className="flex items-center justify-between bg-white gap-4 text-xs">
                    <span className="text-muted-foreground">
                      {item.dataKey === "total_revenue"
                        ? t("analysis.teacherRevenue.revenue")
                        : t("analysis.teacherRevenue.enrollments")}
                      :
                    </span>
                    <span className="font-semibold tabular-nums">
                      {item.dataKey === "total_revenue"
                        ? formatCurrency(Number(value))
                        : t("analysis.teacherRevenue.studentsCount", {
                            count: Number(value),
                          })}
                    </span>
                  </div>
                )}
              />
            }
          />
        </PieChart>
      </ChartContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-lg font-bold tabular-nums">
          {formatCurrency(total)}
        </p>
        <p className="text-[11px] text-muted-foreground">
          {t("analysis.teacherRevenue.totalCollected")}
        </p>
      </div>
    </div>
  );
};

export default AnalysisTeacherRevenueChart;
