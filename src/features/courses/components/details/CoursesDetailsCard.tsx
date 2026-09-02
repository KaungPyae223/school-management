import { useTranslation } from "react-i18next";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Currency,
  DollarSign,
  DoorOpen,
  PlayCircle,
  UserPen,
  Users,
  XLineTop,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { Separator } from "../../../../components/ui/separator";
import DetailsData from "../../../../components/details/DetailsData";
import ImageDisplay from "../../../../components/image/ImageDisplay";

import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
const CoursesDetailsCard = ({ courseData }: { courseData: any }) => {
  const { t } = useTranslation();
  const avgStudents =
    courseData.total_classes > 0
      ? Math.round(
          Number(courseData.total_students) / Number(courseData.total_classes),
        )
      : 0;

  return (
    <Card className="shadow-xs flex flex-row gap-1.5">
      <CardHeader className="w-lg">
        <ImageDisplay
          image={courseData.image}
          alt={courseData.name}
          fallbackIcon={BookOpen}
          display="details"
        />
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {courseData.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground ">
          {" "}
          {courseData.description}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={DollarSign} label={t("courses.fields.price")}>
            <p className="font-medium">{formatCurrency(courseData.price)}</p>
          </DetailsData>
          <DetailsData icon={Currency} label={t("courses.totalRevenue")}>
            <p className="font-medium">
              {formatCurrency(courseData.total_revenue)}
            </p>
          </DetailsData>
          <DetailsData
            icon={XLineTop}
            label={t("courses.averageStudentsPerClass")}
          >
            <p className="font-medium">{replaceLocalDigit(avgStudents)}</p>
          </DetailsData>
          <DetailsData icon={UserPen} label={t("courses.totalTeachers")}>
            <p className="font-medium">
              {replaceLocalDigit(courseData.total_teachers)}
            </p>
          </DetailsData>
          <DetailsData icon={Users} label={t("courses.totalStudents")}>
            <p className="font-medium">
              {replaceLocalDigit(courseData.total_students)}
            </p>
          </DetailsData>
          <DetailsData icon={DoorOpen} label={"Total Withdrawn Students"}>
            <p className="font-medium">
              {replaceLocalDigit(courseData.withdrawn_students)}
            </p>
          </DetailsData>
          <DetailsData icon={BookOpen} label={t("courses.totalClasses")}>
            <p className="font-medium">
              {replaceLocalDigit(courseData.total_classes)}
            </p>
          </DetailsData>
          <DetailsData
            icon={PlayCircle}
            label={t("courses.totalActiveClasses")}
          >
            <p className="font-medium">
              {replaceLocalDigit(courseData.total_active_classes)}
            </p>
          </DetailsData>

          <DetailsData
            icon={CheckCircle2}
            label={t("courses.totalCompletedClasses")}
          >
            <p className="font-medium">
              {replaceLocalDigit(courseData.total_complete_classes)}
            </p>
          </DetailsData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">{t("general.createdAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(courseData.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">{t("general.updatedAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(courseData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesDetailsCard;
