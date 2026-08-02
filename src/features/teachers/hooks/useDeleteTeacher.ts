import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../../../services/teachers";

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: teacherService.deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
