import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "help",
    lazy: async () => {
      const module = await import("../pages/HelpPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
