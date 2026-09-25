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
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import type { WeekdayUsage } from "../../data/analysis-dummy";

const chartConfig: ChartConfig = {
  students: { label: "Enrolled Students", color: "#2563eb" },
  classes: { label: "Classes Scheduled", color: "#f59e0b" },
};

const ScheduleUtilizationCard = ({ data }: { data: WeekdayUsage[] }) => {
  const peak = data.reduce(
    (a, b) => (b.students > a.students ? b : a),
    data[0],
  );
  const totalSlots = data.reduce((acc, d) => acc + d.classes, 0);

  return (
    <DashboardCard
      className="lg:col-span-2"
      title="Schedule Utilization"
      description="Enrolled students and scheduled classes per weekday"
    >
      <CardContent className="p-0 flex-1">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.3}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />

            <YAxis
              yAxisId="students"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />

            <YAxis
              yAxisId="classes"
              orientation="right"
              domain={[0, 10]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex min-w-40 justify-between gap-4">
                      <span className="text-muted-foreground">
                        {name === "students" ? "Enrolled Students" : "Classes"}
                      </span>
                      <span className="font-semibold text-foreground tabular-nums">
                        {Number(value)}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              yAxisId="students"
              dataKey="students"
              name="students"
              fill="var(--color-students)"
              radius={[4, 4, 0, 0]}
              barSize={28}
              opacity={0.85}
            />

            <Line
              yAxisId="classes"
              type="monotone"
              dataKey="classes"
              name="classes"
              stroke="var(--color-classes)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>

      <div className="mx-4 mt-1 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs">
        <span className="text-muted-foreground">
          Busiest day: {peak?.day} ({peak?.students} students)
        </span>
        <span className="font-semibold tabular-nums">
          {totalSlots} weekly class slots
        </span>
      </div>
    </DashboardCard>
  );
};

export default ScheduleUtilizationCard;
