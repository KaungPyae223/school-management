import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classService } from "../../../../services/classes";

export const useCompleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classService.completeClass,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers_classes"] }),
        queryClient.invalidateQueries({ queryKey: ["courses_classes"] }),
      ]);
    },
  });
};
