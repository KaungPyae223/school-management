import { store, StoreSchema } from "../store";
import { protectedHandle } from "../auth/protected-ipc";

const allowedKeys: (keyof StoreSchema)[] = [
  "defaultView",
  "preferredLanguage",
  "mode",
  "colorScheme",
  "appTourStorage",
  
];

export const storeIPCs = () => {
  protectedHandle("store:get", async (_, key: keyof StoreSchema) => {
    if (!allowedKeys.includes(key)) {
      return null;
    }
    const result = (await store.get(key)) ?? null;

    return result;
  });
  protectedHandle(
    "store:set",
    async (_, key: keyof StoreSchema, value: string) => {
      if (!allowedKeys.includes(key)) {
        return;
      }
      await store.set(key, value);
    },
  );
  protectedHandle("store:delete", async (_, key: keyof StoreSchema) => {
    if (!allowedKeys.includes(key)) {
      return;
    }
    await store.delete(key);
  });
};
