import { useAppQuery } from "../../../../hooks/use-app-query";
import { teacherService } from "../../../../services/teachers";

export const useGetTeacherDetails = (id: number) => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["teachers-details", Number(id)],
    queryFn: () => teacherService.getTeacherDetails(Number(id)),
  }) as { data: any; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
