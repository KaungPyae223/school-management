import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../../../utils/format-currency";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const DashboardRevenueEnrollmentChart = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const chartConfig: ChartConfig = {
    revenue: {
      label: t("dashboard.revenueEnrollment.tuitionRevenue"),
      color: "#2563eb",
    },
    enrollments: {
      label: t("dashboard.revenueEnrollment.newEnrollments"),
      color: "#10b981",
    },
  };

  const formattedData = data.map((item) => ({
    ...item,
    revenue: Number(item.total_revenue || 0),
    enrollments: Number(item.total_enrollments || 0),
  }));
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <AreaChart data={formattedData}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tickFormatter={(month) =>
            t(`general.months.${month}`, { defaultValue: month })
          }
        />

        {/* Revenue axis */}
        <YAxis
          yAxisId="revenue"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          tickFormatter={(value) =>
            `${(Number(value) / 1_000_000).toFixed(1)}M`
          }
        />

        <YAxis
          yAxisId="enrollments"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          tickFormatter={(value) => `${value}`}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex min-w-40 justify-between gap-4">
                  <span className="text-muted-foreground">
                    {name === "revenue"
                      ? t("dashboard.revenueEnrollment.revenue")
                      : t("dashboard.revenueEnrollment.enrollments")}
                  </span>

                  <span className="font-semibold text-foreground">
                    {name === "revenue"
                      ? formatCurrency(Number(value))
                      : t("dashboard.revenueEnrollment.studentsCount", {
                          count: replaceLocalDigit(Number(value)),
                        })}
                  </span>
                </div>
              )}
            />
          }
        />

        <Area
          yAxisId="revenue"
          type="monotone"
          dataKey="revenue"
          name="revenue"
          stroke="#2563eb"
          strokeWidth={2.5}
          fill="url(#revenueGrad)"
          fillOpacity={1}
        />

        <Area
          yAxisId="enrollments"
          type="monotone"
          dataKey="enrollments"
          name="enrollments"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#enrollmentGrad)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default DashboardRevenueEnrollmentChart;
