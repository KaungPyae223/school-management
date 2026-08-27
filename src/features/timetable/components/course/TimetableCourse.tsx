import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import { changeTime } from "../../../../utils/change-time";
import { useTimetableChange } from "../../hooks/useTimetableChange";
import { useFilterData } from "../../hooks/useFilterData";
import { useModeStore } from "../../../stores/useModeStore";
import { useTranslation } from "react-i18next";
import { calendarLocales, myLocale } from "../utils/calendar-locales";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { myanmarMonths } from "../../../../utils/format-date";

const TimetableCourse = ({
  data,
  handleClassClick,
}: {
  data: any;
  handleClassClick: (data: any) => void;
}) => {
  const { i18n } = useTranslation();
  const { handleDatesSet, initialDate, initialView } =
    useTimetableChange("dayGridMonth");

  const { filteredData } = useFilterData({
    selectedParam: "selectedCourses",
    deSelectedParam: "deSelectedCourses",
    idField: "courseId",
  });

  const { activeMode } = useModeStore();

  const calendarLocale = i18n.language === "my-MM" ? myLocale : i18n.language;

  return (
    <FullCalendar
      key={`${i18n.language}-${activeMode()}`}
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
      initialDate={initialDate}
      colorScheme={activeMode()}
      showNonCurrentDates={false}
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
        <div className="px-1 py-0.5 space-y-0.5">
          <div className="flex items-center justify-between gap-1.5">
            <div className="text-[11px] font-semibold leading-tight truncate text-primary-foreground">
              {eventInfo.event.title}
            </div>
            {eventInfo.event.extendedProps.batch && (
              <span className="shrink-0 text-[9px] font-medium bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded-full">
                B{replaceLocalDigit(eventInfo.event.extendedProps.batch)}
              </span>
            )}
          </div>
          <div className="text-[10px] leading-tight truncate text-primary-foreground/90">
            {eventInfo.event.extendedProps.teacher}
          </div>
          <div className="text-[10px] leading-tight truncate text-primary-foreground/80">
            {changeTime(eventInfo.event.extendedProps.startTime)} -{" "}
            {changeTime(eventInfo.event.extendedProps.endTime)}
          </div>
        </div>
      )}
    />
  );
};

export default TimetableCourse;
