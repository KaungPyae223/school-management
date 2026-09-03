import { useAppQuery } from "../../../../hooks/use-app-query";
import { courseService } from "../../../../services/courses";

export const useGetCourseDetails = (id: number) => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["courses-details", Number(id)],
    queryFn: () => courseService.getCourseDetails(Number(id)),
  }) as { data: any; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
