import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../../services/courses";

export const useEditCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.editCourse,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
