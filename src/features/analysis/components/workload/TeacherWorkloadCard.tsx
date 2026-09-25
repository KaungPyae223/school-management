import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import type { TeacherWorkload } from "../../data/analysis-dummy";

const TeacherWorkloadCard = ({ data }: { data: TeacherWorkload[] }) => {
  const maxStudents = Math.max(...data.map((t) => t.students));

  return (
    <DashboardCard
      title="Teacher Workload"
      description="Assigned classes and active students"
    >
      <CardContent className="p-0 flex-1 space-y-1">
        {data.map((teacher) => (
          <div
            key={teacher.id}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-muted/60"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="text-xs">
                  {generateImageFallBack(teacher.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{teacher.name}</p>
                <p className="text-xs text-muted-foreground">
                  {teacher.classes}{" "}
                  {teacher.classes === 1 ? "class" : "classes"}
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold tabular-nums">
                {teacher.students}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {((teacher.students / maxStudents) * 100).toFixed(0)}% of peak
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </DashboardCard>
  );
};

export default TeacherWorkloadCard;
