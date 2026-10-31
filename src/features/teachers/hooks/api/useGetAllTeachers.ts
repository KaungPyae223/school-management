import { useAppQuery } from "../../../../hooks/use-app-query";
import { teacherService } from "../../../../services/teachers";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";

export const useGetAllTeachers = () => {
  const { activeQueryParams } = useGetQueryParams();
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["teachers", activeQueryParams],
    queryFn: () => teacherService.getAllTeachers(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  const exportCSV = async () => {
    await teacherService.exportTeacherCSV({
      ...activeQueryParams,
      exportCSV: true,
    });
  };

  if (error) {
    throw error;
  }

  return { data, isLoading, exportCSV };
};
