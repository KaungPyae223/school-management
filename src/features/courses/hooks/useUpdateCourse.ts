import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../services/courses";

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
