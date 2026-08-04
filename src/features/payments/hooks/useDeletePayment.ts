import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../../services/payments";

export const useDeletePayment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.deletePayment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({
          queryKey: ["enrollments", id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes_enrollments", id],
        }),
        queryClient.invalidateQueries({ queryKey: ["students_enrollments"] }),
      ]);
    },
  });
};
