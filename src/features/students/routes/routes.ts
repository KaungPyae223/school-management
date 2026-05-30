import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "students",
    lazy: async () => {
      const module = await import("../pages/StudentsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
