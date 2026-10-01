import { Cell, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";

const AnalysisDemographicsGenderChart = ({ genderSplit }: any) => {
  const { t } = useTranslation();

  const genderConfig: ChartConfig = {
    value: {
      label: t("analysis.demographics.students"),
    },
    Male: { label: t("analysis.demographics.male"), color: "#2563eb" },
    Female: { label: t("analysis.demographics.female"), color: "#ec4899" },
    Unknown: { label: t("analysis.demographics.unknown"), color: "#6a7282" },
  };

  const genderCounts = genderSplit.reduce(
    (acc, item) => {
      acc[item.gender] = item._count.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  const total = genderSplit.reduce((pv, cv) => cv._count.id + pv, 0);

  const male = genderCounts.MALE ?? 0;
  const female = genderCounts.FEMALE ?? 0;

  const genderData = [
    {
      name: "Male",
      label: t("analysis.demographics.male"),
      value: male,
      fill: "#2563eb",
    },
    {
      name: "Female",
      label: t("analysis.demographics.female"),
      value: female,
      fill: "#ec4899",
    },
    {
      name: "Unknown",
      label: t("analysis.demographics.unknown"),
      value: total - male - female,
      fill: "#6a7282",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      <ChartContainer config={genderConfig} className="h-40 w-36 shrink-0">
        <PieChart>
          <Pie
            data={genderData}
            dataKey="value"
            nameKey="label"
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
                formatter={(value, name) => (
                  <span className=" tabular-nums flex items-center gap-1">
                    {name}
                    <span className="font-semibold">
                      {replaceLocalDigit(Number(value))} (
                      {replaceLocalDigit(
                        ((Number(value) / total) * 100).toFixed(0),
                      )}
                      %)
                    </span>
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
          <span className="text-muted-foreground">
            {t("analysis.demographics.male")}
          </span>
          <span className="font-semibold tabular-nums">
            {" "}
            {replaceLocalDigit(male)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-pink-500" />
          <span className="text-muted-foreground">
            {t("analysis.demographics.female")}
          </span>
          <span className="font-semibold tabular-nums">
            {" "}
            {replaceLocalDigit(female)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-500" />
          <span className="text-muted-foreground">
            {t("analysis.demographics.unknown")}
          </span>
          <span className="font-semibold tabular-nums">
            {replaceLocalDigit(total - male - female)}
          </span>
        </div>
        <div className="text-muted-foreground">
          {t("analysis.demographics.total")}{" "}
          <span className="font-semibold tabular-nums">
            {" "}
            {replaceLocalDigit(total)}
          </span>{" "}
          {t("analysis.demographics.students")}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDemographicsGenderChart;
