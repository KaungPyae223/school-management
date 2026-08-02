import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../../../services/classes";

export const useEditClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classesService.updateClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({ queryKey: ["teachers_classes"] });
    },
  });
};
