import { Input } from "../ui/input";

const dateToTimeString = (value: unknown): string => {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toTimeString().slice(0, 5); // "HH:mm"
  }
  if (typeof value === "string") return value;
  return "";
};

const timeStringToDate = (timeString: string): Date => {
  const [hours = 0, minutes = 0] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const TimeInput = ({
  field,
  fieldState,
  id,
  disabled,
}: {
  field: any;
  fieldState: any;
  id: string;
  disabled?: boolean;
}) => {
  const { value, onChange, ...restField } = field;

  return (
    <Input
      {...restField}
      type="time"
      id={id}
      value={dateToTimeString(value)}
      onChange={(e) => onChange(timeStringToDate(e.target.value))}
      aria-invalid={fieldState.invalid}
      autoComplete="off"
      disabled={disabled ?? field.disabled}
    />
  );
};

export default TimeInput;
