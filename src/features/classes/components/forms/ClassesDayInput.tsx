import { useTranslation } from "react-i18next";
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { useClassDayInput } from "../../hooks/forms/useClassDayInput";

interface ClassesDayInputProps {
  field: ControllerRenderProps<any, "days">;
  fieldState: ControllerFieldState;
}

const ClassesDayInput = ({ field, fieldState }: ClassesDayInputProps) => {
  const { t } = useTranslation();
  const { days, selectedDays, toggleDay } = useClassDayInput(field);

  return (
    <div
      aria-invalid={fieldState.invalid}
      className="p-3 rounded-lg border border-border aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 grid grid-cols-4 items-center gap-2"
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
