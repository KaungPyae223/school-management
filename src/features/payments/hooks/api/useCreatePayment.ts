import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../../../services/payments";

export const useCreatePayment = (classId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.createPayment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes", classId] }),

        queryClient.invalidateQueries({
          queryKey: ["enrollments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments-by-enrollment"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes_enrollments", classId],
        }),
        queryClient.invalidateQueries({ queryKey: ["students_enrollments"] }),
        queryClient.invalidateQueries({ queryKey: ["getRecentPayment"] }),
      ]);
    },
  });
};
