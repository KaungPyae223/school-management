import { useMutation } from "@tanstack/react-query";
import { backupService } from "../../../../services/backup";

export const useExportBackup = () => {
  return useMutation({
    mutationFn: backupService.exportBackup,
  });
};
