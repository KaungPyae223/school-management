import { Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import type { AgeBucket } from "../../data/analysis-dummy";

const genderConfig: ChartConfig = {
  male: { label: "Male", color: "#2563eb" },
  female: { label: "Female", color: "#ec4899" },
};

const ageConfig: ChartConfig = {
  count: { label: "Students", color: "#8b5cf6" },
};

const DemographicsCard = ({
  genderSplit,
  ageDistribution,
}: {
  genderSplit: { male: number; female: number };
  ageDistribution: AgeBucket[];
}) => {
  const total = genderSplit.male + genderSplit.female;

  const genderData = [
    { name: "male", value: genderSplit.male, fill: "#2563eb" },
    { name: "female", value: genderSplit.female, fill: "#ec4899" },
  ];

  return (
    <DashboardCard
      title="Student Demographics"
      description="Gender and age distribution"
    >
      <CardContent className="p-0 flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <ChartContainer config={genderConfig} className="h-36 w-36 shrink-0">
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={56}
                paddingAngle={3}
              >
                {genderData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <span className="font-semibold tabular-nums">
                        {Number(value)} (
                        {((Number(value) / total) * 100).toFixed(0)}%)
                      </span>
                    )}
                  />
                }
              />
            </PieChart>
          </ChartContainer>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-muted-foreground">Male</span>
              <span className="font-semibold tabular-nums">
                {genderSplit.male}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-muted-foreground">Female</span>
              <span className="font-semibold tabular-nums">
                {genderSplit.female}
              </span>
            </div>
            <div className="text-muted-foreground">
              Total <span className="font-semibold tabular-nums">{total}</span>{" "}
              students
            </div>
          </div>
        </div>

        <ChartContainer config={ageConfig} className="h-36 w-full">
          <BarChart data={ageDistribution}>
            <XAxis
              dataKey="range"
              tickLine={false}
              axisLine={false}
              fontSize={11}
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-semibold tabular-nums">
                      {Number(value)} Students
                    </span>
                  )}
                />
              }
            />
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
              barSize={26}
              opacity={0.85}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </DashboardCard>
  );
};

export default DemographicsCard;
