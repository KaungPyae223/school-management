import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classesService } from "../../../services/classes";

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classesService.createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
