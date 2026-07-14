import CardSort from "../../../components/card-utils/CardSort";
import ClassesCard from "./ClassesCard";

const ClassesGrid = ({ data }: { data: any[] }) => {
  const sortOptions = [
    { field: "course_name", label: "Name" },
    { field: "teacher_name", label: "Teacher" },
    { field: "cl.price", label: "Price" },
    { field: "total_students", label: "Total Students" },
    { field: "cl.startTime", label: "Time" },
    { field: "cl.startDate", label: "Start Date" },
    { field: "cl.endDate", label: "End Date" },
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
