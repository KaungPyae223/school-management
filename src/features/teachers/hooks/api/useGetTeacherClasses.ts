import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { teacherService } from "../../../../services/teachers";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetTeacherClasses = (teacherId: number) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["teacher_classes", teacherId, activeQueryParams],
    queryFn: () =>
      teacherService.getTeacherClasses({
        ...activeQueryParams,
        teacherId,
      }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};