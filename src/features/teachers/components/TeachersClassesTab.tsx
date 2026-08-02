import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import PageDataShow from "../../../components/page/PageDataShow";
import { BookOpen } from "lucide-react";
import TeachersClassesList from "./TeachersClassesList";
import { teacherService } from "../../../services/teachers";
import Paginate from "../../../components/paginate/Paginate";

const TeachersClassesTab = ({ id }: { id: number }) => {
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
    <PageDataShow
      isLoading={isLoading}
      dataLength={data?.data.length}
      emptyDescription="There are no classes taken by this teacher. Please assign a class to this teacher to get started!"
      emptyTitle="No Classes"
      emptyIcon={BookOpen}
    >
      <TeachersClassesList data={data?.data} />
      <Paginate meta={data?.meta} />
    </PageDataShow>
  );
};

export default TeachersClassesTab;
