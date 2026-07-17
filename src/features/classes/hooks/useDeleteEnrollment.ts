import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentService } from "../../../services/enrollment";

export const useDeleteEnrollment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentService.deleteEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", id] });
    },
  });
};
