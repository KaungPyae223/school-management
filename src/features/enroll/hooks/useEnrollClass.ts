import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentService } from "../../../services/enrollment";

export const useEnrollClass = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentService.createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["enrollments", id],
        exact: false,
      });
    },
  });
};
