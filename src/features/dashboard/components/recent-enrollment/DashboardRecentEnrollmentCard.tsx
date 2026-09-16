import { useNavigate } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { formatCurrency } from "../../../../utils/format-currency";
import { getRelativeTime } from "../../../../utils/get-relative-time";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { BookOpen } from "lucide-react";

const DashboardRecentEnrollmentCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border p-3 ">
      {/* Top */}
      <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg border md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="flex min-w-0 items-center gap-3 p-4 ">
          <Avatar className="h-11 w-11 ">
            <AvatarImage src={data.student_image} alt={data.student_name} />

            <AvatarFallback>
              {generateImageFallBack(data.student_name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 ">
            <p className="mb-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Student
            </p>

            <p className="truncate text-sm font-semibold text-foreground">
              {data.student_name}
            </p>

            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {replaceLocalDigit(data.student_phone)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-center w-full gap-3 p-4">
          <div className="shrink-0">
            <ImageDisplay
              image={data.course_image}
              alt={data.course_name}
              fallbackIcon={BookOpen}
              display="list"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Course
            </p>

            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">
                {data.course_name}
              </p>

              <Badge
                variant="secondary"
                className="shrink-0 rounded-md px-1.5 py-0 text-[10px] font-medium"
              >
                B-{data.batch}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-4 md:block md:text-right">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Course Fee
            </p>

            <p className="mt-1 text-base font-bold tracking-tight text-foreground">
              {replaceLocalDigit(formatCurrency(data.price))}
            </p>
          </div>

          <div className="md:mt-1.5">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {replaceLocalDigit(formatCurrency(data.paid_amount))} paid
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <p className="text-muted-foreground text-xs ">
          Enrolled At:{" "}
          <span className="font-medium text-foreground">
            {getRelativeTime(data.createdAt)}
          </span>
        </p>
        <Button
          onClick={() => navigate(`/payments/${data.id}`)}
          variant="outline"
          size="xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DashboardRecentEnrollmentCard;
