import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enrollmentService } from "../../../../services/enrollment";

export const useEnrollClass = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: enrollmentService.createEnrollment,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes", id] }),

        queryClient.invalidateQueries({
          queryKey: ["enrollments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["classes_enrollments", id],
        }),
        queryClient.invalidateQueries({ queryKey: ["students_enrollments"] }),
      ]);
    },
  });
};
