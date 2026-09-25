import { BarChart3, Presentation, School, Users } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router";

const AnalysisFooter = () => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-xs">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-xs">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              Need the full picture?
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore the underlying records behind these insights
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/students")}
          >
            <Users className="w-3.5 h-3.5 mr-1" />
            View Students
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/teachers")}
          >
            <Presentation className="w-3.5 h-3.5 mr-1" />
            View Teachers
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-8 bg-background"
            onClick={() => navigate("/classes")}
          >
            <School className="w-3.5 h-3.5 mr-1" />
            View Classes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisFooter;
