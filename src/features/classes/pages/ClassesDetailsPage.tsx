import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData, useNavigate } from "react-router";
import DetailsHeader from "../../../components/details-header/DetailsHeader";
import { Separator } from "../../../components/ui/separator";

import ClassesDetailsCard from "../components/ClassesDetailsCard";
import ClassesDeleteAlert from "../components/ClassesDeleteAlert";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { GraduationCap, Search, UserPlus, Users } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group";
import { Badge } from "../../../components/ui/badge";
import type { ResponseDataType } from "../../../types/ResponseTypes";
import { useAppQuery } from "../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import { enrollmentService } from "../../../services/enrollment";
import ClassesEnrolledStudentsList from "../components/ClassesEnrolledStudentsList";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import EmptyComponent from "../../../components/empty/EmptyComponent";
import Paginate from "../../../components/paginate/Paginate";

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
    queryKey: ["enrollments", classData.id, activeQueryParams],
    queryFn: () =>
      enrollmentService.getEnrollmentByClass({
        ...activeQueryParams,
        classId: classData.id,
      }),
  }) as { data: ResponseDataType; isLoading: boolean };

  console.log(data);

  return (
    <div className="space-y-6">
      <DetailsHeader
        onDelete={() => {
          setConfirmDialogOpen(true);
        }}
        onUpdate={() => {
          navigate(`classes/edit/${classData.id}`);
        }}
        isTrashView={false}
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
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium text-muted-foreground">
              Total Students:
            </span>
            <Badge variant="secondary">{classData._count.enrollments}</Badge>
          </div>
        </CardContent>
      </Card>
      {isLoading ? (
        <LoadingComponent />
      ) : data?.data.length === 0 ? (
        <EmptyComponent
          action={{
            label: "Add Student",
            onClick: () => {
              navigate(`/classes/enroll/${classData.id}`);
            },
          }}
          description="There are no enrolled students available at the moment. Please add an enrolled student to get started!"
          title="No Enrolled Students"
          icon={GraduationCap}
        />
      ) : (
        <>
          <ClassesEnrolledStudentsList data={data?.data} />

          <Paginate meta={data?.meta} />
        </>
      )}

      <ClassesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={classData.id}
        back
      />
    </div>
  );
};

export default ClassesDetailsPage;
