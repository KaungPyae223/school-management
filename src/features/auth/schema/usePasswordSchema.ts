import z from "zod";
import { useTranslation } from "react-i18next";

export const usePasswordSchema = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    password: z
      .string()
      .min(1, t("validation.required", { field: t("auth.fields.password") }))
      .min(
        4,
        t("validation.minLength", {
          field: t("auth.fields.password"),
          min: 4,
        }),
      )
      .max(
        8,
        t("validation.maxLength", {
          field: t("auth.fields.password"),
          max: 8,
        }),
      ),
  });

  return {
    formSchema,
  };
};
