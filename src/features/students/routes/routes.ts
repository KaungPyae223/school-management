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
  {
    path: "students/create",
    lazy: async () => {
      const module = await import("../pages/StudentsCreatePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "students/edit/:studentId",
    lazy: async () => {
      const module = await import("../pages/StudentsEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getStudent(Number(params.studentId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "students/details/:studentId",
    lazy: async () => {
      const module = await import("../pages/StudentsDetailsPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getStudent(Number(params.studentId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
