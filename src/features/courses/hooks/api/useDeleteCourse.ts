import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../../services/courses";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.deleteCourse,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
