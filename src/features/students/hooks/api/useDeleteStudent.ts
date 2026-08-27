import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../../../../services/students";

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.deleteStudent,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
