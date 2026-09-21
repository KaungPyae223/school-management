import { useNavigate } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { formatCurrency } from "../../../../utils/format-currency";
import { useGetRelativeTime } from "../../hooks/general/use-get-relative-time";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RecentEnrollmentData {
  id: string;
  student_image: string;
  student_name: string;
  student_phone: string;
  course_image: string;
  course_name: string;
  batch: number;
  price: number;
  paid_amount: number;
  createdAt: Date | string;
}

const DashboardRecentEnrollmentCard = ({
  data,
}: {
  data: RecentEnrollmentData;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="space-y-1.5 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {t("dashboard.cards.student")}
          </p>
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar className="h-10 w-10 shrink-0 border">
              <AvatarImage src={data.student_image} alt={data.student_name} />
              <AvatarFallback>
                {generateImageFallBack(data.student_name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {data.student_name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {replaceLocalDigit(data.student_phone)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {t("dashboard.cards.course")}
          </p>
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="shrink-0 overflow-hidden rounded-md">
              <ImageDisplay
                image={data.course_image}
                alt={data.course_name}
                fallbackIcon={BookOpen}
                display="list"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {data.course_name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {t("dashboard.cards.batch")}-{replaceLocalDigit(data.batch)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 p-3 md:text-right">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {t("dashboard.cards.courseFee")}
          </p>
          <p className="text-sm font-bold tabular-nums text-foreground">
            {replaceLocalDigit(formatCurrency(data.price))}
          </p>
          <p className="text-xs font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
            {replaceLocalDigit(formatCurrency(data.paid_amount))}{" "}
            {t("dashboard.cards.paid")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t px-3 py-2">
        <p className="text-xs text-muted-foreground">
          {t("dashboard.cards.enrolledAt")}:{" "}
          <span className="font-medium text-foreground">
            {useGetRelativeTime(new Date(data.createdAt))}
          </span>
        </p>
        <Button
          onClick={() => navigate(`/payments/${data.id}`)}
          variant="outline"
          size="xs"
        >
          {t("dashboard.cards.viewDetails")}
        </Button>
      </div>
    </div>
  );
};

export default DashboardRecentEnrollmentCard;
