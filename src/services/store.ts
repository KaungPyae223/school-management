import { checkAuthorization } from "./check-authorization";

export const storeService = {
  get: async (key: string): Promise<string | null> => {
    const data = await window.electronStore.get(key);

    if (data.error) {
      checkAuthorization(data.error);
      throw new Error(data.error);
    }

    return data;
  },

  set: async (key: string, value: string): Promise<void> => {
    const data = await window.electronStore.set(key, value);

    if (data.error) {
      checkAuthorization(data.error);
      throw new Error(data.error);
    }
  },

  delete: async (key: string): Promise<void> => {
    const data = await window.electronStore.delete(key);

    if (data.error) {
      checkAuthorization(data.error);
      throw new Error(data.error);
    }
  },
};
