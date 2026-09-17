import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { Tabs } from "../../../components/ui/tabs";
import StudentsHeader from "../components/list/StudentsHeader";
import { GraduationCap } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import StudentsGrid from "../components/list/StudentsGrid";
import StudentList from "../components/list/StudentsList";
import DataShow from "../../../components/data/DataShow";

import { useTranslation } from "react-i18next";
import { useGetAllStudents } from "../hooks/api/useGetAllStudents";
import StudentsTour from "../tour/StudentsTour";

const StudentsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("students.title"),
  });

  const { view, changeView } = useViewTabChange();

  const { data, isLoading } = useGetAllStudents();

  return (
    <>
      <StudentsTour />
      <Tabs value={view} onValueChange={changeView} className="space-y-4">
        <StudentsHeader tab={view} />
        <DataShow
          isLoading={isLoading}
          dataLength={data?.data.length}
          emptyDescription={t("students.noStudentsDesc")}
          emptyTitle={t("students.noStudentsTitle")}
          emptyIcon={GraduationCap}
          action={{
            label: t("students.addStudent"),
            link: "/students/create",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {view === "grid" && (
              <m.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StudentsGrid data={data?.data} />
              </m.div>
            )}

            {view === "list" && (
              <m.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StudentList data={data?.data} />
              </m.div>
            )}
          </AnimatePresence>
          <Paginate meta={data?.meta} />
        </DataShow>
      </Tabs>
    </>
  );
};

export default StudentsPage;
