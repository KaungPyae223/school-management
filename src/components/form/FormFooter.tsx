import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

const FormFooter = ({
  formID,
  isSubmitting,
  resetForm,
}: {
  formID: string;
  isSubmitting: boolean;
  resetForm: () => void;
}) => {
  return (
    <CardFooter className="flex gap-2">
      <Button
        className="ms-auto"
        type="button"
        variant="outline"
        onClick={resetForm}
      >
        Reset
      </Button>

      <Button type="submit" form={formID} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" />
            Loading...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </CardFooter>
  );
};

export default FormFooter;
