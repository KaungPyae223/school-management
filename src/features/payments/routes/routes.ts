import ErrorPage from "../../../components/errors/ErrorPage";

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
      const payments = await window.api.getAllPaymentsByEnrollment(
        Number(params.enrollmentId),
      );

      if (payments.error) {
        throw new Error(payments.error);
      }

      const enrollment = await window.api.getEnrollment(
        Number(params.enrollmentId),
      );

      if (enrollment.error) {
        throw new Error(enrollment.error);
      }

      return { payments: payments.data, enrollment: enrollment.data };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
