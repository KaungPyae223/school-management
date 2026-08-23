import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backupService } from "../../../services/backup";

export const useImportBackup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: backupService.importBackup,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
