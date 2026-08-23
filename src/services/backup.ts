import { checkAuthorization } from "./check-authorization";

export const backupService = {
  exportBackup: async (password: string) => {
    const data = await window.backupAPI.exportBackup(password);

    if (!data.success) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }
  },

  importBackup: async (payload: { filePath: string; password: string }) => {
    const data = await window.backupAPI.importBackup(payload);

    if (!data.success) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }
  },
};
