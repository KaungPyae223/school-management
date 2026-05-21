import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Tabs } from "../../../components/ui/tabs";
import CoursesHeader from "../components/CoursesHeader";
import CoursesGrid from "../components/CoursesGrid";
import CoursesList from "../components/CoursesList";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import { useNavigate } from "react-router";
import { LibraryBig } from "lucide-react";

const CoursesPage = () => {
  useAddBreadcrumb({
    title: "Courses",
  });

  const [tab, setTab] = useState("grid");
  const navigate = useNavigate();

  const getAllCourses = async () => {
    const data = await window.api.getAllCourses({
      page: 1,
      limit: 10,
      search: "",
      sort: "createdAt",
      order: "desc",
    });

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
      <CoursesHeader />
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
            {tab === "grid" && (
              <m.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CoursesGrid />
              </m.div>
            )}

            {tab === "list" && (
              <m.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CoursesList />
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
