import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { Tabs } from "../../../components/ui/tabs";
import StudentsHeader from "../components/StudentsHeader";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { GraduationCap } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import StudentsGrid from "../components/StudentsGrid";
import StudentList from "../components/StudentsList";
import { studentService } from "../../../services/students";
import PageDataShow from "../../../components/page/PageDataShow";

const StudentsPage = () => {
  useAddBreadcrumb({
    title: "Students",
  });

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["students", activeQueryParams],
    queryFn: () => studentService.getAllStudents(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <StudentsHeader tab={view} />
      <PageDataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription="There are no students available at the moment. Please add a student to get started!"
        emptyTitle="No Students"
        emptyIcon={GraduationCap}
        action={{
          label: "Add Student",
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
      </PageDataShow>
    </Tabs>
  );
};

export default StudentsPage;
