import { useTranslation } from "react-i18next";
import CardSort from "../../../../components/card-utils/CardSort";
import TeachersCard from "./TeachersCard";

const TeachersGrid = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { field: "t.name", label: t("teachers.fields.name") },
    { field: "t.phone", label: t("teachers.fields.phone") },
    { field: "t.email", label: t("teachers.fields.email") },
    { field: "t.address", label: t("teachers.fields.address") },
    { field: "t.nrc", label: t("teachers.fields.nrc") },
    { field: "total_classes", label: t("teachers.totalClasses") },
    { field: "total_students", label: t("teachers.totalStudents") },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} />
      <div className="grid grid-cols-2  gap-4">
        {data?.map((teacher: any) => (
          <TeachersCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeachersGrid;
