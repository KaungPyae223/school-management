import { useTranslation } from "react-i18next";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

const FormFooter = ({
  formID,
  isSubmitting,
  resetForm,
  disabled,
}: {
  formID: string;
  isSubmitting: boolean;
  resetForm: () => void;
  disabled?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <CardFooter className="flex gap-2">
      <Button
        className="ms-auto"
        type="button"
        variant="outline"
        onClick={resetForm}
      >
        {t("form.reset")}
      </Button>

      <Button type="submit" form={formID} disabled={isSubmitting || disabled}>
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" />
            {t("form.loading")}
          </>
        ) : (
          t("form.submit")
        )}
      </Button>
    </CardFooter>
  );
};

export default FormFooter;
