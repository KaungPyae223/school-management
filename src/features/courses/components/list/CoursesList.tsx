import {
  BookOpen,
  DoorOpen,
  GraduationCap,
  PlayCircle,
  UserPen,
} from "lucide-react";
import Table from "../../../../components/table/Table";
import TableBody from "../../../../components/table/TableBody";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import TableIconContent from "../../../../components/table/TableIconContent";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

import { useTranslation } from "react-i18next";
import CoursesDeleteAlert from "../alerts/CoursesDeleteAlert";
import CoursesRestoreAlert from "../alerts/CoursesRestoreAlert";
import { useCoursesList } from "../../hooks/list/useCoursesList";

const CoursesList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const {
    headers,
    selectedColumns,
    deleteConfirmDialogOpen,
    setDeleteConfirmDialogOpen,
    restoreConfirmDialogOpen,
    setRestoreConfirmDialogOpen,
    courseId,
    handleDelete,
    handleRestore,
    navigate,
  } = useCoursesList();

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={selectedColumns}
          prefix="c."
        />
        <TableBody>
          {data.map((course: any) => (
            <TableRow key={course.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <ImageDisplay
                    image={course.image}
                    alt={course.name}
                    fallbackIcon={BookOpen}
                    display="list"
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
                  <p className="text-xs text-muted-foreground">
                    {t("courses.perCourse")}
                  </p>
                </div>
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Description")}>
                <p className="text-muted-foreground line-clamp-2 max-w-xs">
                  {course.description}
                </p>
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Total Students")}>
                <TableIconContent
                  icon={GraduationCap}
                  value={replaceLocalDigit(course.total_students)}
                  align="right"
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Withdrawn")}>
                <TableIconContent
                  icon={DoorOpen}
                  value={replaceLocalDigit(course.withdrawn_students)}
                  align="right"
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Teachers")}>
                <TableIconContent
                  icon={UserPen}
                  value={replaceLocalDigit(course.total_teachers)}
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Classes")}>
                <TableIconContent
                  icon={BookOpen}
                  value={replaceLocalDigit(course.total_classes)}
                />
              </TableCell>

              <TableCell hidden={!selectedColumns.includes("Active")}>
                <TableIconContent
                  icon={PlayCircle}
                  value={replaceLocalDigit(course.total_active_classes)}
                />
              </TableCell>

              <TableCell
                align="right"
                hidden={!selectedColumns.includes("Created At")}
              >
                {formatDate(course.createdAt)}
              </TableCell>

              <TableCell
                align="right"
                hidden={!selectedColumns.includes("Updated At")}
              >
                {formatDate(course.updatedAt)}
              </TableCell>

              <TableCell className="py-4 pl-3 pr-6 text-right">
                <TableActionButtonsContainer
                  onView={() => navigate(`/courses/details/${course.id}`)}
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
