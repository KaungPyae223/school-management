import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import DashboardHeader from "../components/general/DashboardHeader";
import DashboardKPIContainer from "../components/kpi/DashboardKPIContainer";
import LoadingPage from "../../../components/loading/LoadingPage";
import DashboardRevenueEnrollmentContainer from "../components/revenue-enrollment/DashboardRevenueEnrollmentContainer";
import DashboardCourseEnrollmentContainer from "../components/course-enrollment/DashboardCourseEnrollmentContainer";
import DashboardTodayClassesContainer from "../components/today-classes/DashboardTodayClassesContainer";
import DashboardRecentEnrollmentContainer from "../components/recent-enrollment/DashboardRecentEnrollmentContainer";
import DashboardRecentPaymentContainer from "../components/recent-payment/DashboardRecentPaymentContainer";
import DashboardOutstandingPaymentContainer from "../components/outstanding-payment/DashboardOutstandingPaymentContainer";
import DashboardFooter from "../components/general/DashboardFooter";
import { useGetKpi } from "../hooks/api/useGetKpi";

const DashboardPage = () => {
  useAddBreadcrumb({
    title: "Dashboard",
  });

  const { data, isLoading, error } = useGetKpi();

  if (isLoading) return <LoadingPage />;

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-col space-y-7">
      <DashboardHeader />

      <DashboardKPIContainer kpi={data?.kpi} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardRevenueEnrollmentContainer data={data?.revenueEnrollment} />
        <DashboardCourseEnrollmentContainer
          data={data?.courseEnrollment}
          totalCourses={data?.kpi?.courses}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardTodayClassesContainer data={data?.todayClasses} />

        <DashboardRecentEnrollmentContainer />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardRecentPaymentContainer />

        <DashboardOutstandingPaymentContainer
          totalPendingAmount={data?.totalPendingAmount}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default DashboardPage;
