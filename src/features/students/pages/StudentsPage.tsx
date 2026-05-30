import { useNavigate } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { Tabs } from "../../../components/ui/tabs";
import StudentsHeader from "../components/StudentsHeader";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useAppQuery } from "../../../hooks/use-app-query";
import { courseService } from "../../../services/courses";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import { LibraryBig } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import StudentsGrid from "../components/StudentsGrid";

const StudentsPage = () => {
  useAddBreadcrumb({
    title: "Students",
  });

  const navigate = useNavigate();

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["courses", activeQueryParams],
    queryFn: () => courseService.getAllCourses(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <StudentsHeader tab={view} />
      {isLoading ? (
        <LoadingComponent />
      ) : data?.data.length === 0 ? (
        <EmptyComponent
          action={{
            label: "Add Course",
            onClick: () => {
              navigate("/students/create");
            },
          }}
          description="There are no students available at the moment. Please add a student to get started!"
          title="No Students"
          icon={LibraryBig}
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
              ></m.div>
            )}
          </AnimatePresence>
          <Paginate meta={data?.meta} />
        </>
      )}
    </Tabs>
  );
};

export default StudentsPage;
