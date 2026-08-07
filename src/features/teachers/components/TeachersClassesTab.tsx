import { useTranslation } from "react-i18next";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import DataShow from "../../../components/data/DataShow";
import { BookOpen } from "lucide-react";
import TeachersClassesList from "./TeachersClassesList";
import { teacherService } from "../../../services/teachers";
import Paginate from "../../../components/paginate/Paginate";

const TeachersClassesTab = ({ id }: { id: number }) => {
  const { t } = useTranslation();
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["teachers_classes", id, activeQueryParams],
    queryFn: () =>
      teacherService.getTeacherClasses({
        ...activeQueryParams,
        id,
      }),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <DataShow
      isLoading={isLoading}
      dataLength={data?.data.length}
      emptyDescription={t("teachers.noClassesDesc")}
      emptyTitle={t("teachers.noClassesTitle")}
      emptyIcon={BookOpen}
    >
      <TeachersClassesList data={data?.data} />
      <Paginate meta={data?.meta} />
    </DataShow>
  );
};

export default TeachersClassesTab;
