import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

const FormFooter = <T extends FieldValues>({
  form,
  formID,
  isSubmitting,
}: {
  form: UseFormReturn<T>;
  formID: string;
  isSubmitting: boolean;
}) => {
  return (
    <CardFooter className="flex gap-2">
      <Button
        className="ms-auto"
        type="button"
        variant="outline"
        onClick={() => form.reset()}
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
