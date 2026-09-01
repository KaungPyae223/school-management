import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TableHeadType } from "../../../../types/TableHeader";
import Table from "../../../../components/table/Table";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableBody from "../../../../components/table/TableBody";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import {
  BookOpen,
  CreditCard,
  DollarSign,
  DoorOpen,
  LogIn,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { formatCurrency } from "../../../../utils/format-currency";
import { changeTime } from "../../../../utils/change-time";
import { formatDate } from "../../../../utils/format-date";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableActionButton from "../../../../components/table/TableActionButton";
import { useNavigate } from "react-router";
import StudentsEnrolledClassesDeleteAlert from "../alerts/StudentsEnrolledClassesDeleteAlert";
import ClassesEnrollmentWithdrawAlert from "../../../classes/components/alerts/ClassesEnrollmentWithdrawAlert";
import TableIconContent from "../../../../components/table/TableIconContent";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const StudentsEnrolledClassesLists = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [withdrawEnrolledID, setWithdrawEnrolledID] = useState<number>(0);
  const [isWithdrawStatus, setIsWithdrawStatus] = useState<boolean>(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState<boolean>(false);

  const handleWithdraw = (id: number, currentWithdraw: boolean) => {
    setWithdrawEnrolledID(id);
    setIsWithdrawStatus(currentWithdraw);
    setWithdrawDialogOpen(true);
  };

  const headers: TableHeadType[] = [
    {
      title: t("students.table.course"),
      key: "Course",
      sortable: true,
      sortKey: "course_name",
    },
    {
      title: t("students.table.teacher"),
      key: "Teacher",
      sortable: true,
      sortKey: "teacher_name",
    },
    {
      title: t("students.table.price"),
      key: "Price",
      sortable: true,
      sortKey: "price",
      align: "right",
    },
    {
      title: t("students.table.period"),
      key: "Period",
      sortable: true,
      sortKey: "startDate",
    },
    {
      title: t("students.table.time"),
      key: "Time",
      sortable: true,
      sortKey: "startTime",
    },
    {
      title: t("students.table.remaining"),
      key: "Remaining",
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
          {data.map((enrollmentData) => {
            const isWithdraw = Boolean(enrollmentData.withdrawn);

            return (
              <TableRow
                key={enrollmentData.id}
                className={
                  isWithdraw
                    ? "bg-destructive/10 hover:bg-destructive/15 text-muted-foreground"
                    : undefined
                }
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ImageDisplay
                      image={enrollmentData.course_image}
                      alt={enrollmentData.course_name}
                      fallbackIcon={BookOpen}
                      display="list"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {enrollmentData.course_name}
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
                      <p className="text-xs text-muted-foreground">
                        {t("students.batch")}{" "}
                        {replaceLocalDigit(enrollmentData.batch)}
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
                        {t("students.start")}:
                      </span>{" "}
                      {formatDate(enrollmentData.startDate)}
                    </span>

                    <span>
                      <span className="text-xs text-muted-foreground">
                        {t("students.end")}:
                      </span>{" "}
                      {enrollmentData.endDate
                        ? formatDate(enrollmentData.endDate)
                        : t("students.tba")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">
                      {changeTime(enrollmentData.startTime)} -{" "}
                      {changeTime(enrollmentData.endTime)}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-52">
                      {enrollmentData.days
                        .split(",")
                        .map((day: string) => t(`general.days.${day}`))
                        .join(", ")}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(enrollmentData.remainingAmount)}
                </TableCell>

                <TableCell align="right">
                  {formatDate(enrollmentData.createdAt)}
                </TableCell>

                <TableCell>
                  <TableActionButtonsContainer
                    onDelete={() => handleDelete(enrollmentData.enrollment_id)}
                    onView={() => {
                      navigate(`/classes/details/${enrollmentData.id}`);
                    }}
                  >
                    <TableActionButton
                      onClick={() =>
                        handleWithdraw(enrollmentData.enrollment_id, isWithdraw)
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
      <StudentsEnrolledClassesDeleteAlert
        id={enrolledID}
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
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

export default StudentsEnrolledClassesLists;
