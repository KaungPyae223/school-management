import { Clock, Dot, Users } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { changeTime } from "../../../../utils/change-time";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

const DashboardTodayClassesCard = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div key={data.id} className="p-3 rounded-lg border space-y-2.5">
      <div className="space-y-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-base text-foreground hover:text-primary transition-colors">
              {data.course_name}
            </span>
            <Badge variant="outline" className="text-xs px-2 py-0 font-mono">
              B-{data.batch}
            </Badge>
          </div>
          <Badge
            variant="secondary"
            className="text-[11px] text-muted-foreground"
          >
            {data.days
              .split(",")
              .map((day: string) => t(`general.days.${day}` as any))
              .join(", ")}
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {changeTime(data.startTime)} – {changeTime(data.endTime)}
          </span>

          <Separator
            orientation="vertical"
            className="mx-0.5 bg-foreground/25"
          />

          <span className="inline-flex items-center gap-1">
            <Users className="size-3" />
            {replaceLocalDigit(data.total_students || 0)}{" "}
            {t("classes.enrolled", { defaultValue: "enrolled" })}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t text-xs">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-6 shrink-0">
            <AvatarImage src={data.teacher_image} alt={data.teacher_name} />
            <AvatarFallback className="text-[9px]">
              {generateImageFallBack(data.teacher_name)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {t("classes.teacher", { defaultValue: "Teacher" })}
            </p>
            <p className="truncate text-xs font-medium text-foreground">
              {data.teacher_name}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate(`classes/details/${data.id}`)}
          variant="outline"
          size="xs"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DashboardTodayClassesCard;
