import CardSort from "../../../components/card-utils/CardSort";
import StudentsCard from "./StudentsCard";

const StudentsGrid = ({ data }: any) => {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((student: any) => (
          <StudentsCard />
        ))}
      </div>
    </div>
  );
};

export default StudentsGrid;
