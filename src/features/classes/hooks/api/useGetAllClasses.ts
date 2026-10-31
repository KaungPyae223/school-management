import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { classService } from "../../../../services/classes";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetAllClasses = (params?: any) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["classes", { ...activeQueryParams, ...params }],
    queryFn: () =>
      classService.getAllClasses({ ...activeQueryParams, ...params }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  const exportCSV = async () => {
    await classService.exportClassCSV({
      ...activeQueryParams,
      ...params,
      exportCSV: true,
    });
  };

  if (error) {
    throw error;
  }

  return { data, isLoading, exportCSV };
};
