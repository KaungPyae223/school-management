import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router";
import { useGetRecentEnrollment } from "../../hooks/api/useGetRecentEnrollment";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import DataShow from "../../../../components/data/DataShow";
import { GraduationCap, ChevronRight } from "lucide-react";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import DashboardRecentEnrollmentCard from "./DashboardRecentEnrollmentCard";
import { useTranslation } from "react-i18next";

const DashboardRecentEnrollmentContainer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    enrollments,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetRecentEnrollment();

  if (error) {
    throw error;
  }

  return (
    <DashboardCard
      className="lg:col-span-2 "
      title={t("dashboard.recentEnrollments.title")}
      description={t("dashboard.recentEnrollments.description")}
      action={
        <Button
          onClick={() => navigate("/students")}
          variant="outline"
          size="sm"
          className="text-xs h-8"
        >
          {t("dashboard.recentEnrollments.viewAllStudents")}
        </Button>
      }
      dataTour="recent-enrollment"
    >
      <DataShow
        isLoading={isLoading}
        dataLength={enrollments?.length}
        emptyTitle={t("dashboard.recentEnrollments.emptyTitle")}
        emptyDescription={t("dashboard.recentEnrollments.emptyDescription")}
        emptyIcon={GraduationCap}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4">
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <DashboardRecentEnrollmentCard
                  key={enrollment.id}
                  data={enrollment}
                />
              ))}
              {hasNextPage && (
                <div ref={loadingRef} className="py-2 text-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                      Loading more...
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </DataShow>

      <CardFooter className="py-2.5 mt-auto text-xs flex justify-between items-center">
        <span className="text-muted-foreground">
          {t("dashboard.recentEnrollments.showingEnrollments")}{" "}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/classes")}
        >
          {t("dashboard.recentEnrollments.enrollStudent")}{" "}
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </DashboardCard>
  );
};

export default DashboardRecentEnrollmentContainer;
