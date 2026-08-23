import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../../../services/courses";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });   
    },
  });
};
