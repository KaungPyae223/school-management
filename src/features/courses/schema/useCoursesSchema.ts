import z from "zod";
import { useTranslation } from "react-i18next";

export const useCoursesSchema = () => {
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
      .min(1, t("validation.required", { field: t("courses.fields.name") })),
    description: z.string().optional(),
    price: z
      .number(t("validation.required", { field: t("courses.fields.price") }))
      .min(
        1,
        t("validation.minNumber", { field: t("courses.fields.price"), min: 0 }),
      ),
  });

  return {
    formSchema,
  };
};

export type CoursesFormValues = z.infer<
  ReturnType<typeof useCoursesSchema>["formSchema"]
>;

