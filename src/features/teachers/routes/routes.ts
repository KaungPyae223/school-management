import ErrorPage from "../../../components/errors/ErrorPage";
import { teacherService } from "../../../services/teachers";

const routes = [
  {
    path: "teachers",
    lazy: async () => {
      const module = await import("../pages/TeachersPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/create",
    lazy: async () => {
      const module = await import("../pages/TeachersCreatePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/edit/:teacherId",
    lazy: async () => {
      const module = await import("../pages/TeachersEditPage");
      return { Component: module.default };
    },
    loader: async ({ params }: { params: { teacherId: string } }) => {
      const result = await teacherService.getTeacher(Number(params.teacherId));

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "teachers/details/:teacherId",
    lazy: async () => {
      const module = await import("../pages/TeachersDetailsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
