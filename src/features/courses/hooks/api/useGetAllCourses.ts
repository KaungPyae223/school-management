import { useAppQuery } from "../../../../hooks/use-app-query";
import { courseService } from "../../../../services/courses";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";

export const useGetAllCourses = () => {
  const { activeQueryParams } = useGetQueryParams();
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["courses", activeQueryParams],
    queryFn: () => courseService.getAllCourses(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  const exportCSV = async () => {
    await courseService.exportCourseCSV({
      ...activeQueryParams,
      exportCSV: true,
    });
  };

  if (error) {
    throw error;
  }

  return { data, isLoading, exportCSV };
};
