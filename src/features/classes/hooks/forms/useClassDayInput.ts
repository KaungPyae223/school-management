import type { ControllerRenderProps } from "react-hook-form";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_ORDER: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

export const useClassDayInput = (field: ControllerRenderProps<any, "days">) => {
  const selectedDays = field.value?.split(",").filter(Boolean) ?? [];

  const toggleDay = (day: string) => {
    const isSelected = selectedDays.includes(day);
    const updated = isSelected
      ? selectedDays.filter((d: string) => d !== day)
      : [...selectedDays, day];

    const sorted = updated.sort(
      (a, b) => (DAY_ORDER[a] ?? 0) - (DAY_ORDER[b] ?? 0),
    );

    field.onChange(sorted.join(","));
  };

  return {
    days: DAYS_OF_WEEK,
    selectedDays,
    toggleDay,
  };
};
