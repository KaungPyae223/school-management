import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetService } from "../../../../services/reset";

export const useResetData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password?: string) => resetService.reset(password),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
