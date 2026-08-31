import { CreditCard, DoorOpen, LogIn } from "lucide-react";
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
import { Badge } from "../../../../components/ui/badge";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTranslation } from "react-i18next";
import ClassesEnrollmentDeleteAlert from "../alerts/ClassesEnrollmentDeleteAlert";
import ClassesEnrollmentLeaveAlert from "../alerts/ClassesEnrollmentLeaveAlert";
import { useClassesEnrolledStudents } from "../../hooks/list/useClassesEnrolledStudents";

const ClassesEnrolledStudentsList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const {
    headers,
    enrolledID,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleDelete,
    leaveEnrolledID,
    isLeaveStatus,
    leaveDialogOpen,
    setLeaveDialogOpen,
    handleLeave,
    navigate,
  } = useClassesEnrolledStudents();

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
          {data.map((enrollmentData: any) => {
            const isLeave = Boolean(enrollmentData.leave);

            return (
              <TableRow
                key={enrollmentData.id}
                className={
                  isLeave
                    ? "bg-destructive/10 hover:bg-destructive/15 text-muted-foreground"
                    : undefined
                }
              >
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium line-clamp-1">
                          {enrollmentData.studentName}
                        </p>
                        {isLeave && (
                          <Badge
                            variant="destructive"
                            className="text-[10px] px-1.5 py-0 font-normal"
                          >
                            {t("students.table.leave")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {replaceLocalDigit(enrollmentData.studentPhone)}
                </TableCell>

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

                <TableCell align="right">
                  {formatDate(enrollmentData.createdAt)}
                </TableCell>

                <TableCell>
                  <TableActionButtonsContainer
                    onDelete={() => handleDelete(enrollmentData.id)}
                    onView={() => {
                      navigate(`/students/details/${enrollmentData.studentId}`);
                    }}
                  >
                    <TableActionButton
                      onClick={() => handleLeave(enrollmentData.id, isLeave)}
                      variant={isLeave ? "outline" : "destructive"}
                      icon={isLeave ? LogIn : DoorOpen}
                      tooltip={
                        isLeave
                          ? t("students.table.rejoin")
                          : t("students.table.leave")
                      }
                    />
                    <TableActionButton
                      onClick={() => {
                        navigate(`/payments/${enrollmentData.id}`);
                      }}
                      variant="default"
                      icon={CreditCard}
                      tooltip={t("students.table.paymentHistory")}
                    />
                  </TableActionButtonsContainer>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <ClassesEnrollmentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={enrolledID}
      />

      <ClassesEnrollmentLeaveAlert
        confirmDialogOpen={leaveDialogOpen}
        setConfirmDialogOpen={setLeaveDialogOpen}
        id={leaveEnrolledID}
        isLeave={isLeaveStatus}
      />
    </>
  );
};

export default ClassesEnrolledStudentsList;
