export const authService = {
  isAuthenticated: async () => {
    return await window.authAPI.isAuthenticated();
  },
  hasPassword: async () => {
    return await window.authAPI.hasPassword();
  },
  setPassword: async (password: string) => {
    const data = await window.authAPI.setPassword(password);

    if (!data.success) {
      throw new Error(data.message);
    }
  },
  changePassword: async (oldPassword: string, newPassword: string) => {
    return await window.authAPI.changePassword(oldPassword, newPassword);
  },
  verifyPassword: async (password: string) => {
    return await window.authAPI.verifyPassword(password);
  },

  getRemainTime: async () => {
    return await window.authAPI.getRemainTime();
  },

  generate2FA: async () => {
    return await window.authAPI.generate2FA();
  },
  enable2FA: async (payload: { token: string; backupCodes: string[] }) => {
    const data = await window.authAPI.enable2FA(payload);
    if (!data.success) {
      throw new Error(data.message);
    }
  },
  verify2FA: async (code: string) => {
    const data = await window.authAPI.verify2FA(code);
    if (!data.success) {
      throw new Error(data.message);
    }
  },
  is2FAEnabled: async () => {
    return await window.authAPI.is2FAEnabled();
  },
  disable2FA: async (code: string) => {
    const data = await window.authAPI.disable2FA(code);
    if (!data.success) {
      throw new Error(data.message);
    }
  },
};
