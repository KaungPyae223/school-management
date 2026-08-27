import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../services/teachers";

export const useRestoreTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.restoreTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
