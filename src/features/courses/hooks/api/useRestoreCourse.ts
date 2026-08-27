import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../services/courses";

export const useRestoreCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.restoreCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
