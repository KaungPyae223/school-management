import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarOff,
  GraduationCap,
  Layers,
  UserPlus,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { formatCurrency } from "../../../utils/format-currency";
import { useState } from "react";
import { useNavigate } from "react-router";
import CardCretedUpdated from "../../../components/card-utils/CardCretedUpdated";
import CardMenu from "../../../components/card-utils/CardMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { formatDate } from "../../../utils/format-date";
import ClassesDeleteAlert from "./ClassesDeleteAlert";
import { useChangeTime } from "../hooks/useChangeTime";
import ClassesStatus from "./ClassesStatus";
import ClassesTeacherCard from "./ClassesTeacherCard";

const ClassesCard = ({ classData }: { classData: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const openingDays = classData.days.split(",");

  return (
    <>
      <Card className="shadow-sm hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          {classData.course_image ? (
            <>
              <img
                src={classData.course_image}
                alt=""
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-300"></div>
            </>
          ) : (
            <div className="w-full h-48 bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
              <BookOpen size={48} className="text-background" />
            </div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon-sm"
                onClick={() => navigate(`/enroll/${classData.id}`)}
                className="absolute bottom-3 right-3 text-white/80 bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Student</p>
            </TooltipContent>
          </Tooltip>
          <CardMenu
            onEdit={() => navigate(`/classes/edit/${classData.id}`)}
            onDelete={() => setConfirmDialogOpen(true)}
          />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-sm shadow-sm ">
              {formatCurrency(classData.price)}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <ClassesStatus status={classData.status} />
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">{classData.course_name}</CardTitle>
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
          {classData.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
              {classData.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="mt-auto">
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
              value={useChangeTime(classData.startTime)}
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
              value={useChangeTime(classData.endTime)}
            />
            <div className="col-span-2 w-full border border-border rounded-lg  px-3 py-2">
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

            <div className="flex items-center col-span-2 w-full justify-between rounded-lg border border-border px-3 py-2 ">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30">
                  <GraduationCap
                    size={16}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-xs text-muted-foreground/60">Enrolled</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="font-medium text-foreground"
              >
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
          </div>
        </CardContent>

        <CardCretedUpdated
          createdAt={classData.createdAt}
          updatedAt={classData.updatedAt}
        />

        <CardFooter>
          <Button
            variant="ghost"
            className="w-full justify-between"
            onClick={() => navigate(`/classes/details/${classData.id}`)}
          >
            View Course Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
      <ClassesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={classData.id}
      />
    </>
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
    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/50">
      <div className={`p-1.5 rounded-md ${iconBg}`}>{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xs font-medium">{value}</p>
      </div>
    </div>
  );
};

export default ClassesCard;
