import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "payments",
    lazy: async () => {
      const module = await import("../pages/PaymentsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
