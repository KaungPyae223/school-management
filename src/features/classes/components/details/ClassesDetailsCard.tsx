import { useTranslation } from "react-i18next";
import {
  BadgeCheck,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  CalendarOff,
  Clock,
  Currency,
  DollarSign,
  DoorOpen,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { Separator } from "../../../../components/ui/separator";
import ClassesStatus from "../shared/ClassesStatus";
import ClassesTeacherCard from "./ClassesTeacherCard";
import { changeTime } from "../../../../utils/change-time";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import CardDayBadge from "../../../../components/card-utils/CardDayBadge";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import DetailsData from "../../../../components/details/DetailsData";

const ClassesDetailsCard = ({ classData }: { classData: any }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-xs flex flex-row gap-1.5">
      <CardHeader className="w-lg">
        <ImageDisplay
          image={classData.course_image}
          alt={classData.course_name}
          fallbackIcon={BookOpen}
          display="details"
        />
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {classData.course_name}
          </h3>
          <Badge variant="outline">
            {t("classes.batch", { batch: replaceLocalDigit(classData.batch) })}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground ">
          {" "}
          {classData.description}
        </p>

        <ClassesTeacherCard
          image={classData.teacher_image}
          name={classData.teacher_name}
        />

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={CalendarDays} label={t("classes.openingDays")}>
            <div className="space-x-1 space-y-1">
              {classData.days.split(",").map((day: string) => (
                <CardDayBadge day={day} variant="outline" key={day} />
              ))}
            </div>
          </DetailsData>
          <DetailsData icon={Clock} label={t("classes.fields.time")}>
            <p className="font-medium">
              {changeTime(classData.startTime)} -{" "}
              {changeTime(classData.endTime)}
            </p>
          </DetailsData>
          <DetailsData icon={DollarSign} label={t("classes.fields.price")}>
            <p className="font-medium">{formatCurrency(classData.price)}</p>
          </DetailsData>
          <DetailsData icon={BadgeCheck} label={t("classes.fields.status")}>
            <ClassesStatus status={classData.status} />
          </DetailsData>
          <DetailsData
            icon={CalendarCheck2}
            label={t("classes.fields.startDate")}
          >
            <p className="font-medium">{formatDate(classData.startDate)}</p>
          </DetailsData>
          <DetailsData icon={CalendarOff} label={t("classes.fields.endDate")}>
            <p className="font-medium">
              {classData.endDate
                ? formatDate(classData.endDate)
                : t("students.tba")}
            </p>
          </DetailsData>
          <DetailsData
            icon={GraduationCap}
            label={t("classes.fields.totalStudents")}
          >
            <p className="font-medium">
              {replaceLocalDigit(classData.total_students)}
            </p>
          </DetailsData>
          <DetailsData
            icon={DoorOpen}
            label={t("classes.totalWithdrawnStudents")}
          >
            <p className="font-medium">
              {replaceLocalDigit(classData.withdrawn_students)}
            </p>
          </DetailsData>
          <DetailsData icon={Currency} label={t("classes.totalRevenue")}>
            <p className="font-medium">
              {formatCurrency(classData.total_revenue)}
            </p>
          </DetailsData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">{t("general.createdAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(classData.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">{t("general.updatedAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(classData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassesDetailsCard;
