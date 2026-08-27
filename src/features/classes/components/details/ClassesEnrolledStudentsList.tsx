import { CreditCard } from "lucide-react";
import Table from "../../../../components/table/Table";
import TableActionButton from "../../../../components/table/TableActionButton";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableRow from "../../../../components/table/TableRow";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import ClassesEnrollmentDeleteAlert from "../alerts/ClassesEnrollmentDeleteAlert";
import { useClassesEnrolledStudents } from "../../hooks/list/useClassesEnrolledStudents";

const ClassesEnrolledStudentsList = ({ data }: { data: any }) => {
  const {
    headers,
    enrolledID,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleDelete,
    navigate,
    t,
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
                    <p className="text-sm font-medium line-clamp-1">
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
