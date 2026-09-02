import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../../../../services/students";

export const useEditStudent = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: studentService.updateStudent,
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["students"] }),
        queryClient.invalidateQueries({ queryKey: ["students-details", id] }),
      ]);
    },
  });
};
