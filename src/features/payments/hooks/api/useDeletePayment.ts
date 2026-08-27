import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../../../services/payment";

export const useDeletePayment = (classId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.deletePayment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["payments"] }),
        queryClient.invalidateQueries({
          queryKey: ["classes", "remaining-amount", classId],
        }),
      ]);
    },
  });
};
