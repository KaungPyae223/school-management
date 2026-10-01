import { LibraryBig, Trophy } from "lucide-react";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import { useGetTopCourses } from "../../hooks/api/useGetTopCourses";
import DataShow from "../../../../components/data/DataShow";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import AnalysisTopCoursesCard from "./AnalysisTopCoursesCard";
import DataLoadMore from "../../../../components/data/DataLoadMore";
import { useTranslation } from "react-i18next";

const AnalysisTopCoursesContainer = () => {
  const { t } = useTranslation();

  const {
    courses,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTopCourses();

  if (error) {
    throw error;
  }

  return (
    <DashboardCard
      title={t("analysis.topCourses.title")}
      description={t("analysis.topCourses.description")}
      icon={Trophy}
    >
      <DataShow
        isLoading={isLoading}
        dataLength={courses.length}
        emptyTitle={t("analysis.topCourses.emptyTitle")}
        emptyDescription={t("analysis.topCourses.emptyDescription")}
        emptyIcon={LibraryBig}
        action={{
          label: t("analysis.topCourses.createCourse"),
          link: "/courses/create",
        }}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-96 px-4 pb-0">
            <div className="space-y-4 ">
              {courses.map((item) => (
                <AnalysisTopCoursesCard key={item.id} data={item} />
              ))}
              {hasNextPage && (
                <DataLoadMore
                  loadingRef={loadingRef}
                  isFetchingNextPage={isFetchingNextPage}
                />
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </DataShow>
    </DashboardCard>
  );
};

export default AnalysisTopCoursesContainer;
