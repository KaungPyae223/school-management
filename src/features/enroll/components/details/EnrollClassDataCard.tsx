import { Badge } from "../../../../components/ui/badge";

import {
  BookOpen,
  CalendarClock,
  CalendarDays,
  Clock,
  DollarSign,
} from "lucide-react";
import { formatDate } from "../../../../utils/format-date";
import { formatCurrency } from "../../../../utils/format-currency";
import { Separator } from "../../../../components/ui/separator";
import { changeTime } from "../../../../utils/change-time";
import DetailsData from "../../../../components/details/DetailsData";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import CardDayBadge from "../../../../components/card-utils/CardDayBadge";

import { useTranslation } from "react-i18next";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import ClassesTeacherCard from "../../../classes/components/details/ClassesTeacherCard";

const EnrollClassDataCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Top Section: Course & Teacher */}
      <div className="flex  items-center">
        <ImageDisplay
          image={data.course_image}
          alt={data.course.name}
          display="data"
          fallbackIcon={BookOpen}
        />
        <Separator orientation="vertical" />
        <div className="flex-1 space-y-3 m-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold line-clamp-1">
              {data.course.name}
            </h3>
            <Badge variant="outline">
              {t("classes.batch", { batch: replaceLocalDigit(data.batch) })}
            </Badge>
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
                <CardDayBadge key={day} day={day} variant="outline" />
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
