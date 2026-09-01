import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentService } from "../../../../services/enrollment";

export const useEnrollClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentService.createEnrollment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({ queryKey: ["classes-details"] }),

        queryClient.invalidateQueries({
          queryKey: ["enrollments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes_enrollments"],
        }),
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["students_enrollments"] }),
      ]);
    },
  });
};
