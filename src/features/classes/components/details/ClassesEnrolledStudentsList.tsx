import {
  CreditCard,
  DoorOpen,
  GraduationCap,
  HandCoins,
  LogIn,
  Mail,
  Phone,
} from "lucide-react";
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
import ClassesEnrollmentWithdrawAlert from "../alerts/ClassesEnrollmentWithdrawAlert";
import { useClassesEnrolledStudents } from "../../hooks/list/useClassesEnrolledStudents";
import { useAppQuery } from "../../../../hooks/use-app-query";
import { useGetQueryParams } from "../../../../hooks/use-get-query-params";
import { enrollmentService } from "../../../../services/enrollment";
import type { ResponseDataType } from "../../../../types/ResponseTypes";
import DataShow from "../../../../components/data/DataShow";
import Paginate from "../../../../components/paginate/Paginate";
import TableIconContent from "../../../../components/table/TableIconContent";

const ClassesEnrolledStudentsList = ({ classId }: { classId: number }) => {
  const { t } = useTranslation();
  const { activeQueryParams } = useGetQueryParams();

  const { data, isLoading } = useAppQuery({
    queryKey: ["classes_enrollments", classId, activeQueryParams],
    queryFn: () =>
      enrollmentService.getEnrollmentByClass({
        ...activeQueryParams,
        classId,
      }),
  }) as { data: ResponseDataType; isLoading: boolean };

  const {
    headers,
    enrolledID,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleDelete,
    withdrawEnrolledID,
    isWithdrawStatus,
    withdrawDialogOpen,
    setWithdrawDialogOpen,
    handleWithdraw,
    navigate,
  } = useClassesEnrolledStudents();

  return (
    <>
      <DataShow
        isLoading={isLoading}
        dataLength={data?.data.length}
        emptyDescription={t("classes.noEnrolledStudentsDesc")}
        emptyTitle={t("classes.noEnrolledStudentsTitle")}
        emptyIcon={GraduationCap}
        action={{
          label: t("students.addStudent"),
          link: `/classes/enroll/${classId}`,
        }}
      >
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
            {data?.data.map((enrollmentData: any) => {
              const isWithdraw = Boolean(enrollmentData.withdrawn);

              return (
                <TableRow
                  key={enrollmentData.id}
                  className={
                    isWithdraw &&
                    "bg-destructive/10 hover:bg-destructive/15 text-muted-foreground"
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
                          {isWithdraw && (
                            <Badge
                              variant="destructive"
                              className="text-[10px] px-1.5 py-0 font-normal"
                            >
                              {t("students.table.withdraw")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <TableIconContent
                      icon={Phone}
                      value={replaceLocalDigit(enrollmentData.studentPhone)}
                      align="right"
                    />
                  </TableCell>

                  <TableCell>
                    <TableIconContent
                      icon={Mail}
                      value={
                        enrollmentData.studentEmail
                          ? replaceLocalDigit(enrollmentData.studentEmail)
                          : t("students.na")
                      }
                      align="right"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <TableIconContent
                      icon={CreditCard}
                      value={replaceLocalDigit(
                        formatCurrency(enrollmentData.paidAmount),
                      )}
                      align="right"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <TableIconContent
                      icon={HandCoins}
                      value={replaceLocalDigit(
                        formatCurrency(enrollmentData.remainingAmount),
                      )}
                      align="right"
                    />
                  </TableCell>

                  <TableCell align="right">
                    {formatDate(enrollmentData.createdAt)}
                  </TableCell>

                  <TableCell>
                    <TableActionButtonsContainer
                      onDelete={() => handleDelete(enrollmentData.id)}
                      onView={() => {
                        navigate(
                          `/students/details/${enrollmentData.studentId}`,
                        );
                      }}
                    >
                      <TableActionButton
                        onClick={() =>
                          handleWithdraw(enrollmentData.id, isWithdraw)
                        }
                        variant={isWithdraw ? "outline" : "destructive"}
                        icon={isWithdraw ? LogIn : DoorOpen}
                        tooltip={
                          isWithdraw
                            ? t("students.table.rejoin")
                            : t("students.table.withdraw")
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

        <Paginate meta={data?.meta} />
      </DataShow>

      <ClassesEnrollmentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={enrolledID}
      />

      <ClassesEnrollmentWithdrawAlert
        confirmDialogOpen={withdrawDialogOpen}
        setConfirmDialogOpen={setWithdrawDialogOpen}
        id={withdrawEnrolledID}
        isWithdraw={isWithdrawStatus}
      />
    </>
  );
};

export default ClassesEnrolledStudentsList;
