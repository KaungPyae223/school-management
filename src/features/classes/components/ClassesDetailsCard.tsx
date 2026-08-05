import {
  BadgeCheck,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  CalendarOff,
  Clock,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { Separator } from "../../../components/ui/separator";
import ClassesStatus from "./ClassesStatus";
import ClassesTeacherCard from "./ClassesTeacherCard";
import { changeTime } from "../../../utils/change-time";
import DetailsData from "../../../components/details/DetailsData";
import ImageDisplay from "../../../components/image/ImageDisplay";

const ClassesDetailsCard = ({ data }: { data: any }) => {
  return (
    <Card className="shadow-sm flex flex-row gap-1.5">
      <CardHeader className="w-lg">
        <ImageDisplay
          image={data.course_image}
          alt={data.course.name}
          fallbackIcon={BookOpen}
          display="details"
        />
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {data.course.name}
          </h3>
          <Badge variant="outline">Batch {data.batch}</Badge>
        </div>
        <p className="text-sm text-muted-foreground "> {data.description}</p>

        <ClassesTeacherCard
          image={data.teacher_image}
          name={data.teacher.name}
        />

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={CalendarDays} label={"Opening Days"}>
            <div className="space-x-1 space-y-1">
              {data.days.split(",").map((day) => (
                <Badge variant="outline" key={day}>
                  {day.slice(0, 3)}
                </Badge>
              ))}
            </div>
          </DetailsData>
          <DetailsData icon={Clock} label={"Time"}>
            <p className="font-medium">
              {changeTime(data.startTime)} - {changeTime(data.endTime)}
            </p>
          </DetailsData>
          <DetailsData icon={DollarSign} label={"Price"}>
            <p className="font-medium">{formatCurrency(data.price)}</p>
          </DetailsData>
          <DetailsData icon={BadgeCheck} label={"Status"}>
            <ClassesStatus status={data.status} />
          </DetailsData>
          <DetailsData icon={CalendarCheck2} label={"Start Date"}>
            <p className="font-medium">{formatDate(data.startDate)}</p>
          </DetailsData>
          <DetailsData icon={CalendarOff} label={"End Date"}>
            <p className="font-medium">
              {data.endDate ? formatDate(data.endDate) : "TBA"}
            </p>
          </DetailsData>
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

export default ClassesDetailsCard;
