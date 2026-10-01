import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useTranslation } from "react-i18next";
import AnalysisScheduleUtilizationContainer from "../components/schedule/AnalysisScheduleUtilizationContainer";
import AnalysisDemographicsContainer from "../components/demographics/AnalysisDemographicsContainer";
import AnalysisTopCoursesContainer from "../components/top-courses/AnalysisTopCoursesContainer";
import AnalysisTeacherRevenueContainer from "../components/teacher-revenue/AnalysisTeacherRevenueContainer";
import AnalysisTeacherWorkloadContainer from "../components/workload/AnalysisTeacherWorkloadContainer";
import AnalysisFooter from "../components/general/AnalysisFooter";
import AnalysisHeader from "../components/general/AnalysisHeader";
import { useLoaderData } from "react-router";
import AnalysisEnrollmentWithdrawnContainer from "../components/retention/AnalysisEnrollmentWithdrawnContainer";
import AnalysisTour from "../tour/AnalysisTour";

const AnalysisPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({ title: t("analysis.title") });

  const loader = useLoaderData();

  console.log(loader);

  return (
    <>
      <AnalysisTour />

      <div className="flex flex-col space-y-7">
        <AnalysisHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalysisScheduleUtilizationContainer
            data={loader.scheduleUtilization}
          />
          <AnalysisDemographicsContainer
            genderSplit={loader.ageDemographics.genderCounts}
            ageDistribution={loader.ageDemographics.ageGroupCounts}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalysisEnrollmentWithdrawnContainer
            data={loader.enrollmentRetention}
          />
          <AnalysisTopCoursesContainer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalysisTeacherRevenueContainer data={loader.teacherRevenue} />
          <AnalysisTeacherWorkloadContainer />
        </div>

        <AnalysisFooter />
      </div>
    </>
  );
};

export default AnalysisPage;
