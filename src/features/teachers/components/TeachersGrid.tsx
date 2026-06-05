import CardSort from "../../../components/card-utils/CardSort";
import TeachersCard from "./TeachersCard";

const TeachersGrid = ({ data }: any) => {
  const sortOptions = [
    { field: "name", label: "Name" },
    { field: "age", label: "Age" },
    { field: "gender", label: "Gender" },
    { field: "class", label: "Class" },
    { field: "admissionNo", label: "Admission No" },
    { field: "dateOfBirth", label: "Date of Birth" },
    { field: "createdAt", label: "Created Date" },
    { field: "updatedAt", label: "Last Updated" },
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
