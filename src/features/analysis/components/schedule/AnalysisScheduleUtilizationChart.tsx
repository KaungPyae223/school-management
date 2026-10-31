import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const AnalysisScheduleUtilizationChart = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  const chartConfig: ChartConfig = {
    total_enrollment_count: {
      label: t("analysis.schedule.enrolledStudents"),
      color: "#2563eb",
    },
    class_count: {
      label: t("analysis.schedule.classesScheduled"),
      color: "#f59e0b",
    },
  };

  const formattedData = (data || []).map((d: any) => ({
    ...d,
    total_enrollment_count: Number(d.total_enrollment_count || 0),
    class_count: Number(d.class_count || 0),
  }));

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <ComposedChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />

        <XAxis
          dataKey="day_name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tickFormatter={(day) => t(`general.days.${day}`)}
        />

        <YAxis
          yAxisId="total_enrollment_count"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          allowDecimals={false}
        />

        <YAxis
          yAxisId="class_count"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          allowDecimals={false}
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex min-w-40 justify-between gap-4">
                  <span className="text-muted-foreground">
                    {name === "total_enrollment_count"
                      ? t("analysis.schedule.enrolledStudents")
                      : t("analysis.schedule.classes")}
                  </span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {replaceLocalDigit(Number(value))}
                  </span>
                </div>
              )}
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Bar
          yAxisId="total_enrollment_count"
          dataKey="total_enrollment_count"
          name="total_enrollment_count"
          fill="var(--color-total_enrollment_count)"
          radius={[4, 4, 0, 0]}
          barSize={28}
          opacity={0.85}
        />

        <Line
          yAxisId="class_count"
          type="monotone"
          dataKey="class_count"
          name="class_count"
          stroke="var(--color-class_count)"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
};

export default AnalysisScheduleUtilizationChart;
