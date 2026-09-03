import { useTranslation } from "react-i18next";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { Tabs } from "../../../components/ui/tabs";
import { BookOpen } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { AnimatePresence, m } from "framer-motion";
import ClassesHeader from "../components/list/ClassesHeader";
import ClassesGrid from "../components/list/ClassesGrid";
import ClassesList from "../components/list/ClassesList";
import DataShow from "../../../components/data/DataShow";
import ClassesAdvancedQuery from "../components/filters/ClassesAdvancedQuery";
import { useGetAllClasses } from "../hooks/api/useGetAllClasses";

const ClassesPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("classes.title"),
  });

  const { view, changeView } = useViewTabChange();

  const { data, isLoading } = useGetAllClasses();
  
  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <ClassesHeader tab={view} isTrashView={false} />
      <ClassesAdvancedQuery />
      <DataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription={t("classes.noClassesDesc")}
        emptyTitle={t("classes.noClassesTitle")}
        emptyIcon={BookOpen}
        action={{
          label: t("classes.addClass"),
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
