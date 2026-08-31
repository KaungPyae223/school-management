import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../../../services/payments";

export const useDeletePayment = (classId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.deletePayment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes", classId] }),

        queryClient.invalidateQueries({
          queryKey: ["enrollments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes_enrollments", classId],
        }),
        queryClient.invalidateQueries({ queryKey: ["students_enrollments"] }),
      ]);
    },
  });
};
