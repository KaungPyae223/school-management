import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { teacherService } from "../../../../services/teachers";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetTeacherClasses = (id: number) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["teacher_classes", id, activeQueryParams],
    queryFn: () =>
      teacherService.getTeacherClasses({
        ...activeQueryParams,
        id,
      }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
