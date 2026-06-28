import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "classes",
    lazy: async () => {
      const module = await import("../pages/ClassesPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "classes/create",
    lazy: async () => {
      const module = await import("../pages/ClassesCreatePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
