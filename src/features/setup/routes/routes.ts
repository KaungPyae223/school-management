import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "/setup",
    lazy: async () => {
      const module = await import("../pages/SetupPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
