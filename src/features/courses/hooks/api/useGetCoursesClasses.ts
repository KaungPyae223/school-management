import { classService } from "../../../../services/classes";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { useAppQuery } from "../../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetCoursesClasses = (courseId: number) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["courses_classes", courseId, activeQueryParams],
    queryFn: () =>
      classService.getAllClasses({
        ...activeQueryParams,
        courseId,
      }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
