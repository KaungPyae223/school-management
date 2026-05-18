import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    index: true,
    lazy: async () => {
      const module = await import("../pages/DashboardPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
