import ErrorPage from "../../../components/errors/ErrorPage";
import { authService } from "../../../services/auth";

const routes = [
  {
    path: "/login",
    lazy: async () => {
      const module = await import("../pages/LoginPage");
      return { Component: module.default };
    },
    loader: async () => {
      const is2FAEnabled = await authService.is2FAEnabled();
      const resetCount = await authService.resetPasswordCount();
      return { is2FAEnabled, resetCount };
    },
    ErrorBoundary: ErrorPage,
  },
  {
    path: "/forget-password",
    lazy: async () => {
      const module = await import("../pages/ForgePasswordPage");
      return { Component: module.default };
    },
    loader: async () => {
      const is2FAEnabled = await authService.is2FAEnabled();
      const is2FAVerified = await authService.is2FAVerified();
      const resetCount = await authService.resetPasswordCount();
      return { is2FAEnabled, is2FAVerified, resetCount };
    },
    ErrorBoundary: ErrorPage,
  },
];

export default routes;
