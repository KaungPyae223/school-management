import { BookOpen, School, UserPen, UserPlus } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const DashboardFooter = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="shadow-xs">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-xs">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              {t("dashboard.footer.title")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.footer.description")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/students/create")}
          >
            <UserPlus className="w-3.5 h-3.5 mr-1" />
            {t("dashboard.footer.addStudent")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/courses/create")}
          >
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            {t("dashboard.footer.addCourse")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/teachers/create")}
          >
            <UserPen className="w-3.5 h-3.5 mr-1" />
            {t("dashboard.footer.addTeacher")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFooter;
