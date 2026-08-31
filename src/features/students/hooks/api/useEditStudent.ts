import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../../../../services/students";

export const useEditStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateStudent,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
