import CoursesCard from "./CoursesCard";

const CoursesGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
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
