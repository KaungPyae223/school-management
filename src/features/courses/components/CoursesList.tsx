import {
  BookOpen,
  Eye,
  Pencil,
  PlayCircle,
  Trash2,
  UserPen,
  Users,
} from "lucide-react";

import Table from "../../../components/table/Table";
import TableHead from "../../../components/table/TableHead";
import TableHeader from "../../../components/table/TableHeader";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";

import TableActionButton from "../../../components/table/TableActionButton";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { useGetSelectedColumns } from "../../../hooks/use-get-selected-columns";
import CoursesDeleteAlert from "./CoursesDeleteAlert";
import { useState } from "react";
import { useNavigate } from "react-router";
import TableIconContent from "../../../components/table/TableIconContent";
import type { TableHeadType } from "../../../types/TableHeader";

const CoursesList = ({ data }: { data: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<number>(0);
  const navigate = useNavigate();

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Price",
    "Description",
  ]);

  const handleDelete = (id: number) => {
    setCourseId(id);
    setConfirmDialogOpen(true);
  };

  const headers: TableHeadType[] = [
    { title: "Name", key: "name", sortable: true, sortKey: "name" },
    {
      title: "Price",
      key: "price",
      align: "right",
      sortable: true,
      sortKey: "price",
    },
    {
      title: "Description",
      key: "description",
      sortable: true,
      sortKey: "description",
    },
    { title: "Students", key: "students", sortable: true, sortKey: "students" },
    { title: "Teachers", key: "teachers", sortable: true, sortKey: "teachers" },
    { title: "Classes", key: "classes", sortable: true, sortKey: "classes" },
    { title: "Active", key: "active", sortable: true, sortKey: "active" },
    {
      title: "Created At",
      key: "createdAt",
      sortable: true,
      sortKey: "createdAt",
    },
    {
      title: "Updated At",
      key: "updatedAt",
      sortable: true,
      sortKey: "updatedAt",
    },
  ];

  return (
    <>
      <Table>
        <TableHeader>
          {headers.map((header) => (
            <TableHead
              key={header.key}
              align={header.align}
              sortable={header.sortable}
              sortKey={header.sortKey}
              hidden={!selectedColumns.includes(header.title)}
            >
              {header.title}
            </TableHead>
          ))}
          <TableHead align="right">Actions</TableHead>
        </TableHeader>
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
              <TableCell hidden={!selectedColumns.includes("Students")}>
                <TableIconContent icon={Users} value={10} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Teachers")}>
                <TableIconContent icon={UserPen} value={10} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Classes")}>
                <TableIconContent icon={BookOpen} value={10} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Active")}>
                <TableIconContent icon={PlayCircle} value={10} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(course.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(course.updatedAt)}
              </TableCell>

              <TableCell className="py-4 pl-3 pr-6 text-right">
                <div className="flex items-center justify-end gap-1">
                  <TableActionButton
                    icon={<Eye className="size-4" />}
                    tooltip="View"
                  />
                  <TableActionButton
                    icon={<Pencil className="size-4" />}
                    tooltip="Edit"
                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                  />
                  <TableActionButton
                    icon={<Trash2 className="size-4 text-destructive" />}
                    tooltip="Delete"
                    onClick={() => handleDelete(course.id)}
                    variant="destructive"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CoursesDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={courseId}
      />
    </>
  );
};

export default CoursesList;
