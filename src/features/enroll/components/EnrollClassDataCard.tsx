import React from "react";
import { Badge } from "../../../components/ui/badge";

import {
  CalendarClock,
  CalendarDays,
  Clock,
  DollarSign,
  type LucideIcon,
} from "lucide-react";
import { formatDate } from "../../../utils/format-date";
import { formatCurrency } from "../../../utils/format-currency";
import ClassesTeacherCard from "../../classes/components/ClassesTeacherCard";
import { Separator } from "../../../components/ui/separator";
import { changeTime } from "../../../utils/change-time";

const EnrollClassDataCard = ({ data }: { data: any }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Top Section: Course & Teacher */}
      <div className="flex  items-center  ">
        <img
          src={data.course_image}
          alt={data.course.name}
          className="h-24 w-24 m-4 shrink-0 border border-border  rounded-lg object-cover"
        />
        <Separator orientation="vertical" />
        <div className="flex-1 space-y-3 m-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {data.course.name}
            </h3>
            <Badge variant="outline">Batch {data.batch}</Badge>
          </div>
          <ClassesTeacherCard
            image={data.teacher_image}
            name={data.teacher.name}
          />
        </div>
      </div>

      {/* Bottom Section: Schedule Grid */}
      <div className=" divide-y divide-border  border-t border-border  text-sm">
        <div className="divide-x divide-border grid grid-cols-2">
          <ClassData icon={CalendarDays} label="Opening Days">
            <div className="space-x-1 space-y-1">
              {data.days.split(",").map((day) => (
                <Badge variant="outline" className="bg-white" key={day}>
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
          </ClassData>

          <ClassData icon={Clock} label="Time">
            <p className="font-medium">
              {changeTime(data.startTime)} - {changeTime(data.endTime)}
            </p>
          </ClassData>
        </div>
        <div className="divide-x divide-border grid grid-cols-2">
          <ClassData icon={CalendarClock} label="Start Date">
            <p className="font-medium">{formatDate(data.startDate)}</p>
          </ClassData>

          <ClassData icon={DollarSign} label="Price">
            <p className="font-medium">{formatCurrency(data.price)}</p>
          </ClassData>
        </div>
      </div>
    </div>
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
    <div className="space-y-2 p-3">
      <div className="flex items-center text-sm gap-1.5 text-muted-foreground">
        <Icon size={13} />
        {label}
      </div>
      {children}
    </div>
  );
};

export default EnrollClassDataCard;
