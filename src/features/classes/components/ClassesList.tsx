import {
  BookOpen,
  CalendarCheck2,
  CalendarOff,
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
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
import { useChangeTime } from "../hooks/useChangeTime";
import { formatDate } from "../../../utils/format-date";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import { useState } from "react";
import { useNavigate } from "react-router";
import ClassesDeleteAlert from "./ClassesDeleteAlert";

const ClassesList = ({ data }: { data: any[] }) => {
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
      title: "Name",
      key: "name",
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
      title: "Total Students",
      key: "totalStudents",
      sortable: true,
      sortKey: "total_students",
      align: "right",
    },
    {
      title: "Days",
      key: "days",
      sortable: true,
      sortKey: "cl.days",
    },
    {
      title: "Price",
      key: "price",
      sortable: true,
      sortKey: "cl.price",
      align: "right",
    },
    {
      title: "Status",
      key: "status",
      sortable: false,
    },
    {
      title: "Time",
      key: "time",
      sortable: true,
      sortKey: "cl.startTime",
    },
    {
      title: "Start Date",
      key: "startDate",
      sortable: true,
      sortKey: "cl.startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      sortable: true,
      sortKey: "cl.endDate",
    },
  ];

  const statusConfig = {
    not_started: {
      label: "Not started",
      icon: <Circle size={12} />,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    },
    ongoing: {
      label: "Ongoing",
      icon: <PlayCircle size={12} />,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    },
    complete: {
      label: "Complete",
      icon: <CheckCircle2 size={12} />,
      className:
        "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    },
  };

  const handleDelete = (id: number) => {
    setClassId(id);
    setConfirmDialogOpen(true);
  };

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
                  {classData.course_image ? (
                    <img
                      src={classData.course_image}
                      alt={classData.course_name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-foreground/50 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <BookOpen size={20} className="text-background" />
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground">
                      {classData.course_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Batch {classData.batch}
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
                className="space-x-1"
              >
                {classData.days.split(",").map((day) => (
                  <Badge variant="default" key={day}>
                    {day.slice(0, 3)}
                  </Badge>
                ))}
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Price")}
                align="right"
              >
                {formatCurrency(classData.price)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Status")}>
                <Badge
                  variant="default"
                  className={`flex items-center gap-2 ${statusConfig[classData.status].className}`}
                >
                  {statusConfig[classData.status].icon}
                  {statusConfig[classData.status].label}
                </Badge>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Time")}>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>
                    {useChangeTime(classData.startTime)} -{" "}
                    {useChangeTime(classData.endTime)}
                  </span>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Start Date")}>
                <div className="flex items-center gap-2">
                  <CalendarCheck2
                    size={14}
                    className="text-blue-600 dark:text-blue-400"
                  />
                  {formatDate(classData.startDate)}
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("End Date")}>
                <div className="flex items-center gap-2">
                  <CalendarOff
                    size={14}
                    className="text-red-600 dark:text-red-400"
                  />
                  {classData.endDate ? formatDate(classData.endDate) : "TBA"}
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(classData.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(classData.updatedAt)}
              </TableCell>
              <TableCell>
                <TableActionButtonsContainer
                  onView={() => navigate(`/classes/${classData.id}`)}
                  onEdit={() => navigate(`/classes/edit/${classData.id}`)}
                  onDelete={() => handleDelete(classData.id)}
                />
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
