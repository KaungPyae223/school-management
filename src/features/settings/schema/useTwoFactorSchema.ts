import z from "zod";
import { useTranslation } from "react-i18next";

export const useTwoFactorSchema = () => {
  const { t } = useTranslation();

  const formSchema = z.object({
    token: z
      .string()
      .min(1, t("validation.required", { field: t("settings.fields.token") })),
  });

  return {
    formSchema,
  };
};
