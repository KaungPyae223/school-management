import { Input } from "../ui/input";

const NumberInput = ({
  field,
  fieldState,
  id,
  placeholder,
}: {
  field: any;
  fieldState: any;
  id: string;
  placeholder: string;
}) => {
  return (
    <Input
      {...field}
      id={id}
      type="number"
      aria-invalid={fieldState.invalid}
      onChange={(e) => {
        const val = e.target.value;
        if (val !== "0") {
          field.onChange(val === "" ? undefined : Number(val));
        }
      }}
      placeholder={placeholder}
      autoComplete="off"
      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      onWheel={(e) => e.currentTarget.blur()}
    />
  );
};

export default NumberInput;
