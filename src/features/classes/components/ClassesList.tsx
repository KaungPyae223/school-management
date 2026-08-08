import { useTranslation } from "react-i18next";
import {
  BookOpen,
  CalendarCheck2,
  CalendarOff,
  Clock,
  UserPlus,
} from "lucide-react";
import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableRow from "../../../components/table/TableRow";
import { useGetSelectedColumns } from "../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../types/TableHeader";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import { Badge } from "../../../components/ui/badge";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ClassesDeleteAlert from "./ClassesDeleteAlert";
import TableActionButton from "../../../components/table/TableActionButton";
import ClassesStatus from "./ClassesStatus";
import { changeTime } from "../../../utils/change-time";
import TableIconContent from "../../../components/table/TableIconContent";
import ImageDisplay from "../../../components/image/ImageDisplay";
import CardDayBadge from "../../../components/card-utils/CardDayBadge";

const ClassesList = ({ data }: { data: any[] }) => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [classId, setClassId] = useState<number>(0);
  const navigate = useNavigate();

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Teacher",
    "Total Students",
    "Days",
    "Price",
    "Status",
    "Time",
  ]);

  const headers: TableHeadType[] = [
    {
      title: t("classes.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "course_name",
    },
    {
      title: t("classes.fields.teacher"),
      key: "Teacher",
      sortable: true,
      sortKey: "teacher_name",
    },
    {
      title: t("classes.fields.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
      align: "right",
    },
    {
      title: t("classes.fields.days"),
      key: "Days",
      sortable: true,
      sortKey: "cl.days",
    },
    {
      title: t("classes.fields.price"),
      key: "Price",
      sortable: true,
      sortKey: "cl.price",
      align: "right",
    },
    {
      title: t("classes.fields.status"),
      key: "Status",
      sortable: false,
    },
    {
      title: t("classes.fields.time"),
      key: "Time",
      sortable: true,
      sortKey: "cl.startTime",
    },
    {
      title: t("classes.fields.startDate"),
      key: "Start Date",
      sortable: true,
      sortKey: "cl.startDate",
    },
    {
      title: t("classes.fields.endDate"),
      key: "End Date",
      sortable: true,
      sortKey: "cl.endDate",
    },
  ];

  const handleDelete = (id: number) => {
    setClassId(id);
    setConfirmDialogOpen(true);
  };

  const [searchParams] = useSearchParams();
  const isTrashView = searchParams.get("trash");

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
                      {t("classes.batch", { batch: classData.batch })}
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
                    <p className="text-sm font-medium  line-clamp-1">
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
                {classData.total_students}
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
                  value={
                    changeTime(classData.startTime) +
                    " - " +
                    changeTime(classData.endTime)
                  }
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
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(classData.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(classData.updatedAt)}
              </TableCell>
              <TableCell>
                <TableActionButtonsContainer
                  onView={() => navigate(`/classes/details/${classData.id}`)}
                  onEdit={() => navigate(`/classes/edit/${classData.id}`)}
                  onDelete={() => handleDelete(classData.id)}
                >
                  {!isTrashView && classData.status != "complete" && (
                    <TableActionButton
                      onClick={() =>
                        navigate(`/classes/enroll/${classData.id}`)
                      }
                      icon={UserPlus}
                      tooltip={t("classes.enrolledStudent")}
                      className="text-white hover:text-white bg-green-600 hover:bg-green-700 "
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
