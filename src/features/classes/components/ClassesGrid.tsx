import CardSort from "../../../components/card-utils/CardSort";
import ClassesCard from "./ClassesCard";

const ClassesGrid = ({ data }: { data: any[] }) => {
  const sortOptions = [
    { field: "c.name", label: "Name" },
    { field: "c.price", label: "Price" },
    { field: "total_enrollments", label: "Enrollments" },
    { field: "total_teachers", label: "Teachers" },
    { field: "total_classes", label: "Classes" },
    { field: "total_active_classes", label: "Active" },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} prefix={"c."} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((course: any) => (
          <ClassesCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default ClassesGrid;
