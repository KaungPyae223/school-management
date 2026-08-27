import { useTranslation } from "react-i18next";
import { CreditCard } from "lucide-react";
import Table from "../../../../components/table/Table";
import TableActionButton from "../../../../components/table/TableActionButton";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableRow from "../../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import type { TableHeadType } from "../../../../types/TableHeader";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import ClassesEnrollmentDeleteAlert from "../alerts/ClassesEnrollmentDeleteAlert";
import { useState } from "react";
import { useNavigate } from "react-router";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const ClassesEnrolledStudentsList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const headers: TableHeadType[] = [
    {
      title: t("students.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "studentName",
    },
    {
      title: t("students.fields.phone"),
      key: "Phone",
      sortable: true,
      sortKey: "studentPhone",
    },
    {
      title: t("students.fields.email"),
      key: "Email",
      sortable: true,
      sortKey: "studentEmail",
    },
    {
      title: t("classes.fields.paidAmount"),
      key: "Paid Amount",
      sortable: true,
      sortKey: "paidAmount",
      align: "right",
    },
    {
      title: t("classes.fields.remainingAmount"),
      key: "Remaining Amount",
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
          {data.map((enrollmentData: any) => (
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
              <TableCell>{replaceLocalDigit(enrollmentData.studentPhone)}</TableCell>
              <TableCell>
                {enrollmentData.studentEmail
                  ? enrollmentData.studentEmail
                  : t("students.na")}
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
                  onView={() => {
                    navigate(`/students/details/${enrollmentData.studentId}`);
                  }}
                >
                  <TableActionButton
                    onClick={() => {}}
                    variant="default"
                    icon={CreditCard}
                    tooltip={t("students.table.paymentHistory")}
                  />
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

