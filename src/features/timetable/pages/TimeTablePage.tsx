import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch"; // YOUR THEME
import timeGridPlugin from "@fullcalendar/react/timegrid";
import dayGridPlugin from "@fullcalendar/react/daygrid";

import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { m, AnimatePresence } from "framer-motion";
import { Card, CardHeader } from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { LibraryBig, UserPen } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { ScrollArea } from "../../../components/ui/scroll-area";
import TimeTableTeacherSelect from "../components/TimeTableTeacherSelect";

export default function TimeTablePage() {
  const { view, changeView } = useViewTabChange("courses");

  useAddBreadcrumb({
    title: "Timetable",
  });

  return (
    <Tabs
      value={view}
      onValueChange={changeView}
      defaultValue="courses"
      className="space-y-4"
    >
      <Card className="shadow-sm ">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <TimeTableTeacherSelect />
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>
        </CardHeader>
      </Card>

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
              plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              allDaySlot={false}
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
              plugins={[themePlugin, dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              allDaySlot={false}
            />
          </m.div>
        )}
      </AnimatePresence>
    </Tabs>
  );
}
