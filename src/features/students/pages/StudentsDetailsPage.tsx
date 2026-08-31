import { useTranslation } from "react-i18next";
import DetailsHeader from "../../../components/details/DetailsHeader";

import { BookOpen } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import StudentDeleteAlert from "../components/alerts/StudentsDeleteAlert";
import { useState } from "react";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import StudentsDetailsCard from "../components/details/StudentsDetailsCard";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { useAppQuery } from "../../../hooks/use-app-query";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { studentService } from "../../../services/students";
import { Separator } from "../../../components/ui/separator";
import { Card, CardContent } from "../../../components/ui/card";
import SearchInput from "../../../components/search-input/SearchInput";
import Paginate from "../../../components/paginate/Paginate";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import StudentsEnrolledClassesLists from "../components/details/StudentsEnrolledClassesLists";
import DataShow from "../../../components/data/DataShow";

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

  const studentData = useLoaderData();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["students_enrollments", studentData.id, activeQueryParams],
    queryFn: () =>
      studentService.getStudentAttendedClasses({
        ...activeQueryParams,
        id: studentData.id,
      }),
  }) as { data: ResponseDataType; isLoading: boolean };

  console.log(data)

  return (
    <>
      <div className="space-y-6">
        <DetailsHeader
          onDelete={() => {
            setConfirmDialogOpen(true);
          }}
          onUpdate={() => {
            navigate(`/students/edit/${studentData.id}`);
          }}
          isDeleted={false}
        />
        <StudentsDetailsCard data={studentData} />
        <Separator />
        <Card className="shadow-xs">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <SearchInput />
          </CardContent>
        </Card>
        <DataShow
          isLoading={isLoading}
          dataLength={data?.data.length}
          emptyDescription={t("students.noAttendedClassesDesc")}
          emptyTitle={t("students.noAttendedClassesTitle")}
          emptyIcon={BookOpen}
        >
          <StudentsEnrolledClassesLists data={data?.data} />
          <Paginate meta={data?.meta} />
        </DataShow>
      </div>
      <StudentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={studentData.id}
        back
      />
    </>
  );
};

export default StudentsDetailsPage;
