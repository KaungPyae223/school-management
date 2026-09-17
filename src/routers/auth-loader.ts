import { redirect } from "react-router";
import { authService } from "../services/auth";

export const authLoader = async () => {
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return null;
  }

  const hasPassword = await authService.hasPassword();

  if (hasPassword) {
    throw redirect("/login");
  }
};
