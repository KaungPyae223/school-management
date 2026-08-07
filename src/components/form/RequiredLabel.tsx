import { useTranslation } from "react-i18next";
import { FieldLabel } from "../ui/field";

const RequiredLabel = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  return (
    <FieldLabel
      htmlFor={id}
      className="flex flex-row justify-between items-center"
    >
      {children} *{" "}
      <span className="text-muted-foreground text-xs">
        {t("form.required")}
      </span>
    </FieldLabel>
  );
};

export default RequiredLabel;
