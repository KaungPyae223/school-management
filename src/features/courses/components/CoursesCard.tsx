import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarClock,
  EllipsisVertical,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { Separator } from "../../../components/ui/separator";
import { useState } from "react";
import CourseDeleteAlert from "./CourseDeleteAlert";

const CoursesCard = ({ course }: { course: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="shadow-sm hover:shadow-md pt-0 transition-shadow duration-200 group overflow-hidden">
        <div className="relative">
          <img
            src={course.image}
            alt=""
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-300"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon-sm"
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30"
              >
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setConfirmDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="absolute bottom-3 left-3">
            <Badge
              variant="secondary"
              className="text-sm shadow-sm bg-white/90 text-foreground"
            >
              {formatCurrency(course.price)}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{course.name}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="grid grid-cols-2 gap-3">
            <CourseStatsCard
              icon={
                <Users size={14} className="text-blue-600 dark:text-blue-400" />
              }
              iconBg="bg-blue-100 dark:bg-blue-900/30"
              label="Students"
              value="10"
            />

            <CourseStatsCard
              icon={
                <UserPen
                  size={14}
                  className="text-purple-600 dark:text-purple-400"
                />
              }
              iconBg="bg-purple-100 dark:bg-purple-900/30"
              label="Teachers"
              value="10"
            />

            <CourseStatsCard
              icon={
                <BookOpen
                  size={14}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              label="Classes"
              value="20"
            />

            <CourseStatsCard
              icon={
                <PlayCircle
                  size={14}
                  className="text-orange-600 dark:text-orange-400"
                />
              }
              iconBg="bg-orange-100 dark:bg-orange-900/30"
              label="Active"
              value="5"
            />
          </div>
        </CardContent>

        <CardContent>
          <Separator className="mb-4" />
          <div className="space-y-2">
            {course.createdAt && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs  uppercase tracking-wide text-muted-foreground font-medium">
                  <Calendar className="h-3 w-3" />
                  Created Date
                </span>
                <Badge variant="secondary" className="text-xs font-medium">
                  {formatDate(course.createdAt)}
                </Badge>
              </div>
            )}

            {course.updatedAt && course.updatedAt !== course.createdAt && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  <CalendarClock className="h-3 w-3" />
                  Last updated
                </span>
                <Badge
                  variant="secondary"
                  className="text-xs font-medium text-blue-700 dark:text-blue-300"
                >
                  {formatDate(course.updatedAt)}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Course Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
      <CourseDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={course.id}
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
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
};

export default CoursesCard;
