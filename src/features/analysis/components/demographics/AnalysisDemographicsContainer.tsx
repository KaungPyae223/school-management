import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import DataShow from "../../../../components/data/DataShow";
import { GraduationCap, Users } from "lucide-react";
import AnalysisDemographicsGenderChart from "./AnalysisDemographicsGenderChart";
import DashboardCourseEnrollmentChart from "./AnalysisDemographicsAgeChart";
import { useTranslation } from "react-i18next";

const AnalysisDemographicsContainer = ({
  genderSplit,
  ageDistribution,
}: {
  genderSplit: any[];
  ageDistribution: any[];
}) => {
  const { t } = useTranslation();

  return (
    <DashboardCard
      title={t("analysis.demographics.title")}
      description={t("analysis.demographics.description")}
      icon={Users}
      dataTour="demographics"
    >
      <DataShow
        isLoading={false}
        dataLength={genderSplit.length}
        emptyTitle={t("analysis.demographics.emptyTitle")}
        emptyDescription={t("analysis.demographics.emptyDescription")}
        emptyIcon={GraduationCap}
        className="border-0 shadow-none ring-0"
        action={{
          label: t("analysis.demographics.createStudents"),
          link: "/students/create",
        }}
      >
        <CardContent className="p-0 flex-1 flex flex-col space-y-2">
          <AnalysisDemographicsGenderChart genderSplit={genderSplit} />
          <DashboardCourseEnrollmentChart ageDistribution={ageDistribution} />
        </CardContent>
      </DataShow>
    </DashboardCard>
  );
};

export default AnalysisDemographicsContainer;
