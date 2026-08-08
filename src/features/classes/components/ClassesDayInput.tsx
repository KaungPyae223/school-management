import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";
import type {
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";

const ClassesDayInput = ({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, "days">;
  fieldState: ControllerFieldState;
}) => {
  const { t } = useTranslation();
  const selectedDays = field.value?.split(",") ?? [];

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
    const newSelectedDays = (
      selectedDays.includes(day)
        ? selectedDays.filter((d: string) => d !== day)
        : [...selectedDays, day]
    ).filter((d: string) => d !== "");

    const sortedDays = newSelectedDays.sort(
      (a: string, b: string) =>
        dayOrder[a as keyof typeof dayOrder] -
        dayOrder[b as keyof typeof dayOrder],
    );

    field.onChange(sortedDays.join(","));
  };

  return (
    <div
      aria-invalid={fieldState.invalid}
      className="p-3 rounded-lg border border-border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20  dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 grid grid-cols-4 items-center gap-2"
    >
      {days.map((day) => (
        <Button
          type="button"
          key={day}
          size="sm"
          className="w-full"
          variant={selectedDays.includes(day) ? "default" : "outline"}
          onClick={() => toggleDay(day)}
        >
          {t(`classes.days.${day}` as any)}
        </Button>
      ))}
    </div>
  );
};

export default ClassesDayInput;

