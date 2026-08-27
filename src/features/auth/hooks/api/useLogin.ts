import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../services/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.verifyPassword,
  });
};
