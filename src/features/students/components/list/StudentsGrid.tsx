import { useTranslation } from "react-i18next";
import CardSort from "../../../../components/card-utils/CardSort";
import StudentsCard from "./StudentsCard";
import StudentsList from "./StudentsList";

const StudentsGrid = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();

  const sortOptions = [
    { field: "s.name", label: t("students.fields.name") },
    { field: "s.phone", label: t("students.fields.phone") },
    { field: "s.email", label: t("students.fields.email") },
    { field: "s.address", label: t("students.fields.address") },
    { field: "s.gender", label: t("students.fields.gender") },
    { field: "s.dob", label: t("students.fields.dob") },
    { field: "total_classes", label: t("students.totalClasses") },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} prefix="s." />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((student: any) => (
          <StudentsCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default StudentsGrid;
