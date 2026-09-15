import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Link, useNavigate } from "react-router";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import TableHeader from "../../../../components/table/TableHeader";
import TableHead from "../../../../components/table/TableHead";
import TableBody from "../../../../components/table/TableBody";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import { ChevronRight, GraduationCap } from "lucide-react";
import DataShow from "../../../../components/data/DataShow";
import DashboardRecentEnrollmentRow from "./DashboardRecentEnrollmentRow";
import { useGetRecentEnrollment } from "../../hooks/api/useGetRecentEnrollment";

const DashboardRecentEnrollmentContainer = () => {
  const navigate = useNavigate();

  const { data, initialLoading, loadingRef, hasMore, isLoading } =
    useGetRecentEnrollment();

  return (
    <Card className="lg:col-span-2 shadow-xs flex flex-col">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">
            Recent Enrollments
          </CardTitle>
          <CardDescription className="text-xs">
            Latest student admissions and class registrations
          </CardDescription>
        </div>
        <Button asChild variant="outline" size="sm" className="text-xs h-8">
          <Link to="/students">View All Students</Link>
        </Button>
      </CardHeader>
      <DataShow
        isLoading={initialLoading}
        dataLength={data?.length}
        emptyTitle="No recent enrollments"
        emptyDescription="Recent enrollments will appear here once students are enrolled and payments are recorded."
        emptyIcon={GraduationCap}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="px-4 py-0 flex-1">
          <ScrollArea className="h-96 rounded-lg border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <TableHeader>
                  <TableHead>Student</TableHead>
                  <TableHead>Enrolled Course</TableHead>
                  <TableHead align="right">Tuition Fee</TableHead>
                  <TableHead align="right">Time</TableHead>
                  <TableHead align="right">Actions</TableHead>
                </TableHeader>
                <TableBody>
                  {data.map((enrollment) => (
                    <DashboardRecentEnrollmentRow
                      key={enrollment.id}
                      data={enrollment}
                    />
                  ))}
                  {hasMore && (
                    <TableRow ref={loadingRef} className="py-2 text-center">
                      {isLoading && (
                        <TableCell
                          colSpan={5}
                          className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                          Loading more...
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </DataShow>

      <CardFooter className="py-2.5 mt-auto text-xs flex justify-between items-center">
        <span className="text-muted-foreground">
          Showing enrollments from the previous 7 days.{" "}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/classes")}
        >
          Enroll Student <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardRecentEnrollmentContainer;
