import { useAppQuery } from "../../../../hooks/use-app-query";
import { studentService } from "../../../../services/students";

export const useGetStudentDetails = (id: number) => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["student-details", Number(id)],
    queryFn: () => studentService.getStudentDetails(Number(id)),
  }) as { data: any; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
