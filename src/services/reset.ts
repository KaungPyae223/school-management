export const resetService = {
  reset: async (password?: string) => {
    await window.resetAPI.reset(password);
  },
};
