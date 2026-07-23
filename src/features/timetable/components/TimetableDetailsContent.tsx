import React from "react";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "../../../components/ui/drawer";
import { Button } from "../../../components/ui/button";
import {
  BookOpen,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarOff,
  GraduationCap,
  Layers,
  DollarSign,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Badge } from "../../../components/ui/badge";
import { changeTime } from "../../../utils/change-time";
import ClassesTeacherCard from "../../classes/components/ClassesTeacherCard";
import { formatDate } from "../../../utils/format-date";
import { useNavigate } from "react-router";
import { formatCurrency } from "../../../utils/format-currency";

const TimetableDetailsContent = ({ classData }: { classData: any }) => {
  if (!classData) {
    return null;
  }
  const openingDays = classData.days.split(",");

  const navigate = useNavigate();

  return (
    <DrawerContent>
      <div className="space-y-3 px-4 mt-4">
        {classData.course_image ? (
          <img
            src={classData.course_image}
            alt=""
            className="w-full h-48 rounded-md object-cover border border-border"
          />
        ) : (
          <div className="w-full h-48 rounded-md bg-foreground/50 border border-border backdrop-blur-sm flex items-center justify-center">
            <BookOpen size={48} className="text-background" />
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg">{classData.course_name}</p>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="px-2 py-1 text-sm flex items-center gap-2"
                >
                  <Layers /> {classData.batch}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Batch {classData.batch}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-4">
          {classData.description}
        </p>
        <div className="grid grid-cols-2 gap-3 ">
          <CourseStatsCard
            icon={
              <CalendarClock
                size={14}
                className="text-purple-600 dark:text-purple-400"
              />
            }
            iconBg="bg-purple-100 dark:bg-purple-900/30"
            label="Start Time"
            value={changeTime(classData.startTime)}
          />

          <CourseStatsCard
            icon={
              <CalendarClock
                size={14}
                className="text-orange-600 dark:text-orange-400"
              />
            }
            iconBg="bg-orange-100 dark:bg-orange-900/30"
            label="End Time"
            value={changeTime(classData.endTime)}
          />
          <div className="col-span-2 w-full border border-border rounded-lg px-3 py-2">
            <div className="text-muted-foreground text-xs flex items-center gap-1.5">
              <Calendar className="size-3" /> Schedule Days
              <Badge variant="secondary" className="ms-auto">
                {openingDays.length} days
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-2.5">
              {openingDays.map((day) => (
                <Badge variant="outline" className="bg-white" key={day}>
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
          </div>

          <ClassesTeacherCard
            image={classData.teacher_image}
            name={classData.teacher_name}
            className="rounded-lg col-span-2 px-2"
          />

          <div className="flex items-center col-span-2 w-full justify-between rounded-lg border border-border px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30">
                <GraduationCap
                  size={16}
                  className="text-green-600 dark:text-green-400"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Students</p>
                <p className="text-xs text-muted-foreground/60">Enrolled</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-medium text-foreground">
              {classData.total_students}
            </Badge>
          </div>

          <CourseStatsCard
            icon={
              <CalendarCheck2
                size={14}
                className="text-blue-600 dark:text-blue-400"
              />
            }
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            label="Start Date"
            value={formatDate(classData.startDate)}
          />

          <CourseStatsCard
            icon={
              <CalendarOff
                size={14}
                className="text-red-600 dark:text-red-400"
              />
            }
            iconBg="bg-red-100 dark:bg-red-900/30"
            label="End Date"
            value={classData.endDate ? formatDate(classData.endDate) : "TBA"}
          />

          {/* Price Card - Full Width */}
          <div className="flex items-center col-span-2 w-full justify-between rounded-lg border border-border px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-yellow-100 dark:bg-yellow-900/30">
                <DollarSign
                  size={16}
                  className="text-yellow-600 dark:text-yellow-400"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Course Price</p>
                <p className="text-xs text-muted-foreground/60">Per Student</p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="font-medium text-foreground text-sm"
            >
              {formatCurrency(classData.price)}
            </Badge>
          </div>
        </div>
      </div>

      <DrawerFooter className="flex-row gap-2">
        <DrawerClose asChild>
          <Button variant="outline" className="flex-1">
            Close
          </Button>
        </DrawerClose>
        <Button
          className="flex-1"
          onClick={() => navigate(`/classes/details/${classData.id}`)}
        >
          View Class Details
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

const CourseStatsCard = ({
  icon,
  label,
  value,
  iconBg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg: string;
}) => {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-lg border border-border">
      <div className={`p-1.5 rounded-md ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </div>
  );
};

export default TimetableDetailsContent;
