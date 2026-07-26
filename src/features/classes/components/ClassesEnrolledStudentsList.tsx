import { CreditCard } from "lucide-react";
import Table from "../../../components/table/Table";
import TableActionButton from "../../../components/table/TableActionButton";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableRow from "../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import type { TableHeadType } from "../../../types/TableHeader";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import ClassesEnrollmentDeleteAlert from "./ClassesEnrollmentDeleteAlert";
import { useState } from "react";

const ClassesEnrolledStudentsList = ({ data }: { data: any }) => {
  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const headers: TableHeadType[] = [
    {
      title: "Name",
      key: "name",
      sortable: true,
      sortKey: "studentName",
    },
    {
      title: "Phone",
      key: "phone",
      sortable: true,
      sortKey: "studentPhone",
    },
    {
      title: "Email",
      key: "totalStudents",
      sortable: true,
      sortKey: "studentEmail",
    },
    {
      title: "Paid Amount",
      key: "paidAmount",
      sortable: true,
      sortKey: "paidAmount",
      align: "right",
    },
    {
      title: "Remaining Amount",
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

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={[
            "Name",
            "Phone",
            "Email",
            "Paid Amount",
            "Remaining Amount",
            "Created At",
          ]}
          prefix="e."
        />
        <TableBody>
          {data.map((enrollmentData) => (
            <TableRow key={enrollmentData.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={enrollmentData.image}
                      alt={enrollmentData.studentName}
                    />
                    <AvatarFallback>
                      {generateImageFallBack(enrollmentData.studentName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium  line-clamp-1">
                      {enrollmentData.studentName}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{enrollmentData.studentPhone}</TableCell>
              <TableCell>
                {enrollmentData.studentEmail
                  ? enrollmentData.studentEmail
                  : "N/A"}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(enrollmentData.paidAmount)}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(enrollmentData.remainingAmount)}
              </TableCell>
              <TableCell>{formatDate(enrollmentData.createdAt)}</TableCell>
              <TableCell>
                <TableActionButtonsContainer
                  onDelete={() => handleDelete(enrollmentData.id)}
                  onView={() => {}}
                >
                  {enrollmentData.remainingAmount > 0 && (
                    <TableActionButton
                      onClick={() => {}}
                      variant="default"
                      icon={CreditCard}
                      tooltip="Pay remaining amount"
                    />
                  )}
                </TableActionButtonsContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ClassesEnrollmentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={enrolledID}
      />
    </>
  );
};

export default ClassesEnrolledStudentsList;
