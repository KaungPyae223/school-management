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
    path: "courses/update/:id",
    lazy: async () => {
      const module = await import("../pages/CourseUpdatePage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const course = await window.api.getCourse(Number(params.id));

      if (course.error) {
        throw new Error(course.error);
      }

      return course.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
