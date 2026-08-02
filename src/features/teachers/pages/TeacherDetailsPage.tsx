import { useLoaderData, useNavigate } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import TeachersDeleteAlert from "../components/TeachersDeleteAlert";
import TeachersDetailsCard from "../components/TeachersDetailsCard";
import DetailsHeader from "../../../components/details/DetailsHeader";
import TeachersRestoreAlert from "../components/TeachersRestoreAlert";
import { Separator } from "../../../components/ui/separator";
import { useViewTabChange } from "../../../hooks/use-view-tab-change";
import { Tabs } from "../../../components/ui/tabs";
import { AnimatePresence, m } from "framer-motion";
import TeachersDetailsHeader from "../components/TeachersDetailsHeader";
import TimetableCourse from "../../timetable/components/TimetableCourse";
import { classesService } from "../../../services/classes";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useTimetableChange } from "../../timetable/hooks/useTimetableChange";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useFormatData } from "../../timetable/hooks/useFormatData";
import { Drawer } from "../../../components/ui/drawer";
import TimetableDetailsContent from "../../timetable/components/TimetableDetailsContent";

const TeacherDetailsPage = () => {
  useAddBreadcrumb({
    title: "Teacher Details",
    params: [
      {
        name: "Teachers",
        link: "/teachers",
      },
      {
        name: "Details",
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

  const [open, setOpen] = useState(false);
  const [classData, setClassData] = useState<any>(null);

  const { view, changeView } = useViewTabChange("classes");

  const { params: timetableParams } = useTimetableChange();

  const { data: timetableData } = useAppQuery({
    queryKey: ["classes", { ...timetableParams, teacherId: teacherData.id }],
    queryFn: () =>
      classesService.getAllClasses({
        ...timetableParams,
        teacherId: teacherData.id,
      }),
  }) as { data: ResponseDataType };

  const formattedData = timetableData?.data?.map(useFormatData);

  const handleClassClick = (classData: any) => {
    setClassData(classData);
    setOpen(true);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
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
                >
                  <div></div>
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
                  <TimetableCourse
                    data={formattedData}
                    handleClassClick={handleClassClick}
                  />
                </m.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
        <TimetableDetailsContent classData={classData} />
      </Drawer>
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

export default TeacherDetailsPage;
