import {
  Calendar,
  CalendarCheck2,
  CalendarDays,
  CalendarOff,
  Clock,
  DollarSign,
  Mail,
  Map,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
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
  const genderIcon = data.gender
    ? data.gender === "FEMALE"
      ? Venus
      : Mars
    : VenusAndMars;

  return (
    <Card className="shadow-sm flex flex-row gap-1.5">
      <CardHeader className="w-lg items-center justify-center h-full">
        <Avatar className="size-56">
          <AvatarImage src={data.image} />
          <AvatarFallback>{generateImageFallBack(data.name)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">{data.name}</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={CalendarDays} label={"Phone Number"}>
            <p className="font-medium">{data.phone}</p>
          </DetailsData>
          <DetailsData icon={Calendar} label={"Date of Birth"}>
            <p className="font-medium">
              {data.dob ? formatDate(data.dob) : "TBA"}
            </p>
          </DetailsData>
          <DetailsData icon={MapPin} label={"Address"}>
            <p className="font-medium">{data.address}</p>
          </DetailsData>
          <DetailsData icon={genderIcon} label={"Gender"}>
            <p className="font-medium">{data.gender || "N/A"}</p>
          </DetailsData>
          <DetailsData icon={Mail} label={"Email"}>
            <p className="font-medium">{data.email}</p>
          </DetailsData>
          <DetailsData icon={Phone} label={"Phone"}>
            <p className="font-medium">{data.phone}</p>
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

export default StudentsDetailsCard;
