import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { studentService } from "../../../../services/students";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetAllStudents = () => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["students", activeQueryParams],
    queryFn: () => studentService.getAllStudents(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  const exportCSV = async () => {
    await studentService.exportStudentCSV({
      ...activeQueryParams,
      exportCSV: true,
    });
  };

  if (error) {
    throw error;
  }

  return { data, isLoading, exportCSV };
};
