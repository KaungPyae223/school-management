import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import DashboardHeader from "../components/general/DashboardHeader";
import DashboardKPIContainer from "../components/kpi/DashboardKPIContainer";
import DashboardRevenueEnrollmentContainer from "../components/revenue-enrollment/DashboardRevenueEnrollmentContainer";
import DashboardCourseEnrollmentContainer from "../components/course-enrollment/DashboardCourseEnrollmentContainer";
import DashboardTodayClassesContainer from "../components/today-classes/DashboardTodayClassesContainer";
import DashboardRecentEnrollmentContainer from "../components/recent-enrollment/DashboardRecentEnrollmentContainer";
import DashboardRecentPaymentContainer from "../components/recent-payment/DashboardRecentPaymentContainer";
import DashboardOutstandingPaymentContainer from "../components/outstanding-payment/DashboardOutstandingPaymentContainer";
import DashboardFooter from "../components/general/DashboardFooter";

import { useTranslation } from "react-i18next";
import DashboardTour from "../tour/DashboardTourt";
import { useLoaderData } from "react-router";

const DashboardPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("dashboard.title"),
  });

  const kpi = useLoaderData();


  return (
    <>
      <DashboardTour />

      <div className="flex flex-col space-y-7">
        <DashboardHeader />

        <DashboardKPIContainer kpi={kpi?.kpi} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardRevenueEnrollmentContainer data={kpi?.revenueEnrollment} />
          <DashboardCourseEnrollmentContainer
            data={kpi?.courseEnrollment}
            totalCourses={kpi?.kpi?.courses}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardTodayClassesContainer data={kpi?.todayClasses} />

          <DashboardRecentEnrollmentContainer />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardRecentPaymentContainer />

          <DashboardOutstandingPaymentContainer
            totalPendingAmount={kpi?.totalPendingAmount}
          />
        </div>

        <DashboardFooter />
      </div>
    </>
  );
};

export default DashboardPage;
