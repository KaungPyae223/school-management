import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import DetailsHeader from "../../../components/details/DetailsHeader";
import CoursesDeleteAlert from "../components/alerts/CoursesDeleteAlert";
import CoursesRestoreAlert from "../components/alerts/CoursesRestoreAlert";
import CoursesDetailsCard from "../components/details/CoursesDetailsCard";
import { Separator } from "../../../components/ui/separator";
import { Tabs } from "../../../components/ui/tabs";
import CoursesDetailsHeader from "../components/details/CoursesDetailsHeader";
import { AnimatePresence, m } from "framer-motion";
import CoursesTimetableTab from "../components/details/CoursesTimetableTab";
import CoursesClassesTab from "../components/details/CoursesClassesTab";

const CoursesDetailPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("courses.detailsTitle"),
    params: [
      {
        name: t("courses.title"),
        link: "/courses",
      },
      {
        name: t("courses.detailsBreadcrumb"),
        link: "/courses/detail",
      },
    ],
  });

  const navigate = useNavigate();

  const courseData = useLoaderData();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);

  const { view, changeView } = useViewTabChange("classes");

  console.log(courseData);

  return (
    <>
      <div className="space-y-6">
        <DetailsHeader
          onDelete={() => {
            setDeleteConfirmDialogOpen(true);
          }}
          onUpdate={() => {
            navigate(`/courses/edit/${courseData.id}`);
          }}
          onRestore={() => {
            setRestoreConfirmDialogOpen(true);
          }}
          isDeleted={courseData.deleted}
        />
        <CoursesDetailsCard data={courseData} />
        <Separator />
        <Tabs
          value={view}
          onValueChange={changeView}
          defaultValue="classes"
          className="space-y-6"
        >
          <CoursesDetailsHeader tab={view} />
          <AnimatePresence mode="wait" initial={false}>
            {view === "classes" && (
              <m.div
                key="classes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <CoursesClassesTab id={courseData.id} />
              </m.div>
            )}
            {view === "timetable" && (
              <m.div
                key="timetable"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CoursesTimetableTab id={courseData.id} />
              </m.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
      <CoursesDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={courseData.id}
        back
      />
      <CoursesRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={courseData.id}
        back
      />
    </>
  );
};

export default CoursesDetailPage;
