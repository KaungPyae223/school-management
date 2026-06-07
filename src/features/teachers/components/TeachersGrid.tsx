import CardSort from "../../../components/card-utils/CardSort";
import TeachersCard from "./TeachersCard";

const TeachersGrid = ({ data }: { data: any[] }) => {
  const sortOptions = [
    { field: "t.name", label: "Name" },
    { field: "t.phone", label: "Phone" },
    { field: "t.email", label: "Email" },
    { field: "t.address", label: "Address" },
    { field: "t.nrc", label: "NRC" },
    { field: "total_classes", label: "Total Classes" },
    { field: "total_students", label: "Total Students" },
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
