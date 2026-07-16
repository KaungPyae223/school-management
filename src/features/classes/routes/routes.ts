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
    path: "classes/details/:classId",
    lazy: async () => {
      const module = await import("../pages/ClassesDetailsPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getClassDetails(Number(params.classId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
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
  {
    path: "classes/edit/:classId",
    lazy: async () => {
      const module = await import("../pages/ClassesEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getClassDetails(Number(params.classId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
