import ErrorPage from "../../../components/errors/ErrorPage";
import { classService } from "../../../services/classes";

const routes = [
  {
    path: "classes/enroll/:classId",
    lazy: async () => {
      const module = await import("../pages/EnrollPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await classService.getClassDetails(Number(params.classId));

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
