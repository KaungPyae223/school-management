import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { useTranslation } from "react-i18next";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const AnalysisEnrollmentWithdrawnChart = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const chartConfig: ChartConfig = {
    enrollments: {
      label: t("analysis.retention.newEnrollments"),
      color: "#10b981",
    },
    withdrawn: { label: t("analysis.retention.withdrawals"), color: "#ef4444" },
  };

  const chartData = data.map((item) => ({
    month: item.month,
    enrollments: Number(item.total_enrollments),
    withdrawn: Number(item.total_withdrawns),
  }));

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full ">
      <BarChart data={chartData} barGap={2}>
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

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          tickFormatter={(value) => `${Math.abs(Number(value))}`}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex min-w-40 justify-between gap-4">
                  <span className="text-muted-foreground">
                    {name === "withdrawn"
                      ? t("analysis.retention.withdrawals")
                      : t("analysis.retention.enrollments")}
                  </span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {t("analysis.retention.studentsCount", {
                      count: replaceLocalDigit(Math.abs(Number(value))),
                    })}
                  </span>
                </div>
              )}
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          dataKey="enrollments"
          name="enrollments"
          fill="var(--color-enrollments)"
          radius={[4, 4, 0, 0]}
          barSize={12}
        />

        <Bar
          dataKey="withdrawn"
          name="withdrawn"
          fill="var(--color-withdrawn)"
          radius={[4, 4, 0, 0]}
          barSize={12}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default AnalysisEnrollmentWithdrawnChart;
