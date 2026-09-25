import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import ScheduleUtilizationCard from "../components/schedule/ScheduleUtilizationCard";
import DemographicsCard from "../components/demographics/DemographicsCard";
import EnrollmentWithdrawalCard from "../components/retention/EnrollmentWithdrawalCard";
import TopClassesCard from "../components/top-classes/TopClassesCard";
import TeacherRevenueCard from "../components/teacher-revenue/TeacherRevenueCard";
import TeacherWorkloadCard from "../components/workload/TeacherWorkloadCard";
import AnalysisFooter from "../components/general/AnalysisFooter";
import {
  ageDistribution,
  genderSplit,
  monthlyTrend,
  teacherRevenue,
  teacherWorkload,
  topClasses,
  weekdayUsage,
} from "../data/analysis-dummy";
import AnalysisHeader from "../components/general/AnalysisHeader";

const AnalysisPage = () => {
  useAddBreadcrumb({ title: "Analysis" });

  return (
    <div className="flex flex-col space-y-7">
      <AnalysisHeader />

      {/* Schedule utilization + demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScheduleUtilizationCard data={weekdayUsage} />
        <DemographicsCard
          genderSplit={genderSplit}
          ageDistribution={ageDistribution}
        />
      </div>

      {/* Retention + top classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnrollmentWithdrawalCard data={monthlyTrend} />
        <TopClassesCard data={topClasses} />
      </div>

      {/* Teacher revenue contribution + teacher workload */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TeacherRevenueCard data={teacherRevenue} />
        <TeacherWorkloadCard data={teacherWorkload} />
      </div>

      <AnalysisFooter />
    </div>
  );
};

export default AnalysisPage;
