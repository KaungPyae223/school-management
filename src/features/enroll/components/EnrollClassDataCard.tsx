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
import DetailsData from "../../../components/details/DetailsData";

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
          <DetailsData
            className="rounded-none"
            icon={CalendarDays}
            label="Opening Days"
            border={false}
          >
            <div className="space-x-1 space-y-1">
              {data.days.split(",").map((day) => (
                <Badge variant="outline" className="bg-white" key={day}>
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
          </DetailsData>

          <DetailsData
            className="rounded-none"
            icon={Clock}
            label="Time"
            border={false}
          >
            <p className="font-medium">
              {changeTime(data.startTime)} - {changeTime(data.endTime)}
            </p>
          </DetailsData>
        </div>
        <div className="divide-x divide-border grid grid-cols-2">
          <DetailsData
            className="rounded-none"
            icon={CalendarClock}
            label="Start Date"
            border={false}
          >
            <p className="font-medium">{formatDate(data.startDate)}</p>
          </DetailsData>

          <DetailsData
            className="rounded-none"
            icon={DollarSign}
            label="Price"
            border={false}
          >
            <p className="font-medium">{formatCurrency(data.price)}</p>
          </DetailsData>
        </div>
      </div>
    </div>
  );
};

export default EnrollClassDataCard;
