import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../services/auth";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({oldPassword, newPassword}: {oldPassword: string, newPassword: string}) => authService.changePassword(oldPassword, newPassword),
  });
};
