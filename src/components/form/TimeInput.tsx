import { ClockIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useRef } from "react";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowPicker = () => {
    if (inputRef.current && "showPicker" in inputRef.current) {
      try {
        inputRef.current.showPicker();
      } catch (error) {
        console.error("Failed to open native picker:", error);
      }
    }
  };

  return (
    <InputGroup onClick={handleShowPicker}>
      <InputGroupInput
        {...restField}
        ref={inputRef}
        type="time"
        id={id}
        value={dateToTimeString(value)}
        onChange={(e) => onChange(timeStringToDate(e.target.value))}
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        disabled={disabled ?? field.disabled}
        className="cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
      <InputGroupAddon align="inline-end" title="Open time picker">
        <ClockIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default TimeInput;
