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
  {
    path: "courses/detail/:courseId",
    lazy: async () => {
      const module = await import("../pages/CoursesDetailPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getCourseDetail(Number(params.courseId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "courses/edit/:courseId",
    lazy: async () => {
      const module = await import("../pages/CoursesEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getCourse(Number(params.courseId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
