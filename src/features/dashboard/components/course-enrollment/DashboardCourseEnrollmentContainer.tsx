import { Cell, Pie, PieChart } from "recharts";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../../components/ui/chart";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import DashboardCoursePieChart from "./DashboardCoursePieChart";

const colors = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
];

const DashboardCourseEnrollmentContainer = ({
  data,
  totalCourses,
}: {
  data: any;
  totalCourses: number;
}) => {
  const formattedData = data.map((item: any, i: number) => ({
    name: item.name,
    total_enrollments: Number(item.total_enrollments),
    color: colors[i % colors.length],
    fill: colors[i % colors.length],
  }));

  return (
    <DashboardCard
      title="Course Enrollment Share"
      description="Student distribution across active courses"
      className="lg:col-span-1"
    >
      <CardContent className="pt-2">
        <div className="w-full flex items-center justify-center">
          <DashboardCoursePieChart data={formattedData} />
        </div>

         <div className="mt-2 space-y-1.5 overflow-y-auto pr-1">
          {formattedData.map((course, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: course.fill }}
                />
                <span className="truncate text-muted-foreground">
                  {course.name}
                </span>
              </div>
              <span className="font-medium text-foreground shrink-0">
                {course.total_enrollments}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="py-2.5 px-4 mt-auto border-t text-xs text-muted-foreground flex justify-between items-center bg-muted/20">
        <span>Total: {totalCourses} Courses</span>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="text-xs h-7 px-2 font-medium text-primary hover:text-primary"
        >
          <Link to="/courses">
            View All <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </DashboardCard>
  );
};
export default DashboardCourseEnrollmentContainer;
