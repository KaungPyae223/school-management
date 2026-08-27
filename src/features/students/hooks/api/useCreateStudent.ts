import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../../../../services/students";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.createStudent,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
