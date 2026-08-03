import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../../../services/classes";

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classesService.deleteClass,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers_classes"] }),
        queryClient.invalidateQueries({ queryKey: ["courses_classes"] }),
      ]);
    },
  });
};
