import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { Tabs } from "../../../components/ui/tabs";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { UserRoundPen } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import { teacherService } from "../../../services/teachers";
import TeachersHeader from "../components/TeachersHeader";
import TeachersGrid from "../components/TeachersGrid";
import TeachersList from "../components/TeachersList";
import PageDataShow from "../../../components/page/PageDataShow";

const TeachersPage = () => {
  useAddBreadcrumb({
    title: "Teachers",
  });

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["teachers", activeQueryParams],
    queryFn: () => teacherService.getAllTeachers(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <TeachersHeader tab={view} />
      <PageDataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription="There are no teachers available at the moment. Please add a teacher to get started!"
        emptyTitle="No Teachers"
        emptyIcon={UserRoundPen}
        action={{
          label: "Add Teacher",
          link: "/teachers/create",
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
              <TeachersGrid data={data?.data} />
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
              <TeachersList data={data?.data} />
            </m.div>
          )}
        </AnimatePresence>
        <Paginate meta={data?.meta} />
      </PageDataShow>
    </Tabs>
  );
};

export default TeachersPage;
