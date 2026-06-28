import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "timetable",
    lazy: async () => {
      const module = await import("../pages/TimeTablePage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
