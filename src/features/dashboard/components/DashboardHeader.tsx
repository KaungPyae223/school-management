
import { Button } from "../../../components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        Academic Dashboard
      </h1>

      <div className="flex items-center gap-2.5">
        <Button variant="outline" onClick={() => navigate("/timetable")}>
          <CalendarDays className="w-3.5 h-3.5 text-primary" />
          Timetable
        </Button>

        <Button onClick={() => navigate("/classes")}>
          <Plus className="w-3.5 h-3.5" />
          New Enrollment
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
