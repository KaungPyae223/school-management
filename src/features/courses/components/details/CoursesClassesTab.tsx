import { useTranslation } from "react-i18next";
import DataShow from "../../../../components/data/DataShow";
import { BookOpen } from "lucide-react";
import Paginate from "../../../../components/paginate/Paginate";
import CoursesClassesList from "./CoursesClassesList";
import { useGetCoursesClasses } from "../../hooks/api/useGetCoursesClasses";

const CoursesClassesTab = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useGetCoursesClasses(id);

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
