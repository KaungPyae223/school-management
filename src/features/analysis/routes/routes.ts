import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "analysis",
    lazy: async () => {
      const module = await import("../pages/AnalysisPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
