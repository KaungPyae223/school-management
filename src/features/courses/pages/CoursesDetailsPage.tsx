import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
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
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useGetCourseDetails } from "../hooks/api/useGetCourseDetails";

const CoursesDetailsPage = () => {
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
        link: "/courses/details",
      },
    ],
  });

  const { courseId } = useParams();

  const navigate = useNavigate();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);

  const { view, changeView } = useViewTabChange("classes");

  const { data, isLoading } = useGetCourseDetails(Number(courseId));

  return (
    <>
      <div className="space-y-6">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <DetailsHeader
              onDelete={() => {
                setDeleteConfirmDialogOpen(true);
              }}
              onUpdate={() => {
                navigate(`/courses/edit/${courseId}`);
              }}
              onRestore={() => {
                setRestoreConfirmDialogOpen(true);
              }}
              isDeleted={data?.data.deleted}
            />
            <CoursesDetailsCard courseData={data?.data} />
          </>
        )}

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
                <CoursesClassesTab id={Number(courseId)} />
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
                <CoursesTimetableTab id={Number(courseId)} />
              </m.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
      <CoursesDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={Number(courseId)}
        back
      />
      <CoursesRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={Number(courseId)}
        back
      />
    </>
  );
};

export default CoursesDetailsPage;
