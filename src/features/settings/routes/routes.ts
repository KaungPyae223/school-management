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
      const module = await import("../pages/SettingsManagePasswordPage");
      return { Component: module.default };
    },
    ErrorBoundary: ErrorPage,
    loader: async () => {
      const hasPassword = await authService.hasPassword();
      const is2FAEnabled = await authService.is2FAEnabled();
      const is2FAVerified = await authService.is2FAVerified();
      return { hasPassword, is2FAEnabled, is2FAVerified };
    },
  },
  {
    path: "settings/manage-2fa",
    lazy: async () => {
      const module = await import("../pages/SettingsManage2FAPage");
      return { Component: module.default };
    },
    loader: async () => {
      const is2FAEnabled = await authService.is2FAEnabled();
      return { is2FAEnabled };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
