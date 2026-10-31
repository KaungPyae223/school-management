import ErrorPage from "../../../components/errors/ErrorPage";
import { studentService } from "../../../services/students";

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
    ErrorBoundary: ErrorPage,
  },
  {
    path: "students/details/:studentId",
    lazy: async () => {
      const module = await import("../pages/StudentsDetailsPage");
      return { Component: module.default };
    },
    loader: async ({ params }: { params: { studentId: string } }) => {
      const result = await studentService.getStudent(Number(params.studentId));

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
