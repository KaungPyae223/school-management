import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { useAppQuery } from "../../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import { courseService } from "../../../../services/courses";

export const useGetCoursesClasses = (courseId: number) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["courses_classes", courseId, activeQueryParams],
    queryFn: () =>
      courseService.getCourseClasses({
        ...activeQueryParams,
        courseId,
      }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
