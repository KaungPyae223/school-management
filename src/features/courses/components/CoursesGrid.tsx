import CoursesCard from "./CoursesCard";

const CoursesGrid = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
      <CoursesCard />
    </div>
  );
};

export default CoursesGrid;
