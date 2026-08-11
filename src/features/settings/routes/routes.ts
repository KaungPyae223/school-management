import ErrorPage from "../../../components/errors/ErrorPage";
import { authService } from "../../../services/auth";

const routes = [
  {
    path: "settings",
    lazy: async () => {
      const module = await import("../pages/SettingsPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "settings/manage-password",
    lazy: async () => {
      const module = await import("../pages/SettingsManagePassword");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
    loader: async () => {
      const hasPassword = await authService.hasPassword();
      return { hasPassword };
    },
  },
];

export default routes;
