import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Tabs } from "../../../components/ui/tabs";
import CoursesHeader from "../components/CoursesHeader";
import CoursesGrid from "../components/CoursesGrid";
import CoursesList from "../components/CoursesList";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import { useNavigate } from "react-router";
import { LibraryBig } from "lucide-react";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { courseService } from "../../../services/courses";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";

const CoursesPage = () => {
  useAddBreadcrumb({
    title: "Courses",
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
      <CoursesHeader tab={view} />
      {isLoading ? (
        <LoadingComponent />
      ) : data?.data.length === 0 ? (
        <EmptyComponent
          action={{
            label: "Add Course",
            onClick: () => {
              navigate("/courses/create");
            },
          }}
          description="There are no courses available at the moment. Please add a course to get started!"
          title="No Courses"
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
        </>
      )}
    </Tabs>
  );
};

export default CoursesPage;
