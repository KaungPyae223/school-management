import { useTranslation } from "react-i18next";
import { Calendar, CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

import { formatDate } from "../../../utils/format-date";
import { Separator } from "../../../components/ui/separator";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import DetailsData from "../../../components/details/DetailsData";
import { Mars, Venus, VenusAndMars } from "lucide-react";

const StudentsDetailsCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const genderIcon = data.gender
    ? data.gender === "FEMALE"
      ? Venus
      : Mars
    : VenusAndMars;

  const getGenderLabel = (gender: string) => {
    if (gender === "FEMALE") return t("students.fields.female");
    if (gender === "MALE") return t("students.fields.male");
    return gender || t("students.na");
  };

  return (
    <Card className="shadow-sm flex flex-row gap-1.5">
      <CardHeader className="w-lg items-center justify-center h-full">
        <Avatar className="size-56">
          <AvatarImage src={data.image} />
          <AvatarFallback className="text-5xl">
            {generateImageFallBack(data.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">{data.name}</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={Phone} label={t("students.fields.phoneNumber")}>
            <p className="font-medium">{data.phone}</p>
          </DetailsData>
          <DetailsData icon={Calendar} label={t("students.fields.dob")}>
            <p className="font-medium">
              {data.dob ? formatDate(data.dob) : t("students.tba")}
            </p>
          </DetailsData>
          <DetailsData icon={MapPin} label={t("students.fields.address")}>
            <p className="font-medium">{data.address || t("students.na")}</p>
          </DetailsData>
          <DetailsData icon={genderIcon} label={t("students.fields.gender")}>
            <p className="font-medium">{getGenderLabel(data.gender)}</p>
          </DetailsData>
          <DetailsData icon={Mail} label={t("students.fields.email")}>
            <p className="font-medium">{data.email || t("students.na")}</p>
          </DetailsData>
          <DetailsData icon={Phone} label={t("students.fields.phone")}>
            <p className="font-medium">{data.phone || t("students.na")}</p>
          </DetailsData>
        </div>
        <Separator />
        <div className=" flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-[11px]">{t("general.createdAt")}</p>
              <p className="font-medium text-foreground">
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[11px]">{t("general.updatedAt")}</p>
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

export default StudentsDetailsCard;
