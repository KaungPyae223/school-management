import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "classes/enroll/:classId",
    lazy: async () => {
      const module = await import("../pages/EnrollPage");
      return { Component: module.default };
    },
    loader: async ({ params }) => {
      const result = await window.api.getClassDetails(Number(params.classId));

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
