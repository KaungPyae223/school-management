export const setupService = {
  isComplete: async () => {
    return await window.setupAPI.isComplete();
  },
  complete: async () => {
    await window.setupAPI.complete();
  },
};
