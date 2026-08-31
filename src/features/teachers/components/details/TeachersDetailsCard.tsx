import { useTranslation } from "react-i18next";
import { IdCard, Mail, MapPin, Phone } from "lucide-react";
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

const TeachersDetailsCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-xs flex flex-row gap-1.5">
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
          <DetailsData icon={Phone} label={t("teachers.fields.phoneNumber")}>
            <p className="font-medium">{replaceLocalDigit(data.phone)}</p>
          </DetailsData>
          <DetailsData icon={Mail} label={t("teachers.fields.email")}>
            <p className="font-medium">{data.email || t("students.tba")}</p>
          </DetailsData>

          <DetailsData icon={IdCard} label={t("teachers.fields.nrc")}>
            <p className="font-medium">{data.nrc || t("students.tba")}</p>
          </DetailsData>
          <DetailsData
            icon={MapPin}
            label={t("teachers.fields.address")}
            className="col-span-3"
          >
            <p className="font-medium">{data.address || t("students.tba")}</p>
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

export default TeachersDetailsCard;
