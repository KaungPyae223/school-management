import { useState } from "react";
import { useTimetableChange } from "../../../timetable/hooks/views/useTimetableChange";
import { useAppQuery } from "../../../../hooks/use-app-query";
import { classService } from "../../../../services/classes";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import { useFormatData } from "../../../timetable/hooks/views/useFormatData";
import TimetableDetailsContent from "../../../timetable/components/views/TimetableDetailsContent";
import { Drawer } from "../../../../components/ui/drawer";
import TimetableTeacher from "../../../timetable/components/teacher/TimetableTeacher";

const CoursesTimetableTab = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { params } = useTimetableChange();

  const { data: timetableData } = useAppQuery({
    queryKey: ["classes", { ...params, courseId: id }],
    queryFn: () =>
      classService.getAllClasses({
        ...params,
        courseId: id,
      }),
  }) as { data: ResponseDataType };

  const formattedData = timetableData?.data?.map(useFormatData);

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
