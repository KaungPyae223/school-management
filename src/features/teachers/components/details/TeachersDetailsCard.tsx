import { useTranslation } from "react-i18next";
import {
  BookOpen,
  CircleCheck,
  DollarSign,
  DoorOpen,
  GraduationCap,
  IdCard,
  LibraryBig,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import DetailsData from "../../../../components/details/DetailsData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { formatDate } from "../../../../utils/format-date";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { formatCurrency } from "../../../../utils/format-currency";

const TeachersDetailsCard = ({ teacherData }: { teacherData: any }) => {
  const { t } = useTranslation();

  console.log(teacherData);
  return (
    <Card className="shadow-xs flex flex-row gap-1.5">
      <CardHeader className="w-lg items-center justify-center h-full">
        <Avatar className="size-72">
          <AvatarImage src={teacherData.image} />
          <AvatarFallback className="text-5xl">
            {generateImageFallBack(teacherData.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">
            {teacherData.name}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={Phone} label={t("teachers.fields.phoneNumber")}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.phone)}
            </p>
          </DetailsData>
          <DetailsData icon={Mail} label={t("teachers.fields.email")}>
            <p className="font-medium">
              {teacherData.email || t("students.tba")}
            </p>
          </DetailsData>

          <DetailsData icon={IdCard} label={t("teachers.fields.nrc")}>
            <p className="font-medium">
              {teacherData.nrc || t("students.tba")}
            </p>
          </DetailsData>
          <DetailsData icon={LibraryBig} label={"Total Courses"}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.total_courses)}
            </p>
          </DetailsData>
          <DetailsData icon={BookOpen} label={"Total Classes"}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.total_classes)}
            </p>
          </DetailsData>
          <DetailsData icon={CircleCheck} label={"Total Active Classes"}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.total_active_classes)}
            </p>
          </DetailsData>
          <DetailsData icon={GraduationCap} label={"Total Students"}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.total_students)}
            </p>
          </DetailsData>
          <DetailsData icon={DoorOpen} label={"Total Withdrawn Students"}>
            <p className="font-medium">
              {replaceLocalDigit(teacherData.withdrawn_students)}
            </p>
          </DetailsData>
          <DetailsData icon={DollarSign} label={"Total Revenue"}>
            <p className="font-medium">
              {replaceLocalDigit(formatCurrency(teacherData.total_revenue))}
            </p>
          </DetailsData>
          <DetailsData
            icon={MapPin}
            label={t("teachers.fields.address")}
            className="col-span-3"
          >
            <p className="font-medium">
              {teacherData.address || t("students.tba")}
            </p>
          </DetailsData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">{t("general.createdAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(teacherData.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">{t("general.updatedAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(teacherData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeachersDetailsCard;
