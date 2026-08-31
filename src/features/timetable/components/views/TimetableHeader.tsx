import { useTranslation } from "react-i18next";
import { Card, CardHeader } from "../../../../components/ui/card";
import { AnimatePresence, m } from "framer-motion";
import TimetableTeacherSelect from "../teacher/TimetableTeacherSelect";
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import TimetableCourseSelect from "../course/TimetableCourseSelect";

const TimetableHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  return (
    <Card className="shadow-xs ">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "teachers" && (
            <m.div
              key="teachers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TimetableTeacherSelect />
            </m.div>
          )}
          {tab === "courses" && (
            <m.div
              key="courses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TimetableCourseSelect />
            </m.div>
          )}
        </AnimatePresence>
        <TabsList>
          <TabsTrigger value="courses">{t("timetable.courses")}</TabsTrigger>
          <TabsTrigger value="teachers">{t("timetable.teachers")}</TabsTrigger>
        </TabsList>
      </CardHeader>
    </Card>
  );
};

export default TimetableHeader;
