import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../../services/teachers";

export const useEditTeacher = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.updateTeacher,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["teachers"] }),
        queryClient.invalidateQueries({ queryKey: ["getAllTeachers"] }),
        queryClient.invalidateQueries({ queryKey: ["teachers-details", id] }),
      ]);
    },
  });
};
