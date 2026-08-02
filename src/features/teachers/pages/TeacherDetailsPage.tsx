import { useLoaderData, useNavigate } from "react-router";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import { useGetQueryParams } from "../../../hooks/use-get-query-params";
import TeacherDeleteAlert from "../components/TeachersDeleteAlert";
import TeachersDetailsCard from "../components/TeachersDetailsCard";

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

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const { activeQueryParams } = useGetQueryParams();

  
  return (
    <>
      <div className="space-y-6">
        <TeachersDetailsCard data={teacherData} />
      </div>
      <TeacherDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={teacherData.id}
        back
      />
    </>
  );
};

export default TeacherDetailsPage;
