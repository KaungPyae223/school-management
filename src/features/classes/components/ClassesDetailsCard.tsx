import {
  BadgeCheck,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  CalendarOff,
  Clock,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { useChangeTime } from "../hooks/useChangeTime";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { Separator } from "../../../components/ui/separator";
import ClassesStatus from "./ClassesStatus";
import ClassesTeacherCard from "./ClassesTeacherCard";

const ClassesDetailsCard = ({ data }: { data: any }) => {
  return (
    <Card className="shadow-sm flex flex-row gap-1.5">
      <CardHeader className="w-sm">
        <div className="relative rounded-md overflow-hidden">
          {data.course_image ? (
            <>
              <img
                src={data.course_image}
                alt={data.course.name}
                className="w-full  object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </>
          ) : (
            <div className="w-full h-full bg-foreground/50 backdrop-blur-sm flex items-center justify-center">
              <BookOpen size={48} className="text-background" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {data.course.name}
          </h3>
          <Badge variant="outline">Batch {data.batch}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{data.description}</p>

        <ClassesTeacherCard
          image={data.teacher_image}
          name={data.teacher.name}
        />

        <div className="grid grid-cols-3 gap-3">
          <ClassData icon={CalendarDays} label={"Opening Days"}>
            <div className="space-x-1 space-y-1">
              {data.days.split(",").map((day) => (
                <Badge variant="outline" className="bg-white" key={day}>
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
          </ClassData>
          <ClassData icon={Clock} label={"Time"}>
            <p className="font-medium">
              {useChangeTime(data.startTime)} - {useChangeTime(data.endTime)}
            </p>
          </ClassData>
          <ClassData icon={DollarSign} label={"Price"}>
            <p className="font-medium">{formatCurrency(data.price)}</p>
          </ClassData>
          <ClassData icon={BadgeCheck} label={"Status"}>
            <ClassesStatus status={data.status} />
          </ClassData>
          <ClassData icon={CalendarCheck2} label={"Start Date"}>
            <p className="font-medium">{formatDate(data.startDate)}</p>
          </ClassData>
          <ClassData icon={CalendarOff} label={"End Date"}>
            <p className="font-medium">
              {data.endDate ? formatDate(data.endDate) : "TBA"}
            </p>
          </ClassData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">Created At</p>
              <p className="font-medium text-foreground">
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">Last Updated</p>
              <p className="font-medium text-foreground">
                {formatDate(data.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ClassData = ({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 p-3 border rounded-md">
      <div className="flex items-center text-sm gap-1.5 text-muted-foreground">
        <Icon size={13} />
        {label}
      </div>
      {children}
    </div>
  );
};

export default ClassesDetailsCard;
