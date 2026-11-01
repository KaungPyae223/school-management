import { useTranslation } from "react-i18next";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { Tabs } from "../../../components/ui/tabs";
import { UserRoundPen } from "lucide-react";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import TeachersHeader from "../components/list/TeachersHeader";
import TeachersGrid from "../components/list/TeachersGrid";
import TeachersList from "../components/list/TeachersList";
import DataShow from "../../../components/data/DataShow";
import { useGetAllTeachers } from "../hooks/api/useGetAllTeachers";
import TeachersTour from "../tour/TeachersTour";

const TeachersPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("teachers.title"),
  });

  const { view, changeView } = useViewTabChange();

  const { data, isLoading } = useGetAllTeachers();

  return (
    <>
      <TeachersTour />
      <Tabs
        value={view}
        onValueChange={changeView}
        className="space-y-4 flex-1"
      >
        <TeachersHeader tab={view} />
        <DataShow
          isLoading={isLoading}
          dataLength={data?.data.length}
          emptyDescription={t("teachers.noTeachersDesc")}
          emptyTitle={t("teachers.noTeachersTitle")}
          emptyIcon={UserRoundPen}
          action={{
            label: t("teachers.addTeacher"),
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
        </DataShow>
      </Tabs>
    </>
  );
};

export default TeachersPage;
