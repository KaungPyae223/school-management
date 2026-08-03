import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData, useNavigate } from "react-router";
import DetailsHeader from "../../../components/details/DetailsHeader";
import { Separator } from "../../../components/ui/separator";

import ClassesDetailsCard from "../components/ClassesDetailsCard";
import ClassesDeleteAlert from "../components/ClassesDeleteAlert";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { GraduationCap, UserPlus } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

import { Badge } from "../../../components/ui/badge";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { enrollmentService } from "../../../services/enrollment";
import ClassesEnrolledStudentsList from "../components/ClassesEnrolledStudentsList";
import Paginate from "../../../components/paginate/Paginate";
import SearchInput from "../../../components/search-input/SearchInput";
import PageDataShow from "../../../components/page/PageDataShow";

const ClassesDetailsPage = () => {
  useAddBreadcrumb({
    title: "Class Details",
    params: [
      {
        name: "Classes",
        link: "/classes",
      },
      {
        name: "Details",
        link: "/classes/details",
      },
    ],
  });

  const classData = useLoaderData();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["classes_enrollments", classData.id, activeQueryParams],
    queryFn: () =>
      enrollmentService.getEnrollmentByClass({
        ...activeQueryParams,
        classId: classData.id,
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
            navigate(`/classes/edit/${classData.id}`);
          }}
          isDeleted={false}
        >
          <Button
            variant="default"
            onClick={() => navigate(`/classes/enroll/${classData.id}`)}
          >
            <UserPlus className="size-3.5" />
            Enrolled Student
          </Button>
        </DetailsHeader>
        <ClassesDetailsCard data={classData} />
        <Separator />
        <Card className="shadow-sm">
          <CardContent className="flex flex-wrap items-center justify-between gap-4">
            <SearchInput />
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-sm font-medium text-muted-foreground">
                Total Students:
              </span>
              <Badge variant="secondary">{classData._count.enrollments}</Badge>
            </div>
          </CardContent>
        </Card>
        <PageDataShow
          isLoading={isLoading}
          dataLength={data?.data.length}
          emptyDescription="There are no enrolled students available at the moment. Please add an enrolled student to get started!"
          emptyTitle="No Enrolled Students"
          emptyIcon={GraduationCap}
          action={{
            label: "Add Student",
            link: `/classes/enroll/${classData.id}`,
          }}
        >
          <ClassesEnrolledStudentsList data={data?.data} />

          <Paginate meta={data?.meta} />
        </PageDataShow>
      </div>

      <ClassesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={classData.id}
        back
      />
    </>
  );
};

export default ClassesDetailsPage;
