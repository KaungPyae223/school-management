import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "/login",
    lazy: async () => {
      const module = await import("../pages/LoginPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
