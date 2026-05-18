import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "courses",
    lazy: async () => {
      const module = await import("../pages/CoursesPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "courses/create",
    lazy: async () => {
      const module = await import("../pages/CoursesCreatePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
