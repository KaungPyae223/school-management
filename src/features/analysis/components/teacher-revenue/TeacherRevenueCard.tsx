import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import { formatCurrency } from "../../../../utils/format-currency";
import type { TeacherRevenue } from "../../data/analysis-dummy";

const TeacherRevenueCard = ({ data }: { data: TeacherRevenue[] }) => {
  const total = data.reduce((acc, d) => acc + d.revenue, 0);

  const chartConfig = Object.fromEntries(
    data.map((d) => [d.name, { label: d.name, color: d.color }]),
  ) as ChartConfig;

  return (
    <DashboardCard
      className="lg:col-span-2"
      title="Teacher Revenue Contribution"
      description="Share of collected tuition per teacher"
    >
      <CardContent className="p-0 flex-1 grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
        <div className="relative">
          <ChartContainer config={chartConfig} className="mx-auto h-56 w-full">
            <PieChart>
              <Pie
                data={data}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry) => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <span className="font-semibold tabular-nums">
                        {formatCurrency(Number(value))}
                      </span>
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
            <p className="text-[11px] text-muted-foreground">total collected</p>
          </div>
        </div>

        <div className="space-y-1">
          {data.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-sm hover:bg-muted/60"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="truncate text-muted-foreground">
                  {entry.name}
                </span>
              </span>

              <span className="shrink-0 tabular-nums">
                <span className="font-semibold">
                  {formatCurrency(entry.revenue)}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {((entry.revenue / total) * 100).toFixed(0)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </DashboardCard>
  );
};

export default TeacherRevenueCard;
