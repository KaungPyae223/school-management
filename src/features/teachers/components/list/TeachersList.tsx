import { BookOpen, GraduationCap, IdCard, Mail, MapPin, Phone } from "lucide-react";
import Table from "../../../../components/table/Table";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableRow from "../../../../components/table/TableRow";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import TableIconContent from "../../../../components/table/TableIconContent";
import { formatDate } from "../../../../utils/format-date";
import TeachersDeleteAlert from "../alerts/TeachersDeleteAlert";
import TeachersRestoreAlert from "../alerts/TeachersRestoreAlert";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import { useTeachersList } from "../../hooks/list/useTeachersList";

const TeachersList = ({ data }: { data: any }) => {
  const {
    headers,
    selectedColumns,
    deleteConfirmDialogOpen,
    setDeleteConfirmDialogOpen,
    restoreConfirmDialogOpen,
    setRestoreConfirmDialogOpen,
    teacherId,
    handleDelete,
    handleRestore,
    navigate,
  } = useTeachersList();

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={selectedColumns}
          prefix="t."
        />
        <TableBody>
          {data.map((teacher: any) => (
            <TableRow key={teacher.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={teacher.image} alt={teacher.name} />
                    <AvatarFallback>
                      {generateImageFallBack(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-foreground">{teacher.name}</p>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Phone")}>
                <TableIconContent
                  icon={Phone}
                  value={replaceLocalDigit(teacher.phone)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Email")}>
                <TableIconContent icon={Mail} value={teacher.email} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Address")}>
                <TableIconContent
                  icon={MapPin}
                  value={teacher.address}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("NRC")}>
                <TableIconContent
                  icon={IdCard}
                  value={replaceLocalDigit(teacher.nrc)}
                />
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Total Classes")}
                align="right"
              >
                <TableIconContent
                  icon={BookOpen}
                  value={replaceLocalDigit(teacher.total_classes)}
                  align="right"
                />
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Total Students")}
                align="right"
              >
                <TableIconContent
                  icon={GraduationCap}
                  value={replaceLocalDigit(teacher.total_students)}
                  align="right"
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(teacher.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(teacher.updatedAt)}
              </TableCell>

              <TableCell className="py-4 pl-3 pr-6 text-right">
                <TableActionButtonsContainer
                  onView={() => navigate(`/teachers/details/${teacher.id}`)}
                  onEdit={() => navigate(`/teachers/edit/${teacher.id}`)}
                  onDelete={() => handleDelete(teacher.id)}
                  onRestore={() => handleRestore(teacher.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TeachersDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={teacherId}
      />
      <TeachersRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={teacherId}
      />
    </>
  );
};

export default TeachersList;
