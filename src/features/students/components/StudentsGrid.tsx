import CardSort from "../../../components/card-utils/CardSort";
import StudentsCard from "./StudentsCard";

const StudentsGrid = ({ data }: { data: any[] }) => {
  const sortOptions = [
    { field: "s.name", label: "Name" },
    { field: "s.phone", label: "Phone" },
    { field: "s.email", label: "Email" },
    { field: "s.address", label: "Address" },
    { field: "s.gender", label: "Gender" },
    { field: "s.dob", label: "Date of Birth" },
    { field: "total_classes", label: "Total Classes" },
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
