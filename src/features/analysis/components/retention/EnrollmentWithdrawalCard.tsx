import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
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
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import type { MonthlyTrend } from "../../data/analysis-dummy";

const chartConfig: ChartConfig = {
  enrollments: { label: "New Enrollments", color: "#10b981" },
  withdrawn: { label: "Withdrawals", color: "#ef4444" },
};

const EnrollmentWithdrawalCard = ({ data }: { data: MonthlyTrend[] }) => {
  // Withdrawals plotted negative so the two flows read against a zero baseline
  const chartData = data.map((item) => ({
    month: item.month,
    enrollments: item.enrollments,
    withdrawn: -item.withdrawn,
  }));

  const totalNew = data.reduce((acc, item) => acc + item.enrollments, 0);
  const totalWithdrawn = data.reduce((acc, item) => acc + item.withdrawn, 0);
  const retention = totalNew > 0 ? (1 - totalWithdrawn / totalNew) * 100 : 0;

  return (
    <DashboardCard
      className="lg:col-span-2"
      title="Enrollment Retention"
      description="New enrollments vs withdrawals per month"
    >
      <CardContent className="p-0 flex-1">
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <BarChart data={chartData} barGap={2}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
              tickFormatter={(value) => `${Math.abs(Number(value))}`}
            />

            <ReferenceLine y={0} stroke="currentColor" opacity={0.4} />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex min-w-32 justify-between gap-4">
                      <span className="text-muted-foreground">
                        {name === "withdrawn" ? "Withdrawals" : "Enrollments"}
                      </span>
                      <span className="font-semibold text-foreground tabular-nums">
                        {Math.abs(Number(value))} Students
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
              radius={[0, 0, 4, 4]}
              barSize={12}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <div className="mx-4 mt-1 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs">
        <span className="text-muted-foreground">
          Retention rate ({totalNew} in / {totalWithdrawn} out)
        </span>
        <span className="font-semibold tabular-nums">
          {retention.toFixed(1)}%
        </span>
      </div>
    </DashboardCard>
  );
};

export default EnrollmentWithdrawalCard;
