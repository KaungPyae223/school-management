import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/auth";

export const useTwoFactorDisable = () => {
  return useMutation({
    mutationFn: authService.disable2FA,
  });
};
