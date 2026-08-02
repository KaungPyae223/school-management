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
    path: "teachers/edit/:teacherId",
    lazy: async () => {
      const module = await import("../pages/TeacherEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getTeacher(Number(params.teacherId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/details/:teacherId",
    lazy: async () => {
      const module = await import("../pages/TeacherDetailsPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getTeacher(Number(params.teacherId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
