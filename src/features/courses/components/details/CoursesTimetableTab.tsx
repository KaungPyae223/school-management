import { useState } from "react";
import { useTimetableChange } from "../../../timetable/hooks/views/useTimetableChange";
import { useFormatData } from "../../../timetable/hooks/views/useFormatData";
import TimetableDetailsContent from "../../../timetable/components/views/TimetableDetailsContent";
import { Drawer } from "../../../../components/ui/drawer";
import TimetableTeacher from "../../../timetable/components/teacher/TimetableTeacher";
import { useGetAllClasses } from "../../../classes/hooks/api/useGetAllClasses";

const CoursesTimetableTab = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { params } = useTimetableChange();

  const { data } = useGetAllClasses({
    ...params,
    courseId: id,
  });

  const formattedData = data?.data?.map(useFormatData);

  const handleClassClick = (classData: any) => {
    setClassData(classData);
    setOpen(true);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <TimetableTeacher
        data={formattedData}
        handleClassClick={handleClassClick}
      />
      <TimetableDetailsContent classData={classData} />
    </Drawer>
  );
};

export default CoursesTimetableTab;
