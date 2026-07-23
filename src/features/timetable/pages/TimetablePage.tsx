import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import rrulePlugin from "@fullcalendar/rrule";

import { Tabs } from "../../../components/ui/tabs";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { m, AnimatePresence } from "framer-motion";
import { useAppQuery } from "../../../hooks/use-app-query";
import { classesService } from "../../../services/classes";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import TimetableHeader from "../components/TimetableHeader";
import { changeTime } from "../../../utils/change-time";
import { useFormatData } from "../hooks/useFormatData";
import { useTimetableChange } from "../hooks/useTimetableChange";
import { Drawer } from "../../../components/ui/drawer";

import { useState } from "react";

import TimetableDetailsContent from "../components/TimetableDetailsContent";

const TimetablePage = () => {
  useAddBreadcrumb({
    title: "Timetable",
  });

  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { view, changeView } = useViewTabChange("courses");

  const { params, handleDatesSet } = useTimetableChange();

  const { data } = useAppQuery({
    queryKey: ["classes", params],
    queryFn: () => classesService.getAllClasses(params),
  }) as { data: ResponseDataType };

  const formattedData = data?.data?.map(useFormatData);

  const handleClassClick = (classData: any) => {
    setClassData(classData);
    setOpen(true);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <Tabs
        value={view}
        onValueChange={changeView}
        defaultValue="courses"
        className="space-y-4"
      >
        <TimetableHeader tab={view} />

        <AnimatePresence mode="wait" initial={false}>
          {view === "courses" && (
            <m.div
              key="weekly"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FullCalendar
                plugins={[
                  themePlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  rrulePlugin,
                ]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                allDaySlot={false}
                events={formattedData}
                datesSet={handleDatesSet}
                eventDisplay="block"
                eventClick={(eventInfo) => {
                  handleClassClick(eventInfo.event.extendedProps.classData);
                }}
                eventContent={(eventInfo) => (
                  <div className="px-1 py-0.5 space-y-0.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="text-[11px] font-semibold leading-tight truncate text-white">
                        {eventInfo.event.title}
                      </div>
                      {eventInfo.event.extendedProps.batch && (
                        <span className="shrink-0 text-[9px] font-medium bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                          B{eventInfo.event.extendedProps.batch}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] opacity-90 leading-tight truncate text-white/90">
                      {eventInfo.event.extendedProps.teacher}
                    </div>
                    <div className="text-[10px] opacity-75 leading-tight truncate text-white/80">
                      {changeTime(eventInfo.event.extendedProps.startTime)} -{" "}
                      {changeTime(eventInfo.event.extendedProps.endTime)}
                    </div>
                  </div>
                )}
              />
            </m.div>
          )}
          {view === "teachers" && (
            <m.div
              key="teachers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FullCalendar
                plugins={[
                  themePlugin,
                  dayGridPlugin,
                  timeGridPlugin,
                  rrulePlugin,
                ]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                allDaySlot={false}
                events={formattedData}
                datesSet={handleDatesSet}
                eventDisplay="block"
                eventContent={(eventInfo) => (
                  <div className="px-1 py-0.5 ">
                    <div className="text-[11px] font-semibold leading-tight truncate text-white">
                      {eventInfo.event.title}
                    </div>
                    {eventInfo.event.extendedProps?.teacher && (
                      <div className="text-[10px] opacity-90 leading-tight truncate text-white/90">
                        {eventInfo.event.extendedProps.teacher}
                      </div>
                    )}
                    {eventInfo.event.extendedProps?.room && (
                      <div className="text-[10px] opacity-75 leading-tight truncate text-white/80">
                        10:00 - 11:30 AM
                      </div>
                    )}
                  </div>
                )}
              />
            </m.div>
          )}
        </AnimatePresence>
      </Tabs>
      <TimetableDetailsContent classData={classData} />
    </Drawer>
  );
};

export default TimetablePage;
