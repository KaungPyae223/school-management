import ErrorPage from "../../../components/errors/ErrorPage";
import { enrollmentService } from "../../../services/enrollment";

const routes = [
  {
    path: "payments",
    lazy: async () => {
      const module = await import("../pages/PaymentsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "payments/:enrollmentId",
    lazy: async () => {
      const module = await import("../pages/PaymentsDetailsPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const enrollment = await enrollmentService.getEnrollment(
        Number(params.enrollmentId),
      );

      return { enrollment: enrollment.data };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
