import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const AnalysisDemographicsAgeChart = ({ ageDistribution }: any) => {
  const { t } = useTranslation();

  const ageConfig: ChartConfig = {
    count: { label: t("analysis.demographics.students"), color: "#8b5cf6" },
  };

  const formattedAgeDistribution = ageDistribution.map((bucket) => ({
    ...bucket,
    count: Number(bucket.total),
  }));

  return (
    <ChartContainer config={ageConfig} className="h-40 w-full mt-auto">
      <BarChart data={formattedAgeDistribution}>
        <XAxis
          dataKey="age_group"
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
                  {t("analysis.demographics.studentsCount", {
                    count: replaceLocalDigit(Number(value)),
                  })}
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
  );
};

export default AnalysisDemographicsAgeChart;
