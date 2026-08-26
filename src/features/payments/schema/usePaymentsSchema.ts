import z from "zod";
import { useTranslation } from "react-i18next";

export const usePaymentsSchema = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    amount: z
      .number()
      .min(1, t("validation.required", { field: t("payments.fields.amount") })),
    description: z.string().optional(),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("validation.fileSize"),
      })
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        {
          message: t("validation.fileFormat"),
        },
      )
      .optional(),
  });

  return {
    formSchema,
  };
};
