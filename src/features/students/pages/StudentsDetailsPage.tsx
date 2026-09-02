import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import StudentDeleteAlert from "../components/alerts/StudentsDeleteAlert";
import { useState } from "react";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import StudentsDetailsCard from "../components/details/StudentsDetailsCard";
import { Separator } from "../../../components/ui/separator";
import { Card, CardContent } from "../../../components/ui/card";
import SearchInput from "../../../components/search-input/SearchInput";
import StudentsEnrolledClassesLists from "../components/details/StudentsEnrolledClassesLists";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import { useGetStudentDetails } from "../hooks/api/useGetStudentDetails";
import DetailsHeader from "../../../components/details/DetailsHeader";

const StudentsDetailsPage = () => {
  const { t } = useTranslation();

  useAddBreadcrumb({
    title: t("students.detailsTitle"),
    params: [
      {
        name: t("students.title"),
        link: "/students",
      },
      {
        name: t("students.detailsBreadcrumb"),
        link: "/students/details",
      },
    ],
  });

  const navigate = useNavigate();

  const { studentId } = useParams();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetStudentDetails(Number(studentId));

  return (
    <>
      <div className="space-y-6">
        <DetailsHeader
          onDelete={() => {
            setConfirmDialogOpen(true);
          }}
          onUpdate={() => {
            navigate(`/students/edit/${studentId}`);
          }}
        />
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <StudentsDetailsCard data={data?.data} />
        )}
        <Separator />
        <Card className="shadow-xs">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <SearchInput />
          </CardContent>
        </Card>

        <StudentsEnrolledClassesLists studentId={Number(studentId)} />
      </div>
      <StudentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={Number(studentId)}
        back
      />
    </>
  );
};

export default StudentsDetailsPage;
