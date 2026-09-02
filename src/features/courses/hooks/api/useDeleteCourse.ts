import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../../services/courses";

export const useDeleteCourse = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.deleteCourse,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["courses-details", id] }),
      ]);
    },
  });
};
