import { useTranslation } from "react-i18next";
import { Tabs } from "../../../components/ui/tabs";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { m, AnimatePresence } from "framer-motion";
import TimetableHeader from "../components/views/TimetableHeader";
import { useFormatData } from "../hooks/views/useFormatData";
import { Drawer } from "../../../components/ui/drawer";

import { useState } from "react";

import TimetableDetailsContent from "../components/views/TimetableDetailsContent";
import TimetableTeacher from "../components/teacher/TimetableTeacher";
import TimetableCourse from "../components/course/TimetableCourse";
import { useTimetableChange } from "../hooks/views/useTimetableChange";
import { useGetAllClasses } from "../../classes/hooks/api/useGetAllClasses";

const TimetablePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("timetable.title"),
  });

  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { view, changeView } = useViewTabChange("courses");

  const { params } = useTimetableChange();

  const { data } = useGetAllClasses(params);

  const formattedData = data?.data?.map(useFormatData);

  const handleClassClick = (classData: any) => {
    setClassData(classData);
    setOpen(true);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <Tabs
        value={view}
        onValueChange={changeView}
        defaultValue="courses"
        className="space-y-4"
      >
        <TimetableHeader tab={view} />

        <AnimatePresence mode="wait" initial={false}>
          {view === "courses" && (
            <m.div
              key="weekly"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TimetableCourse
                data={formattedData}
                handleClassClick={handleClassClick}
              />
            </m.div>
          )}
          {view === "teachers" && (
            <m.div
              key="teachers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TimetableTeacher
                data={formattedData}
                handleClassClick={handleClassClick}
              />
            </m.div>
          )}
        </AnimatePresence>
      </Tabs>
      <TimetableDetailsContent classData={classData} />
    </Drawer>
  );
};

export default TimetablePage;
