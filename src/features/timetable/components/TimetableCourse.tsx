import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import rrulePlugin from "@fullcalendar/rrule";
import { changeTime } from "../../../utils/change-time";
import { useTimetableChange } from "../hooks/useTimetableChange";
import { useFilterData } from "../hooks/useFilterData";
import { useModeStore } from "../../../stores/useModeStore";

const TimetableCourse = ({
  data,
  handleClassClick,
}: {
  data: any;
  handleClassClick: (data: any) => void;
}) => {
  const { handleDatesSet, initialDate, initialView } =
    useTimetableChange("dayGridMonth");

  const { filteredData } = useFilterData({
    selectedParam: "selectedCourses",
    deSelectedParam: "deSelectedCourses",
    idField: "courseId",
  });

  const { activeMode } = useModeStore();

  return (
    <FullCalendar
      plugins={[themePlugin, dayGridPlugin, timeGridPlugin, rrulePlugin]}
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
                B{eventInfo.event.extendedProps.batch}
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
