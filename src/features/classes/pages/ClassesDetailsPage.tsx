import { useTranslation } from "react-i18next";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useNavigate, useParams } from "react-router";
import DetailsHeader from "../../../components/details/DetailsHeader";
import { Separator } from "../../../components/ui/separator";

import ClassesDetailsCard from "../components/details/ClassesDetailsCard";
import ClassesDeleteAlert from "../components/alerts/ClassesDeleteAlert";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { GraduationCap, UserPlus } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

import { useAppQuery } from "../../../hooks/use-app-query";
import { classService } from "../../../services/classes";
import ClassesEnrolledStudentsList from "../components/details/ClassesEnrolledStudentsList";
import SearchInput from "../../../components/search-input/SearchInput";
import ClassesCompleteAlert from "../components/alerts/ClassesCompleteAlert";
import LoadingComponent from "../../../components/loading/LoadingComponent";

const ClassesDetailsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("classes.detailsTitle"),
    params: [
      {
        name: t("classes.title"),
        link: "/classes",
      },
      {
        name: t("classes.detailsBreadcrumb"),
        link: "/classes/details",
      },
    ],
  });

  const { classId } = useParams();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [completeConfirmDialogOpen, setCompleteConfirmDialogOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { data, isLoading } = useAppQuery({
    queryKey: ["classes-details", Number(classId)],
    queryFn: () => classService.getClassDetails(Number(classId)),
  }) as { data: any; isLoading: boolean };

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
                navigate(`/classes/edit/${classId}`);
              }}
              isDeleted={false}
            >
              {data?.data.status == "ongoing" && (
                <Button
                  variant="outline"
                  onClick={() => setCompleteConfirmDialogOpen(true)}
                >
                  <GraduationCap className="size-3.5" />
                  {t("classes.completeClass")}
                </Button>
              )}
              {data?.data.status != "complete" && (
                <Button
                  variant="default"
                  onClick={() => navigate(`/classes/enroll/${classId}`)}
                >
                  <UserPlus className="size-3.5" />
                  {t("classes.enrolledStudent")}
                </Button>
              )}
            </DetailsHeader>
            <ClassesDetailsCard classData={data?.data} />
          </>
        )}
        <Separator />
        <Card className="shadow-xs">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <SearchInput />
          </CardContent>
        </Card>
        <ClassesEnrolledStudentsList classId={Number(classId)} />
      </div>

      <ClassesDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={Number(classId)}
        back
      />
      <ClassesCompleteAlert
        confirmDialogOpen={completeConfirmDialogOpen}
        setConfirmDialogOpen={setCompleteConfirmDialogOpen}
        id={Number(classId)}
        back
      />
    </>
  );
};

export default ClassesDetailsPage;
