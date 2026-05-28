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
import CourseDeleteAlert from "./CourseDeleteAlert";
import { useState } from "react";

const CoursesList = ({ data }: { data: any }) => {
  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Price",
    "Description",
  ]);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<number>(0);

  const handleDelete = (id: number) => {
    setCourseId(id);
    setConfirmDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableHead
            sortable={true}
            sortKey={"name"}
            hidden={!selectedColumns.includes("Name")}
          >
            Course Name
          </TableHead>
          <TableHead
            sortable={true}
            align={"right"}
            sortKey={"price"}
            hidden={!selectedColumns.includes("Price")}
          >
            Price
          </TableHead>
          <TableHead hidden={!selectedColumns.includes("Description")}>
            Description
          </TableHead>
          <TableHead
            sortable={true}
            sortKey={"students"}
            hidden={!selectedColumns.includes("Students")}
          >
            Students
          </TableHead>
          <TableHead
            hidden={!selectedColumns.includes("Teachers")}
            sortable={true}
            sortKey={"teachers"}
          >
            Teachers
          </TableHead>
          <TableHead
            sortable={true}
            sortKey={"classes"}
            hidden={!selectedColumns.includes("Classes")}
          >
            Classes
          </TableHead>
          <TableHead
            sortable={true}
            sortKey={"active"}
            hidden={!selectedColumns.includes("Active")}
          >
            Active
          </TableHead>
          <TableHead
            sortable={true}
            sortKey={"createdAt"}
            hidden={!selectedColumns.includes("Created At")}
          >
            Created At
          </TableHead>
          <TableHead
            sortable={true}
            sortKey={"updatedAt"}
            hidden={!selectedColumns.includes("Updated At")}
          >
            Updated At
          </TableHead>
          <TableHead align="right">Actions</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((course) => (
            <TableRow key={course.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
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
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">24</span>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Teachers")}>
                <div className="flex items-center gap-1.5">
                  <UserPen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">24</span>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Classes")}>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">24</span>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Active")}>
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">24</span>
                </div>
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
                  />
                  <TableActionButton
                    icon={<Trash2 className="size-4 text-destructive" />}
                    tooltip="Delete"
                    onClick={() => handleDelete(course.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CourseDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={courseId}
      />
    </>
  );
};

export default CoursesList;
