export const authService = {
  hasPassword: async () => {
    try {
      const response = await window.authAPI.hasPassword();
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  setPassword: async (password: string) => {
    try {
      const response = await window.authAPI.setPassword(password);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      const response = await window.authAPI.changePassword(
        oldPassword,
        newPassword,
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  verifyPassword: async (password: string) => {
    try {
      const response = await window.authAPI.verifyPassword(password);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
