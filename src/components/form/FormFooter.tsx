import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import type { FieldValues, UseFormReturn } from "react-hook-form";

const FormFooter = <T extends FieldValues>({
  form,
  formID,
}: {
  form: UseFormReturn<T>;
  formID: string;
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
      <Button type="submit" form={formID}>
        Submit
      </Button>
    </CardFooter>
  );
};

export default FormFooter;
