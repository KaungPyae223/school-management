import { useTranslation } from "react-i18next";
import {
  BookOpen,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Table from "../../../components/table/Table";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableRow from "../../../components/table/TableRow";
import { useGetSelectedColumns } from "../../../hooks/use-get-selected-columns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import TableIconContent from "../../../components/table/TableIconContent";
import type { TableHeadType } from "../../../types/TableHeader";
import { formatDate } from "../../../utils/format-date";
import { useNavigate } from "react-router";
import { useState } from "react";
import TeachersDeleteAlert from "./TeachersDeleteAlert";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import TeachersRestoreAlert from "./TeachersRestoreAlert";
import { replaceLocalDigit } from "../../../utils/replace-local-digit";

const TeachersList = ({ data }: { data: any }) => {
  const { t } = useTranslation();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<number>(0);

  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setTeacherId(id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleRestore = (id: number) => {
    setTeacherId(id);
    setRestoreConfirmDialogOpen(true);
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
    { title: t("teachers.fields.name"), key: "Name", sortable: true, sortKey: "t.name" },
    { title: t("teachers.fields.phone"), key: "Phone", sortable: true, sortKey: "t.phone" },
    { title: t("teachers.fields.email"), key: "Email", sortable: true, sortKey: "t.email" },
    { title: t("teachers.fields.address"), key: "Address", sortable: false, sortKey: "t.address" },
    { title: t("teachers.fields.nrc"), key: "NRC", sortable: true, sortKey: "t.nrc" },
    {
      title: t("teachers.totalClasses"),
      key: "Total Classes",
      sortable: true,
      sortKey: "total_classes",
    },
    {
      title: t("teachers.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
    },
  ];

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
                  <Avatar className="size-9">
                    <AvatarImage src={teacher.image} />
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
                <TableIconContent icon={MapPin} value={teacher.address} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("NRC")}>
                <TableIconContent icon={IdCard} value={teacher.nrc} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Classes")}>
                <TableIconContent
                  icon={BookOpen}
                  value={replaceLocalDigit(teacher.total_classes)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Students")}>
                <TableIconContent
                  icon={GraduationCap}
                  value={replaceLocalDigit(teacher.total_students)}
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
