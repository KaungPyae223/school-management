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
import { courseService } from "../../../../services/courses";
import { useAppQuery } from "../../../../hooks/use-app-query";
import LoadingComponent from "../../../../components/loading/LoadingComponent";
const CoursesDetailsCard = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useAppQuery({
    queryKey: ["courses-details", id],
    queryFn: () => courseService.getCourseDetail(id),
  }) as { data: { data: any }; isLoading: boolean };

  if (isLoading) {
    return <LoadingComponent />;
  }

  const detailsData = data?.data;

  const avgStudents =
    detailsData.total_classes > 0
      ? Math.round(
          Number(detailsData.total_students) /
            Number(detailsData.total_classes),
        )
      : 0;

  return (
    <Card className="shadow-xs flex flex-row gap-1.5">
      <CardHeader className="w-lg">
        <ImageDisplay
          image={detailsData.image}
          alt={detailsData.name}
          fallbackIcon={BookOpen}
          display="details"
        />
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {detailsData.name}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground ">
          {" "}
          {detailsData.description}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={DollarSign} label={t("courses.fields.price")}>
            <p className="font-medium">{formatCurrency(detailsData.price)}</p>
          </DetailsData>
          <DetailsData icon={Currency} label={t("courses.totalRevenue")}>
            <p className="font-medium">
              {formatCurrency(detailsData.total_revenue)}
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
              {replaceLocalDigit(detailsData.total_teachers)}
            </p>
          </DetailsData>
          <DetailsData icon={Users} label={t("courses.totalStudents")}>
            <p className="font-medium">
              {replaceLocalDigit(detailsData.total_students)}
            </p>
          </DetailsData>
          <DetailsData icon={DoorOpen} label={"Total Withdrawn Students"}>
            <p className="font-medium">
              {replaceLocalDigit(detailsData.withdrawn_students)}
            </p>
          </DetailsData>
          <DetailsData icon={BookOpen} label={t("courses.totalClasses")}>
            <p className="font-medium">
              {replaceLocalDigit(detailsData.total_classes)}
            </p>
          </DetailsData>
          <DetailsData
            icon={PlayCircle}
            label={t("courses.totalActiveClasses")}
          >
            <p className="font-medium">
              {replaceLocalDigit(detailsData.total_active_classes)}
            </p>
          </DetailsData>

          <DetailsData
            icon={CheckCircle2}
            label={t("courses.totalCompletedClasses")}
          >
            <p className="font-medium">
              {replaceLocalDigit(detailsData.total_complete_classes)}
            </p>
          </DetailsData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">{t("general.createdAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(detailsData.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">{t("general.updatedAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(detailsData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesDetailsCard;
