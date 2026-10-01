import { useTranslation } from "react-i18next";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Tabs } from "../../../components/ui/tabs";
import CoursesHeader from "../components/list/CoursesHeader";
import CoursesGrid from "../components/list/CoursesGrid";
import CoursesList from "../components/list/CoursesList";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import { LibraryBig } from "lucide-react";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import DataShow from "../../../components/data/DataShow";
import { useGetAllCourses } from "../hooks/api/useGetAllCourses";
import CoursesTour from "../tour/CoursesTour";

const CoursesPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("courses.title"),
  });

  const { view, changeView } = useViewTabChange();

  const { data, isLoading } = useGetAllCourses();

  return (
    <>
      <CoursesTour />
      <Tabs
        value={view}
        onValueChange={changeView}
        className="space-y-4 flex-1"
      >
        <CoursesHeader tab={view} />
        <DataShow
          isLoading={isLoading}
          dataLength={data?.data.length}
          emptyDescription={t("courses.noCoursesDesc")}
          emptyTitle={t("courses.noCoursesTitle")}
          emptyIcon={LibraryBig}
          action={{
            label: t("courses.addCourse"),
            link: "/courses/create",
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
                <CoursesGrid data={data?.data} />
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
                <CoursesList data={data?.data} />
              </m.div>
            )}
          </AnimatePresence>
          <Paginate meta={data?.meta} />
        </DataShow>
      </Tabs>
    </>
  );
};

export default CoursesPage;
