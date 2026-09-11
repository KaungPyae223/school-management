import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatCurrency } from "../../../../utils/format-currency";

const chartConfig: ChartConfig = {
  revenue: {
    label: "Tuition Revenue",
    color: "#2563eb",
  },
  enrollments: {
    label: "New Enrollments",
    color: "#10b981",
  },
};

interface ChartData {
  month: string;
  revenue: number;
  enrollments: number;
}

const DashboardRevenueEnrollmentChart = ({ data }: { data: ChartData[] }) => {
  return (
    <div className="flex flex-1 items-center justify-center w-full">
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <AreaChart data={data}>
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
                      {name === "revenue" ? "Revenue" : "Enrollments"}
                    </span>

                    <span className="font-semibold text-foreground">
                      {name === "revenue"
                        ? `${formatCurrency(Number(value))}`
                        : `${Number(value)} Students`}
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
    </div>
  );
};

export default DashboardRevenueEnrollmentChart;
