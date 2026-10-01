import { BookOpen, GraduationCap, LibraryBig, UserPen } from "lucide-react";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { formatCurrency } from "../../../../utils/format-currency";
import { Button } from "../../../../components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Separator } from "../../../../components/ui/separator";

const AnalysisTopCoursesCard = ({ data }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div key={data.id} className="p-3 rounded-lg border">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <ImageDisplay
            image={data.courseImage}
            alt={data.name}
            fallbackIcon={LibraryBig}
            display="list"
          />

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
              <span className="text-xs">
                {t("analysis.topCourses.classes")}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right space-y-1">
          <p className="text-xs text-muted-foreground">
            {t("analysis.topCourses.totalRevenue")}
          </p>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {replaceLocalDigit(formatCurrency(data.total_revenue))}
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
            <span className="text-xs">{t("analysis.topCourses.students")}</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
            <UserPen className="h-3.5 w-3.5  " />
            <span className="font-semibold text-foreground">
              {replaceLocalDigit(data.total_teachers || 0)}
            </span>
            <span className="text-xs">{t("analysis.topCourses.teachers")}</span>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/courses/details/${data.id}`)}
          variant="outline"
          size="xs"
        >
          {t("dashboard.cards.viewDetails")}
        </Button>
      </div>
    </div>
  );
};

export default AnalysisTopCoursesCard;
