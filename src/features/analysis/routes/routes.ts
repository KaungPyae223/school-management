import ErrorPage from "../../../components/errors/ErrorPage";
import { analysisService } from "../../../services/analysis";

const routes = [
  {
    path: "analysis",
    lazy: async () => {
      const module = await import("../pages/AnalysisPage");
      return { Component: module.default };
    },
    loader: async () => {
      const [
        scheduleUtilization,
        ageDemographics,
        enrollmentRetention,
        teacherRevenue,
      ] = await Promise.all([
        analysisService.scheduleUtilization(),
        analysisService.ageDemographics(),
        analysisService.enrollmentRetention(),
        analysisService.teacherRevenue(),
      ]);

      return {
        scheduleUtilization,
        ageDemographics,
        enrollmentRetention,
        teacherRevenue,
      };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
