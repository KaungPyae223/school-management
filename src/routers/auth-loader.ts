import { redirect } from "react-router";
import { authService } from "../services/auth";
import { setupService } from "../services/setup";

export const authLoader = async () => {
  const completed = await setupService.isComplete();

  if (!completed) {
    throw redirect("/setup");
  }

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return null;
  }

  const hasPassword = await authService.hasPassword();

  if (hasPassword) {
    throw redirect("/login");
  }
};
