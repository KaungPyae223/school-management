import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../services/teachers";

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
