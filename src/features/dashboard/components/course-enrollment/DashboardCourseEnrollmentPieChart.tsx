import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { Cell, Pie, PieChart } from "recharts";

const DashboardCourseEnrollmentPieChart = ({ data }: { data: any }) => {
  const chartConfig = {
    total_enrollments: { label: "Enrollments" },
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
              formatter={(val, name) => `${val} Enrolled (${name})`}
            />
          }
        />
      </PieChart>
    </ChartContainer>
  );
};

export default DashboardCourseEnrollmentPieChart;
