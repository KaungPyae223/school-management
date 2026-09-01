import {
  BookOpen,
  CalendarCheck2,
  CalendarOff,
  Clock,
  DoorOpen,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import Table from "../../../../components/table/Table";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableRow from "../../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableActionButton from "../../../../components/table/TableActionButton";
import TableIconContent from "../../../../components/table/TableIconContent";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import CardDayBadge from "../../../../components/card-utils/CardDayBadge";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { changeTime } from "../../../../utils/change-time";
import { useTranslation } from "react-i18next";
import ClassesDeleteAlert from "../alerts/ClassesDeleteAlert";
import ClassesStatus from "../shared/ClassesStatus";
import { useClassesList } from "../../hooks/list/useClassesList";

const ClassesList = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const {
    headers,
    selectedColumns,
    confirmDialogOpen,
    setConfirmDialogOpen,
    classId,
    handleDelete,
    navigate,
  } = useClassesList();

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={selectedColumns}
          prefix="s."
        />
        <TableBody>
          {data.map((classData) => (
            <TableRow key={classData.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <ImageDisplay
                    image={classData.course_image}
                    alt={classData.course_name}
                    fallbackIcon={BookOpen}
                    display="list"
                  />
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">
                      {classData.course_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("classes.batch", {
                        batch: replaceLocalDigit(classData.batch),
                      })}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Teacher")}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={classData.teacher_image}
                      alt={classData.teacher_name}
                    />
                    <AvatarFallback>
                      {generateImageFallBack(classData.teacher_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium line-clamp-1">
                      {classData.teacher_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {classData.teacher_email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell
                hidden={!selectedColumns.includes("Total Students")}
                align="right"
              >
                <TableIconContent
                  align="right"
                  icon={GraduationCap}
                  value={replaceLocalDigit(classData.total_students)}
                />
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Withdrawn")}
                align="right"
              >
                <TableIconContent
                  align="right"
                  icon={DoorOpen}
                  value={replaceLocalDigit(classData.withdrawn_students)}
                />
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Days")}
                className="space-x-1 max-w-52"
              >
                {classData.days.split(",").map((day: string) => (
                  <CardDayBadge day={day} key={day} />
                ))}
              </TableCell>

              <TableCell
                hidden={!selectedColumns.includes("Price")}
                align="right"
              >
                {formatCurrency(classData.price)}
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Status")}>
                <ClassesStatus status={classData.status} />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Time")}>
                <TableIconContent
                  icon={Clock}
                  value={`${changeTime(classData.startTime)} - ${changeTime(classData.endTime)}`}
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Start Date")}>
                <TableIconContent
                  icon={CalendarCheck2}
                  value={formatDate(classData.startDate)}
                  iconClassName="text-blue-600 dark:text-blue-400"
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("End Date")}>
                <TableIconContent
                  icon={CalendarOff}
                  value={
                    classData.endDate
                      ? formatDate(classData.endDate)
                      : t("students.tba")
                  }
                  iconClassName="text-red-600 dark:text-red-400"
                />
              </TableCell>

              <TableCell
                align="right"
                hidden={!selectedColumns.includes("Created At")}
              >
                {formatDate(classData.createdAt)}
              </TableCell>

              <TableCell
                align="right"
                hidden={!selectedColumns.includes("Updated At")}
              >
                {formatDate(classData.updatedAt)}
              </TableCell>

              <TableCell>
                <TableActionButtonsContainer
                  onView={() => navigate(`/classes/details/${classData.id}`)}
                  onEdit={() => navigate(`/classes/edit/${classData.id}`)}
                  onDelete={() => handleDelete(classData.id)}
                >
                  {classData.status !== "complete" && (
                    <TableActionButton
                      onClick={() =>
                        navigate(`/classes/enroll/${classData.id}`)
                      }
                      icon={UserPlus}
                      tooltip={t("classes.enrolledStudent")}
                      className="text-white hover:text-white bg-green-600 hover:bg-green-700"
                    />
                  )}
                </TableActionButtonsContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ClassesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={classId}
      />
    </>
  );
};

export default ClassesList;
