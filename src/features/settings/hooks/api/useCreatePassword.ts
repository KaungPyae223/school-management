import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../../services/auth";

export const useCreatePassword = () => {
  return useMutation({
    mutationFn: authService.setPassword,
  });
};
