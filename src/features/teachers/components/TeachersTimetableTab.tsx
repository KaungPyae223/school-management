import { useState } from "react";
import { useTimetableChange } from "../../timetable/hooks/useTimetableChange";
import { useAppQuery } from "../../../hooks/use-app-query";
import { classesService } from "../../../services/classes";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useFormatData } from "../../timetable/hooks/useFormatData";
import TimetableCourse from "../../timetable/components/TimetableCourse";
import TimetableDetailsContent from "../../timetable/components/TimetableDetailsContent";
import { Drawer } from "../../../components/ui/drawer";

const TeachersTimetableTab = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { params } = useTimetableChange();

  const { data: timetableData } = useAppQuery({
    queryKey: ["classes", { ...params, teacherId: id }],
    queryFn: () =>
      classesService.getAllClasses({
        ...params,
        teacherId: id,
      }),
  }) as { data: ResponseDataType };

  const formattedData = timetableData?.data?.map(useFormatData);

  const handleClassClick = (classData: any) => {
    setClassData(classData);
    setOpen(true);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <TimetableCourse
        data={formattedData}
        handleClassClick={handleClassClick}
      />
      <TimetableDetailsContent classData={classData} />
    </Drawer>
  );
};

export default TeachersTimetableTab;
