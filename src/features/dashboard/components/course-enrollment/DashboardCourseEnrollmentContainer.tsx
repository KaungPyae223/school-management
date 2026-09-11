import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import { useNavigate } from "react-router";
import { ChevronRight, LibraryBig } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import DashboardCourseEnrollmentPieChart from "./DashboardCourseEnrollmentPieChart";
import DataShow from "../../../../components/data/DataShow";

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

  const navigate = useNavigate();

  return (
    <DashboardCard
      title="Course Enrollment Share"
      description="Student distribution across active courses"
      className="lg:col-span-1"
    >
      <DataShow
        isLoading={false}
        dataLength={data?.length}
        emptyTitle="No courses data"
        emptyDescription="Courses will appear here once created"
        emptyIcon={LibraryBig}
        action={{
          label: "Create Courses",
          link: "/courses/create",
        }}
        className="border-0 shadow-none ring-0"
      >
        <CardContent>
          <div className="w-full flex items-center justify-center">
            <DashboardCourseEnrollmentPieChart data={formattedData} />
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
        <CardFooter className="py-2.5 mt-auto text-xs flex justify-between items-center">
          <span className="text-muted-foreground">
            Total:{" "}
            <span className="text-primary font-medium">{totalCourses}</span>{" "}
            Courses
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/courses")}
          >
            View All <ChevronRight />
          </Button>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};
export default DashboardCourseEnrollmentContainer;
