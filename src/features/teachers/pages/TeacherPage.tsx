import { useNavigate } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { Tabs } from "../../../components/ui/tabs";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import { UserRoundPen } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import { teacherService } from "../../../services/teachers";
import TeachersHeader from "../components/TeachersHeader";
import TeachersGrid from "../components/TeachersGrid";
import TeachersList from "../components/TeachersList";

const TeachersPage = () => {
  useAddBreadcrumb({
    title: "Teachers",
  });

  const navigate = useNavigate();

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["teachers", activeQueryParams],
    queryFn: () => teacherService.getAllTeachers(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

 
  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <TeachersHeader tab={view} />
      {isLoading ? (
        <LoadingComponent />
      ) : data?.data.length === 0 ? (
        <EmptyComponent
          action={{
            label: "Add Course",
            onClick: () => {
              navigate("/teachers/create");
            },
          }}
          description="There are no teachers available at the moment. Please add a teacher to get started!"
          title="No Teachers"
          icon={UserRoundPen}
        />
      ) : (
        <>
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
        </>
      )}
    </Tabs>
  );
};

export default TeachersPage;
