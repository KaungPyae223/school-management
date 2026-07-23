import { Card, CardHeader } from "../../../components/ui/card";
import { AnimatePresence, m } from "framer-motion";
import TimetableTeacherSelect from "./TimetableTeacherSelect";
import { TabsList, TabsTrigger } from "../../../components/ui/tabs";

const TimetableHeader = ({ tab }: { tab: string }) => {
  return (
    <Card className="shadow-sm ">
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
              <TimetableTeacherSelect />
            </m.div>
          )}
        </AnimatePresence>
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
        </TabsList>
      </CardHeader>
    </Card>
  );
};

export default TimetableHeader;
