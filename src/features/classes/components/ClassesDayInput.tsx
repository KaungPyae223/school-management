import { useState } from "react";
import { Button } from "../../../components/ui/button";

const ClassesDayInput = ({
  field,
  fieldState,
}: {
  field: any;
  fieldState: any;
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(
    field?.value?.split(",") ?? [],
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayOrder = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  const toggleDay = (day: string) => {
    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    const sortedDays = newSelectedDays.sort(
      (a, b) =>
        dayOrder[a as keyof typeof dayOrder] -
        dayOrder[b as keyof typeof dayOrder],
    );

    setSelectedDays(sortedDays);
    field.onChange(sortedDays.join(","));
  };

  return (
    <div
      aria-invalid={fieldState.invalid}
      className="p-3 rounded-lg border border-border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20  dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex flex-wrap items-center gap-2"
    >
      {days.map((day) => (
        <Button
          type="button"
          key={day}
          size="sm"
          variant={selectedDays.includes(day) ? "default" : "outline"}
          onClick={() => toggleDay(day)}
        >
          {day}
        </Button>
      ))}
    </div>
  );
};

export default ClassesDayInput;
