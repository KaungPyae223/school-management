import { useTranslation } from "react-i18next";
import CoursesCard from "./CoursesCard";
import CardSort from "../../../../components/card-utils/CardSort";

const CoursesGrid = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { field: "c.name", label: t("courses.fields.name") },
    { field: "c.price", label: t("courses.fields.price") },
    { field: "total_students", label: t("courses.totalStudents") },
    { field: "withdrawn_students", label: "Withdrawn Students" },
    { field: "total_teachers", label: t("courses.teachers") },
    { field: "total_classes", label: t("courses.classes") },
    { field: "total_active_classes", label: t("courses.active") },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} prefix={"c."} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((course: any) => (
          <CoursesCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
