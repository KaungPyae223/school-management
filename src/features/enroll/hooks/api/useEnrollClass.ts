import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentService } from "../../../../services/enrollment";

export const useEnrollClass = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentService.enrollStudent,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes", id] }),
        queryClient.invalidateQueries({
          queryKey: ["classes", "students", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes", "remaining-amount", id],
        }),
      ]);
    },
  });
};
