import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Calendar,
  Mail,
  MapPin,
  Mars,
  Phone,
  Venus,
  VenusAndMars,
} from "lucide-react";
import Table from "../../../../components/table/Table";
import TableBody from "../../../../components/table/TableBody";
import TableCell from "../../../../components/table/TableCell";
import TableRow from "../../../../components/table/TableRow";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import TableIconContent from "../../../../components/table/TableIconContent";
import type { TableHeadType } from "../../../../types/TableHeader";
import { formatDate } from "../../../../utils/format-date";
import { useNavigate } from "react-router";
import { useState } from "react";
import StudentDeleteAlert from "../alerts/StudentsDeleteAlert";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";

const StudentsList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<number>(0);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setStudentId(id);
    setConfirmDialogOpen(true);
  };

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Phone",
    "Email",
    "Address",
    "Total Classes",
    "Created At",
  ]);

  const headers: TableHeadType[] = [
    { title: t("students.fields.name"), key: "Name", sortable: true, sortKey: "s.name" },
    { title: t("students.fields.phone"), key: "Phone", sortable: true, sortKey: "s.phone" },
    { title: t("students.fields.email"), key: "Email", sortable: true, sortKey: "s.email" },
    { title: t("students.fields.address"), key: "Address", sortable: true, sortKey: "s.address" },
    { title: t("students.fields.gender"), key: "Gender", sortable: true, sortKey: "s.gender" },
    {
      title: t("students.fields.dob"),
      key: "Date of Birth",
      sortable: true,
      sortKey: "s.dob",
    },
    {
      title: t("students.totalClasses"),
      key: "Total Classes",
      sortable: true,
      sortKey: "total_classes",
    },
  ];

  const generateGenderIcon = (gender: string) => {
    return gender ? (gender === "FEMALE" ? Venus : Mars) : VenusAndMars;
  };

  const getGenderLabel = (gender: string) => {
    if (gender === "FEMALE") return t("students.fields.female");
    if (gender === "MALE") return t("students.fields.male");
    return gender;
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
          {data.map((student: any) => (
            <TableRow key={student.id}>
              <TableCell hidden={!selectedColumns.includes("Name")}>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={student.image} />
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
                <TableIconContent icon={Mail} value={student.email} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Address")}>
                <TableIconContent icon={MapPin} value={student.address} />
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
                  value={student.dob && formatDate(student.dob)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Classes")}>
                <TableIconContent
                  icon={BookOpen}
                  value={replaceLocalDigit(student.total_classes)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(student.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(student.updatedAt)}
              </TableCell>
              <TableCell className="py-4 pl-3 pr-6 text-right">
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
