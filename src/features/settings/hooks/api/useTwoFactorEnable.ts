import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../services/auth";

export const useTwoFactorEnable = () => {
  return useMutation({
    mutationFn: authService.enable2FA,
  });
};
