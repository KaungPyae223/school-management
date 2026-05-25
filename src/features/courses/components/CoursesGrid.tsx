import CoursesCard from "./CoursesCard";

const CoursesGrid = ({ data }: any) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.map((course: any) => (
        <CoursesCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CoursesGrid;
