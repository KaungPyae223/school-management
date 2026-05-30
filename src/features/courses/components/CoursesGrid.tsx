import CoursesCard from "./CoursesCard";
import CardSort from "../../../components/card-utils/CardSort";

const CoursesGrid = ({ data }: any) => {
  const sortOptions = [
    { field: "name", label: "Name" },
    { field: "price", label: "Price" },
    { field: "students", label: "Students" },
    { field: "teachers", label: "Teachers" },
    { field: "classes", label: "Classes" },
    { field: "active", label: "Active" },
    { field: "createdAt", label: "Created Date" },
    { field: "updatedAt", label: "Last Updated" },
  ];

  return (
    <div>
      <CardSort sortOptions={sortOptions} />
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((course: any) => (
          <CoursesCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesGrid;
