import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { Tabs } from "../../../components/ui/tabs";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { BookOpen } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { AnimatePresence, m } from "framer-motion";
import ClassesHeader from "../components/ClassesHeader";
import ClassesGrid from "../components/ClassesGrid";
import { classService } from "../../../services/classes";
import ClassesList from "../components/ClassesList";
import DataShow from "../../../components/data/DataShow";

const ClassesPage = () => {
  useAddBreadcrumb({
    title: "Classes",
  });

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["classes", activeQueryParams],
    queryFn: () => classService.getAllClasses(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <ClassesHeader tab={view} isTrashView={false} />
      <DataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription="There are no classes available at the moment. Please add a class to get started!"
        emptyTitle="No Classes"
        emptyIcon={BookOpen}
        action={{
          label: "Add Class",
          link: "/classes/create",
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
              <ClassesGrid data={data?.data} />
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
              <ClassesList data={data?.data} />
            </m.div>
          )}
        </AnimatePresence>
        <Paginate meta={data?.meta} />
      </DataShow>
    </Tabs>
  );
};

export default ClassesPage;
