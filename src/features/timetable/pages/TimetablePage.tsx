import { useTranslation } from "react-i18next";
import { Tabs } from "../../../components/ui/tabs";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { m, AnimatePresence } from "framer-motion";
import { useAppQuery } from "../../../hooks/use-app-query";
import { classService } from "../../../services/classes";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import TimetableHeader from "../components/TimetableHeader";
import { useFormatData } from "../hooks/useFormatData";
import { Drawer } from "../../../components/ui/drawer";

import { useState } from "react";

import TimetableDetailsContent from "../components/TimetableDetailsContent";
import TimetableTeacher from "../components/TimetableTeacher";
import TimetableCourse from "../components/TimetableCourse";
import { useTimetableChange } from "../hooks/useTimetableChange";

const TimetablePage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("timetable.title"),
  });

  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { view, changeView } = useViewTabChange("courses");

  const { params } = useTimetableChange();

  const { data } = useAppQuery({
    queryKey: ["classes", params],
    queryFn: () => classService.getAllClasses(params),
  }) as { data: ResponseDataType };

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
