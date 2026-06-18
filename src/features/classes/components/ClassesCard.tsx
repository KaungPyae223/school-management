import {
  ArchiveRestore,
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarOff,
  CheckCircle2,
  Circle,
  ClipboardList,
  EllipsisVertical,
  GraduationCap,
  Layers,
  Pencil,
  PlayCircle,
  Trash2,
  UserPen,
  Users,
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";


const statusConfig = {
  not_started: {
    label: "Not started",
    icon: <Circle size={12} />,
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  },
  ongoing: {
    label: "Ongoing",
    icon: <PlayCircle size={12} />,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  },
  complete: {
    label: "Complete",
    icon: <CheckCircle2 size={12} />,
    className: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  },
};

const ClassesCard = ({ course }: { course: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const status = statusConfig["ongoing"];

  return (
    <>
      <Card className="shadow-sm hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          {course.image ? (
            <>
              <img
                src={course.image}
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
          <CardMenu
            onEdit={() => navigate(`/courses/edit/${course.id}`)}
            onDelete={() => setConfirmDialogOpen(true)}
          />
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-sm shadow-sm ">
              {formatCurrency(course.price)}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge className={` ${status.className}`}>
              {status.icon} {status.label}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="secondary"
                  className="px-2 py-1 text-sm flex items-center gap-2"
                >
                  <Layers /> 50
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>50 Bath</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-3 gap-y-4.5">
            <CourseStatsCard
              icon={
                <CalendarCheck2
                  size={14}
                  className="text-blue-600 dark:text-blue-400"
                />
              }
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              label="Start Date"
              value={formatDate(course.createdAt)}
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
              value={formatDate(course.createdAt)}
            />

            <div className="flex items-center col-span-2 w-full justify-between bg-muted rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30">
                  <GraduationCap
                    size={14}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  Total Students
                </span>
              </div>
              <span className="text-sm font-medium">{100}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                  {/* <AvatarImage
                    src={course.teacher.image}
                    alt={course.teacher.name}
                  /> */}
                  <AvatarFallback>
                    {generateImageFallBack("Ko Ko AUng")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs text-gray-500">Instructor</p>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    Ko Ko AUng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardCretedUpdated
          createdAt={course.createdAt}
          updatedAt={course.updatedAt}
        />

        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Course Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
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
