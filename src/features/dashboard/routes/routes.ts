import ErrorPage from "../../../components/errors/ErrorPage";
import { dashboardService } from "../../../services/dashboard";

const routes = [
  {
    index: true,
    lazy: async () => {
      const module = await import("../pages/DashboardPage");
      return { Component: module.default };
    },
    loader: async () => {
      const [
        kpi,
        revenueEnrollment,
        courseEnrollment,
        todayClasses,
        totalPendingAmount,
      ] = await Promise.all([
        dashboardService.getKPI(),
        dashboardService.getRevenueEnrollment(),
        dashboardService.getCoursesEnrollments(),
        dashboardService.getTodayClasses(),
        dashboardService.getTotalPendingAmount(),
      ]);

      return {
        kpi,
        revenueEnrollment,
        courseEnrollment,
        todayClasses,
        totalPendingAmount,
      };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
