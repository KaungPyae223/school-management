import { CalendarIcon } from "lucide-react";
import { formatDate } from "../../utils/format-date";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";


const DateInput = ({
  field,
  label,
  disabledDate,
  ariaInvalid,
}: {
  field: any;
  label: string;
  disabledDate?: (date: Date) => boolean;
  ariaInvalid?: boolean;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!field.value}
          aria-invalid={ariaInvalid}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
        >
          {field.value ? formatDate(field.value) : <span>{label}</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          defaultMonth={field.value}
          captionLayout="dropdown"
          disabled={disabledDate}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateInput;
