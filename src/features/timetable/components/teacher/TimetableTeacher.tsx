import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import { changeTime } from "../../../../utils/change-time";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { useTimetableChange } from "../../hooks/views/useTimetableChange";
import { useFilterData } from "../../hooks/views/useFilterData";
import { useModeStore } from "../../../../stores/useModeStore";
import i18n from "../../../../translate/i18n";
import { calendarLocales, myLocale } from "../../utils/calendar-locales";
import { myanmarMonths } from "../../../../utils/format-date";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const TimetableTeacher = ({
  data,
  handleClassClick,
}: {
  data: any;
  handleClassClick: (data: any) => void;
}) => {
  const { handleDatesSet, initialDate, initialView } =
    useTimetableChange("timeGridWeek");

  const { filteredData } = useFilterData({
    selectedParam: "selectedTeachers",
    deSelectedParam: "deSelectedTeachers",
    idField: "teacherId",
  });

  const { activeMode } = useModeStore();

  const calendarLocale = i18n.language === "my-MM" ? myLocale : i18n.language;

  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin, timeGridPlugin, rrulePlugin]}
      locales={calendarLocales}
      locale={calendarLocale}
      titleFormat={
        i18n.language === "my-MM"
          ? (info) => {
              const month = info.date.month;
              const year = info.date.year;

              return `${myanmarMonths[month]} ${replaceLocalDigit(year)}`;
            }
          : undefined
      }
      initialView={initialView}
      colorScheme={activeMode()}
      showNonCurrentDates={false}
      initialDate={initialDate}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      allDaySlot={false}
      events={filteredData(data)}
      datesSet={handleDatesSet}
      eventDisplay="block"
      eventClick={(eventInfo) => {
        handleClassClick(eventInfo.event.extendedProps.classData);
      }}
      eventContent={(eventInfo) => (
        <div className="flex items-center gap-1.5 px-1 py-0.5 overflow-hidden">
          <Avatar className="h-7 w-7 ring-1 ring-primary-foreground/20">
            <AvatarImage
              src={eventInfo.event.extendedProps.course_image}
              alt={eventInfo.event.extendedProps.teacher}
            />
            <AvatarFallback className="bg-primary-foreground/15 text-primary-foreground">
              {generateImageFallBack(eventInfo.event.extendedProps.teacher)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] font-semibold leading-tight text-primary-foreground">
              {eventInfo.event.extendedProps.teacher}
            </div>

            <div className="truncate text-[10px] leading-tight text-primary-foreground/80">
              {changeTime(eventInfo.event.extendedProps.startTime)} -{" "}
              {changeTime(eventInfo.event.extendedProps.endTime)}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default TimetableTeacher;
