import ErrorPage from "../../../components/errors/ErrorPage";

const routes = [
  {
    path: "settings",
    lazy: async () => {
      const module = await import("../pages/SettingsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
