import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../../../services/payment";

export const useCreatePayment = (classId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentService.createPayment,
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
