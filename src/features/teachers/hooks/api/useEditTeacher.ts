import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../../services/teachers";

export const useEditTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.editTeacher,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
