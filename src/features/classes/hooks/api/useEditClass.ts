import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "../../../../services/classes";

export const useEditClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classService.updateClass,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({ queryKey: ["classes-details"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers_classes"] }),
        queryClient.invalidateQueries({ queryKey: ["courses_classes"] }),
      ]);
    },
  });
};
