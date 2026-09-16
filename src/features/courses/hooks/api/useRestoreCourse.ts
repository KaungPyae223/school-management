import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../../services/courses";

export const useRestoreCourse = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.restoreCourse,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["courses"] }),
        queryClient.invalidateQueries({ queryKey: ["getAllCourses"] }),
        queryClient.invalidateQueries({ queryKey: ["courses-details", id] }),
      ]);
    },
  });
};
