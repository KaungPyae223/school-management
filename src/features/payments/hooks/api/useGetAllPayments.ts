import { useAppQuery } from "../../../../hooks/use-app-query";
import { paymentService } from "../../../../services/payments";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";

export const useGetAllPayments = (params: any) => {
  const { activeQueryParams } = useGetQueryParams();
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["payments", { ...activeQueryParams, ...params }],
    queryFn: () =>
      paymentService.getAllPayments({ ...activeQueryParams, ...params }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
