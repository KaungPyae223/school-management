import { useAppQuery } from "../../../../hooks/use-app-query";
import { paymentService } from "../../../../services/payments";

export const useGetPaymentsByEnrollment = (id: number) => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["payments-by-enrollment", Number(id)],
    queryFn: () => paymentService.getAllPaymentsByEnrollment(Number(id)),
  }) as { data: { data: any[] }; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
