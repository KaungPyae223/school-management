import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent } from "../../../../components/ui/card";
import type { TeacherWorkload } from "../../data/analysis-dummy";
import DataShow from "../../../../components/data/DataShow";
import { ClipboardList, UserPen } from "lucide-react";
import AnalysisTeacherWorkloadCard from "./AnalysisTeacherWorkloadCard";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { useGetTeacherWorkload } from "../../hooks/api/useGetTeacherWorkload";
import DataLoadMore from "../../../../components/data/DataLoadMore";
import { useTranslation } from "react-i18next";

const AnalysisTeacherWorkloadContainer = () => {
  const { t } = useTranslation();

  const {
    teacherWorkload,
    isLoading,
    error,
    loadingRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTeacherWorkload();

  if (error) {
    throw error;
  }

  return (
    <DashboardCard
      title={t("analysis.workload.title")}
      description={t("analysis.workload.description")}
      icon={ClipboardList}
    >
      <DataShow
        isLoading={isLoading}
        dataLength={teacherWorkload.length}
        emptyTitle={t("analysis.workload.emptyTitle")}
        emptyDescription={t("analysis.workload.emptyDescription")}
        emptyIcon={UserPen}
        action={{
          label: t("analysis.workload.createTeacher"),
          link: "/teachers/create",
        }}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0 flex-1 space-y-1">
          <ScrollArea className="h-96 px-4 pb-0">
            <div className="space-y-4 ">
              {teacherWorkload.map((teacher) => (
                <AnalysisTeacherWorkloadCard key={teacher.id} data={teacher} />
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

export default AnalysisTeacherWorkloadContainer;
