import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../../../services/classes";

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classesService.createClass,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["classes"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers_classes"] }),
        queryClient.invalidateQueries({ queryKey: ["courses_classes"] }),
      ]);
    },
  });
};
