import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../../../../components/ui/card";
import { AnimatePresence, m } from "framer-motion";
import SearchInput from "../../../../components/search-input/SearchInput";
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import ColumnSelector from "../../../../components/header/ColumnSelector";

const TeachersDetailsHeader = ({ tab }: { tab: string }) => {
  const { t } = useTranslation();

  const columns = [
    { title: t("students.table.course"), key: "Course" },
    { title: t("students.table.price"), key: "Price" },
    { title: t("students.table.period"), key: "Period" },
    { title: t("students.table.time"), key: "Time" },
    { title: t("classes.fields.status"), key: "Status" },
    { title: t("courses.totalStudents"), key: "Total Students" },
    { title: t("courses.withdrawn"), key: "Withdrawn Students" },
    { title: t("teachers.totalRevenue"), key: "Total Revenue" },
    { title: t("classes.fields.remainingAmount"), key: "Remaining Amount" },
  ];

  return (
    <Card className="shadow-xs">
      <CardContent className="flex flex-wrap items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "classes" && (
            <m.div
              key="classes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-row gap-3"
            >
              <SearchInput />
              <ColumnSelector
                columns={columns}
                alwaysSelectedColumns={["Course", "Price", "Period", "Time"]}
                defaultSelectedColumns={[
                  "Course",
                  "Price",
                  "Period",
                  "Time",
                  "Status",
                  "Total Students",
                  "Withdrawn Students",
                  "Created At",
                ]}
              />
            </m.div>
          )}
          {tab === "timetable" && (
            <m.div
              key="timetable"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div></div>
            </m.div>
          )}
        </AnimatePresence>
        <TabsList>
          <TabsTrigger value="classes" data-tour="teacher-classes">
            {t("teachers.classes")}
          </TabsTrigger>
          <TabsTrigger value="timetable" data-tour="teacher-timetable">
            {t("teachers.timetable")}
          </TabsTrigger>
        </TabsList>
      </CardContent>
    </Card>
  );
};

export default TeachersDetailsHeader;
