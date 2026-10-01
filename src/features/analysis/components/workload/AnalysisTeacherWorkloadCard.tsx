import { BookOpen, GraduationCap } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { formatCurrency } from "../../../../utils/format-currency";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AnalysisTeacherWorkloadCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div key={data.id} className="p-3 rounded-lg border">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0 border">
            <AvatarImage src={data.teacherImage} alt={data.name} />
            <AvatarFallback>{generateImageFallBack(data.name)}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {data.name}
              </p>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5  " />
              <span className="font-semibold text-foreground">
                {replaceLocalDigit(data.total_classes || 0)}
              </span>
              <span className="text-xs">{t("analysis.workload.classes")}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right space-y-1">
          <p className="text-xs text-muted-foreground">
            {t("analysis.workload.activeClasses")}
          </p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {replaceLocalDigit(formatCurrency(data.total_active_classes))}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5  " />
            <span className="font-semibold text-foreground">
              {replaceLocalDigit(data.total_students || 0)}
            </span>
            <span className="text-xs">{t("analysis.workload.students")}</span>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/teachers/details/${data.id}`)}
          variant="outline"
          size="xs"
        >
          {t("dashboard.cards.viewDetails")}
        </Button>
      </div>
    </div>
  );
};

export default AnalysisTeacherWorkloadCard;
