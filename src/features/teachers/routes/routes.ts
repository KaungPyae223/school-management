import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "teachers",
    lazy: async () => {
      const module = await import("../pages/TeacherPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/create",
    lazy: async () => {
      const module = await import("../pages/TeacherCreatePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/edit/:id",
    lazy: async () => {
      const module = await import("../pages/TeacherEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const teacher = await window.api.getTeacher(Number(params.id));

      if (teacher.error) {
        throw new Error(teacher.error);
      }

      return teacher.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
