import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../../services/courses";

export const useEditCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.updateCourse,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["courses-details"] }),
      ]);
    },
  });
};
