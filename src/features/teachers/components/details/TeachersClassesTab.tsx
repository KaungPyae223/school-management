import { useTranslation } from "react-i18next";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen } from "lucide-react";
import TeachersClassesList from "./TeachersClassesList";
import Paginate from "../../../../components/paginate/Paginate";
import { useGetTeacherClasses } from "../../hooks/api/useGetTeacherClasses";

const TeachersClassesTab = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetTeacherClasses(id);

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
