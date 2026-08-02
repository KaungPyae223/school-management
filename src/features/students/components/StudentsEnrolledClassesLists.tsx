import { useState } from "react";
import type { TableHeadType } from "../../../types/TableHeader";
import Table from "../../../components/table/Table";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";
import { BookOpen, CreditCard, DollarSign } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import { formatCurrency } from "../../../utils/format-currency";
import { changeTime } from "../../../utils/change-time";
import { formatDate } from "../../../utils/format-date";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import TableActionButton from "../../../components/table/TableActionButton";
import { useNavigate } from "react-router";
import StudentsEnrolledClassesDeleteAlert from "./StudentsEnrolledClassesDeleteAlert";
import TableIconContent from "../../../components/table/TableIconContent";

const StudentsEnrolledClassesLists = ({ data }: { data: any[] }) => {
  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const headers: TableHeadType[] = [
    {
      title: "Course",
      key: "course_name",
      sortable: true,
      sortKey: "course_name",
    },
    {
      title: "Teacher",
      key: "teacher_name",
      sortable: true,
      sortKey: "teacher_name",
    },
    {
      title: "Price",
      key: "price",
      sortable: true,
      sortKey: "price",
      align: "right",
    },
    {
      title: "Period",
      key: "startDate",
      sortable: true,
      sortKey: "startDate",
    },
    {
      title: "Time",
      key: "startTime",
      sortable: true,
      sortKey: "startTime",
    },
    {
      title: "Remaining",
      key: "remainingAmount",
      sortable: true,
      sortKey: "remainingAmount",
      align: "right",
    },
  ];

  const handleDelete = (id: number) => {
    setEnrolledID(id);
    setConfirmDialogOpen(true);
  };

  const navigate = useNavigate();

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={[
            "Course",
            "Teacher",
            "Price",
            "Period",
            "Time",
            "Remaining",
            "Created At",
          ]}
          prefix="e."
        />
        <TableBody>
          {data.map((enrollmentData) => (
            <TableRow key={enrollmentData.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {enrollmentData.course_image ? (
                    <img
                      src={enrollmentData.course_image}
                      alt={enrollmentData.course_name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-foreground/50 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <BookOpen size={20} className="text-background" />
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">
                      {enrollmentData.course_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Batch {enrollmentData.batch}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={enrollmentData.teacher_image}
                      alt={enrollmentData.teacher_name}
                    />
                    <AvatarFallback>
                      {generateImageFallBack(enrollmentData.teacher_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium  line-clamp-1">
                      {enrollmentData.teacher_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {enrollmentData.teacher_email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell align="right">
                <TableIconContent
                  icon={DollarSign}
                  value={formatCurrency(enrollmentData.price)}
                  align="right"
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>
                    <span className="text-xs text-muted-foreground">
                      Start:
                    </span>{" "}
                    {formatDate(enrollmentData.startDate)}
                  </span>

                  <span>
                    <span className="text-xs text-muted-foreground">End:</span>{" "}
                    {enrollmentData.endDate
                      ? formatDate(enrollmentData.endDate)
                      : "TBA"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">
                    {changeTime(enrollmentData.startTime)} -{" "}
                    {changeTime(enrollmentData.endTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {enrollmentData.days
                      .split(",")
                      .map((day) => day.slice(0, 3))
                      .join(", ")}
                  </p>
                </div>
              </TableCell>
              <TableCell align="right">
                {formatCurrency(enrollmentData.remainingAmount)}
              </TableCell>

              <TableCell>{formatDate(enrollmentData.createdAt)}</TableCell>

              <TableCell>
                <TableActionButtonsContainer
                  onDelete={() => handleDelete(enrollmentData.enrollment_id)}
                  onView={() => {
                    navigate(`/classes/details/${enrollmentData.id}`);
                  }}
                >
                  <TableActionButton
                    onClick={() => {}}
                    variant="default"
                    icon={CreditCard}
                    tooltip="Payment History"
                  />
                </TableActionButtonsContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StudentsEnrolledClassesDeleteAlert
        id={enrolledID}
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
      />
    </>
  );
};

export default StudentsEnrolledClassesLists;
