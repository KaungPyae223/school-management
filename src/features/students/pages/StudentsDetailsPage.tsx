import DetailsHeader from "../../../components/details/DetailsHeader";

import { BookOpen } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import StudentDeleteAlert from "../components/StudentsDeleteAlert";
import { useState } from "react";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import StudentsDetailsCard from "../components/StudentsDetailsCard";
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
import StudentsEnrolledClassesLists from "../components/StudentsEnrolledClassesLists";

const StudentsDetailsPage = () => {
  useAddBreadcrumb({
    title: "Student Details",
    params: [
      {
        name: "Students",
        link: "/students",
      },
      {
        name: "Details",
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
        <Card className="shadow-sm">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <SearchInput />
          </CardContent>
        </Card>
        {isLoading ? (
          <LoadingComponent />
        ) : data?.data.length === 0 ? (
          <EmptyComponent
            description="There are no attended classes available at the moment. Please add an attended class to get started!"
            title="No Attended Classes"
            icon={BookOpen}
          />
        ) : (
          <>
            <StudentsEnrolledClassesLists data={data?.data} />
            <Paginate meta={data?.meta} />
          </>
        )}
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
