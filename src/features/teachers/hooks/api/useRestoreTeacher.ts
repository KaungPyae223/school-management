import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../../services/teachers";

export const useRestoreTeacher = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.restoreTeacher,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["teachers"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers-details", id] }),
      ]);
    },
  });
};
