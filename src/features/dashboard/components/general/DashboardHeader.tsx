import { Button } from "../../../../components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {t("dashboard.header.title")}
      </h1>

      <div className="flex items-center gap-2.5">
        <Button variant="outline" onClick={() => navigate("/timetable")}>
          <CalendarDays className="w-3.5 h-3.5 text-primary" />
          {t("dashboard.header.timetable")}
        </Button>

        <Button onClick={() => navigate("/classes")}>
          <Plus className="w-3.5 h-3.5" />
          {t("dashboard.header.newEnrollment")}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
