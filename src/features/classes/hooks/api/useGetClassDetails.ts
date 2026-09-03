import { useAppQuery } from "../../../../hooks/use-app-query";
import { classService } from "../../../../services/classes";

export const useGetClassDetails = (id: number) => {
  const { data, isLoading, error } = useAppQuery({
    queryKey: ["classes-details", Number(id)],
    queryFn: () => classService.getClassDetails(Number(id)),
  }) as { data: any; isLoading: boolean; error: any };

  if (error) {
    throw error;
  }

  return { data, isLoading };
};
