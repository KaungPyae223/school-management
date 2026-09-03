import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { enrollmentService } from "../../../../services/enrollment";
import type { ResponseDataType } from "../../../../types/ResponseTypes";

export const useGetClassEnrolledStudents = (classId: number) => {
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading, error } = useAppQuery({
    queryKey: ["classes_enrollments", classId, activeQueryParams],
    queryFn: () =>
      enrollmentService.getEnrollmentByClass({
        ...activeQueryParams,
        classId,
      }),
  }) as { data: ResponseDataType; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
