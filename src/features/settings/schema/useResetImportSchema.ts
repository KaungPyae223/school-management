import z from "zod";

export const useResetImportSchema = () => {
  const formSchema = z.object({
    password: z.string().optional(),
  });

  return {
    formSchema,
  };
};
