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
    path: "students/edit/:id",
    lazy: async () => {
      const module = await import("../pages/StudentsEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const student = await window.api.getStudent(Number(params.id));

      if (student.error) {
        throw new Error(student.error);
      }

      return student.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
