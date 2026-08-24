import { useTranslation } from "react-i18next";
import { translateError } from "../../utils/translate-error";

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  const { t } = useTranslation();
  if (!errorMessage) return null;

  return (
    <div
      className={`border border-destructive bg-destructive/10 text-destructive rounded-md p-3 text-sm`}
    >
      {translateError(errorMessage, t)}
    </div>
  );
};

export default FormError;
