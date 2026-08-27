import { BookOpen, Calendar, Mail, MapPin, Phone } from "lucide-react";
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
import StudentDeleteAlert from "../alerts/StudentsDeleteAlert";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import { useTranslation } from "react-i18next";
import { useStudentsList } from "../../hooks/list/useStudentsList";

const StudentsList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const {
    headers,
    selectedColumns,
    confirmDialogOpen,
    setConfirmDialogOpen,
    studentId,
    handleDelete,
    generateGenderIcon,
    getGenderLabel,
    navigate,
  } = useStudentsList();

  return (
    <>
      <Table>
        <TableHeaderGenerator
          headers={headers}
          selectedColumns={selectedColumns}
          prefix="s."
        />
        <TableBody>
          {data.map((student: any) => (
            <TableRow key={student.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.image} alt={student.name} />
                    <AvatarFallback>
                      {generateImageFallBack(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-foreground">{student.name}</p>
                </div>
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Phone")}>
                <TableIconContent
                  icon={Phone}
                  value={replaceLocalDigit(student.phone)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Email")}>
                <TableIconContent
                  icon={Mail}
                  value={student.email || t("students.na")}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Address")}>
                <TableIconContent
                  icon={MapPin}
                  value={student.address || t("students.na")}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Gender")}>
                <TableIconContent
                  icon={generateGenderIcon(student.gender)}
                  value={getGenderLabel(student.gender)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Date of Birth")}>
                <TableIconContent
                  icon={Calendar}
                  value={
                    student.dob
                      ? formatDate(student.dob)
                      : t("students.tba")
                  }
                />
              </TableCell>
              <TableCell
                hidden={!selectedColumns.includes("Total Classes")}
                align="right"
              >
                <TableIconContent
                  icon={BookOpen}
                  value={replaceLocalDigit(student.total_classes)}
                  align="right"
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(student.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(student.updatedAt)}
              </TableCell>

              <TableCell>
                <TableActionButtonsContainer
                  onView={() => navigate(`/students/details/${student.id}`)}
                  onEdit={() => navigate(`/students/edit/${student.id}`)}
                  onDelete={() => handleDelete(student.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <StudentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={studentId}
      />
    </>
  );
};

export default StudentsList;
