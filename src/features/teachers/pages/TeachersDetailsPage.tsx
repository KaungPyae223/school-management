import { useTranslation } from "react-i18next";
import { useLoaderData, useNavigate } from "react-router";
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

  const teacherData = useLoaderData();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);

  const { view, changeView } = useViewTabChange("classes");

  return (
    <>
      <div className="space-y-6">
        <DetailsHeader
          onDelete={() => {
            setDeleteConfirmDialogOpen(true);
          }}
          onUpdate={() => {
            navigate(`/teachers/edit/${teacherData.id}`);
          }}
          onRestore={() => {
            setRestoreConfirmDialogOpen(true);
          }}
          isDeleted={teacherData.deleted}
        />
        <TeachersDetailsCard data={teacherData} />
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
                <TeachersClassesTab id={teacherData.id} />
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
                <TeachersTimetableTab id={teacherData.id} />
              </m.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>

      <TeachersDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={teacherData.id}
        back
      />
      <TeachersRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={teacherData.id}
        back
      />
    </>
  );
};

export default TeachersDetailsPage;
