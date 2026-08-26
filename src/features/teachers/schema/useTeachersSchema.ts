import z from "zod";
import { useTranslation } from "react-i18next";

export const useTeachersSchema = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
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
    name: z
      .string()
      .min(1, t("validation.required", { field: t("teachers.fields.name") })),
    phone: z
      .string()
      .min(1, t("validation.required", { field: t("teachers.fields.phone") })),
    email: z.string().email(t("validation.email")).or(z.literal("")).optional(),
    address: z
      .string()
      .min(
        1,
        t("validation.required", { field: t("teachers.fields.address") }),
      ),
    nrc: z.string().optional(),
  });

  return {
    formSchema,
  };
};
