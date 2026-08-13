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
};
