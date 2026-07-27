import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Tabs } from "../../../components/ui/tabs";
import CoursesHeader from "../components/CoursesHeader";
import CoursesGrid from "../components/CoursesGrid";
import CoursesList from "../components/CoursesList";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";

import { useNavigate } from "react-router";
import { LibraryBig } from "lucide-react";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { courseService } from "../../../services/courses";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import PageDataShow from "../../../components/page/PageDataShow";

const CoursesPage = () => {
  useAddBreadcrumb({
    title: "Courses",
  });

  const { view, changeView } = useViewTabChange();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["courses", activeQueryParams],
    queryFn: () => courseService.getAllCourses(activeQueryParams),
  }) as { data: ResponseDataType; isLoading: boolean };

  return (
    <Tabs value={view} onValueChange={changeView} className="space-y-4">
      <CoursesHeader tab={view} />
      <PageDataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription="There are no courses available at the moment. Please add a course to get started!"
        emptyTitle="No Courses"
        emptyIcon={LibraryBig}
        action={{
          label: "Add Course",
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
      </PageDataShow>
    </Tabs>
  );
};

export default CoursesPage;
