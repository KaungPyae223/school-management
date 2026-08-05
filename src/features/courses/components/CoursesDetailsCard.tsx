import {
  BookOpen,
  CheckCircle2,
  Circle,
  Currency,
  DollarSign,
  PlayCircle,
  UserPen,
  Users,
  XLineTop,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { Separator } from "../../../components/ui/separator";
import DetailsData from "../../../components/details/DetailsData";
import ImageDisplay from "../../../components/image/ImageDisplay";

const CoursesDetailsCard = ({ data }: { data: any }) => {
  console.log("Courses Data", data);

  return (
    <Card className="shadow-sm flex flex-row gap-1.5">
      <CardHeader className="w-lg">
        <ImageDisplay
          image={data.image}
          alt={data.name}
          fallbackIcon={BookOpen}
          display="details"
        />
      </CardHeader>
      <CardContent className=" space-y-3 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-semibold line-clamp-1">{data.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground "> {data.description}</p>

        <div className="grid grid-cols-3 gap-3">
          <DetailsData icon={DollarSign} label={"Price"}>
            <p className="font-medium">{formatCurrency(data.price)}</p>
          </DetailsData>
          <DetailsData icon={UserPen} label={"Total Teacher"}>
            <p className="font-medium">{data.total_teachers}</p>
          </DetailsData>
          <DetailsData icon={Users} label={"Total Students"}>
            <p className="font-medium">{data.total_enrollments}</p>
          </DetailsData>
          <DetailsData icon={BookOpen} label={"Total Classes"}>
            <p className="font-medium">{data.total_classes}</p>
          </DetailsData>
          <DetailsData icon={PlayCircle} label={"Total Active Classes"}>
            <p className="font-medium">{data.total_active_classes}</p>
          </DetailsData>
          <DetailsData icon={Circle} label={"Total Upcoming Classes"}>
            <p className="font-medium">{data.total_upcoming_classes}</p>
          </DetailsData>
          <DetailsData icon={CheckCircle2} label={"Total Completed Classes"}>
            <p className="font-medium">{data.total_complete_classes}</p>
          </DetailsData>
          <DetailsData icon={Currency} label={"Total Revenue"}>
            <p className="font-medium">{formatCurrency(data.total_revenue)}</p>
          </DetailsData>
          <DetailsData icon={XLineTop} label={"Average Students per Class"}>
            <p className="font-medium">
              {data.total_classes > 0
                ? Math.round(
                    Number(data.total_enrollments) / Number(data.total_classes),
                  )
                : 0}
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

export default CoursesDetailsCard;
