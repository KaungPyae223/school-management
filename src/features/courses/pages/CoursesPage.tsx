import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { Tabs } from "../../../components/ui/tabs";
import CoursesHeader from "../components/CoursesHeader";
import CoursesGrid from "../components/CoursesGrid";
import CoursesList from "../components/CoursesList";
import Paginate from "../../../components/paginate/Paginate";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CoursesPage = () => {
  useAddBreadcrumb({
    title: "Courses",
  });

  const [tab, setTab] = useState("grid");

  return (
    <Tabs value={tab} onValueChange={setTab} className="space-y-4">
      <CoursesHeader />
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
      <Paginate meta={{ page: 3, limit: 10, total_pages: 5, total_data: 10 }} />
    </Tabs>
  );
};

export default CoursesPage;
