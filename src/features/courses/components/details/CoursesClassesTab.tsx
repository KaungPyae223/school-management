import { useTranslation } from "react-i18next";
import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen } from "lucide-react";
import Paginate from "../../../../components/paginate/Paginate";
import { courseService } from "../../../../services/courses";
import CoursesClassesList from "./CoursesClassesList";

const CoursesClassesTab = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["courses_classes", id, activeQueryParams],
    queryFn: () =>
      courseService.getCourseClasses({
        ...activeQueryParams,
        id,
      }),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <DataShow
      isLoading={isLoading}
      dataLength={data?.data.length}
      emptyDescription={t("courses.noClassesDesc")}
      emptyTitle={t("courses.noClassesTitle")}
      emptyIcon={BookOpen}
    >
      <CoursesClassesList data={data?.data} />
      <Paginate meta={data?.meta} />
    </DataShow>
  );
};

export default CoursesClassesTab;
