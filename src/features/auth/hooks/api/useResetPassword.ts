import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../services/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
};
