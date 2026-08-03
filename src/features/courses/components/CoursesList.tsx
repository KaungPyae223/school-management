import { BookOpen, ClipboardList, PlayCircle, UserPen } from "lucide-react";

import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";

import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { useGetSelectedColumns } from "../../../hooks/use-get-selected-columns";
import CoursesDeleteAlert from "./CoursesDeleteAlert";
import { useState } from "react";
import { useNavigate } from "react-router";
import TableIconContent from "../../../components/table/TableIconContent";
import type { TableHeadType } from "../../../types/TableHeader";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import CoursesRestoreAlert from "./CoursesRestoreAlert";

const CoursesList = ({ data }: { data: any }) => {
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const [courseId, setCourseId] = useState<number>(0);
  const navigate = useNavigate();

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Price",
    "Description",
    "Created At",
  ]);

  const handleDelete = (id: number) => {
    setCourseId(id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleRestore = (id: number) => {
    setCourseId(id);
    setRestoreConfirmDialogOpen(true);
  };

  const headers: TableHeadType[] = [
    { title: "Name", key: "name", sortable: true, sortKey: "c.name" },
    {
      title: "Price",
      key: "price",
      align: "right",
      sortable: true,
      sortKey: "c.price",
    },
    {
      title: "Description",
      key: "description",
      sortKey: "c.description",
    },
    {
      title: "Enrollments",
      key: "enrollments",
      sortable: true,
      sortKey: "total_enrollments",
    },
    {
      title: "Teachers",
      key: "teachers",
      sortable: true,
      sortKey: "total_teachers",
    },
    {
      title: "Classes",
      key: "classes",
      sortable: true,
      sortKey: "total_classes",
    },
    {
      title: "Active",
      key: "active",
      sortable: true,
      sortKey: "total_active_classes",
    },
  ];

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={selectedColumns}
          prefix={"c."}
        />
        <TableBody>
          {data.map((course) => (
            <TableRow key={course.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-foreground/50 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <BookOpen size={20} className="text-background" />
                    </div>
                  )}
                  <p className="font-medium text-foreground">{course.name}</p>
                </div>
              </TableCell>
              <TableCell
                align="right"
                hidden={!selectedColumns.includes("Price")}
              >
                <div>
                  <p className="font-semibold">
                    {formatCurrency(course.price)}
                  </p>
                  <p className="text-xs text-muted-foreground">per course</p>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Description")}>
                <p className="text-muted-foreground line-clamp-2 max-w-xs">
                  {course.description}
                </p>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Enrollments")}>
                <TableIconContent
                  icon={ClipboardList}
                  value={course.total_enrollments}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Teachers")}>
                <TableIconContent
                  icon={UserPen}
                  value={course.total_teachers}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Classes")}>
                <TableIconContent
                  icon={BookOpen}
                  value={course.total_classes}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Active")}>
                <TableIconContent
                  icon={PlayCircle}
                  value={course.total_active_classes}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(course.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(course.updatedAt)}
              </TableCell>

              <TableCell className="py-4 pl-3 pr-6 text-right">
                <TableActionButtonsContainer
                  onView={() => navigate(`/courses/detail/${course.id}`)}
                  onEdit={() => navigate(`/courses/edit/${course.id}`)}
                  onDelete={() => handleDelete(course.id)}
                  onRestore={() => handleRestore(course.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CoursesDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={courseId}
      />
      <CoursesRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={courseId}
      />
    </>
  );
};

export default CoursesList;
