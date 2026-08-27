import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/auth";

export const useTwoFactorVerifiy = () => {
  return useMutation({
    mutationFn: authService.verify2FA,
  });
};
