import { useTranslation } from "react-i18next";
import CardSort from "../../../../components/card-utils/CardSort";
import ClassesCard from "./ClassesCard";

const ClassesGrid = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { field: "course_name", label: t("classes.fields.name") },
    { field: "teacher_name", label: t("classes.fields.teacher") },
    { field: "cl.price", label: t("classes.fields.price") },
    { field: "total_students", label: t("classes.fields.totalStudents") },
    { field: "cl.startTime", label: t("classes.fields.time") },
    { field: "cl.startDate", label: t("classes.fields.startDate") },
    { field: "cl.endDate", label: t("classes.fields.endDate") },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} prefix={"c."} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((classData: any) => (
          <ClassesCard key={classData.id} classData={classData} />
        ))}
      </div>
    </div>
  );
};

export default ClassesGrid;
