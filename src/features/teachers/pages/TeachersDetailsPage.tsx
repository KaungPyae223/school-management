import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import TeachersDeleteAlert from "../components/alerts/TeachersDeleteAlert";
import TeachersDetailsCard from "../components/details/TeachersDetailsCard";
import DetailsHeader from "../../../components/details/DetailsHeader";
import TeachersRestoreAlert from "../components/alerts/TeachersRestoreAlert";
import { Separator } from "../../../components/ui/separator";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { Tabs } from "../../../components/ui/tabs";
import { AnimatePresence, m } from "framer-motion";
import TeachersDetailsHeader from "../components/details/TeachersDetailsHeader";
import TeachersClassesTab from "../components/details/TeachersClassesTab";
import TeachersTimetableTab from "../components/details/TeachersTimetableTab";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useGetTeacherDetails } from "../hooks/api/useGetTeacherDetails";
import TeachersDetailsTour from "../tour/TeachersDetailsTour";

const TeachersDetailsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("teachers.detailsTitle"),
    params: [
      {
        name: t("teachers.title"),
        link: "/teachers",
      },
      {
        name: t("teachers.detailsBreadcrumb"),
        link: "/teachers/details",
      },
    ],
  });

  const navigate = useNavigate();

  const { teacherId } = useParams();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);

  const { view, changeView } = useViewTabChange("classes");

  const { data, isLoading } = useGetTeacherDetails(Number(teacherId));

  return (
    <>
      <TeachersDetailsTour />
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
                navigate(`/teachers/edit/${teacherId}`);
              }}
              onRestore={() => {
                setRestoreConfirmDialogOpen(true);
              }}
              isDeleted={data?.data.deleted}
            />
            <TeachersDetailsCard teacherData={data?.data} />
          </>
        )}

        <Separator />
        <Tabs
          value={view}
          onValueChange={changeView}
          defaultValue="classes"
          className="space-y-6"
        >
          <TeachersDetailsHeader tab={view} />
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
                <TeachersClassesTab id={Number(teacherId)} />
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
                <TeachersTimetableTab id={Number(teacherId)} />
              </m.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>

      <TeachersDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={Number(teacherId)}
        back
      />
      <TeachersRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={Number(teacherId)}
        back
      />
    </>
  );
};

export default TeachersDetailsPage;
