import {
  BookOpen,
  Eye,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
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
import TeacherDeleteAlert from "./TeachersDeleteAlert";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";

const TeachersList = ({ data }: { data: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<number>(0);

  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setTeacherId(id);
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
    { title: "Name", key: "Name", sortable: true, sortKey: "t.name" },
    { title: "Phone", key: "Phone", sortable: true, sortKey: "t.phone" },
    { title: "Email", key: "Email", sortable: true, sortKey: "t.email" },
    { title: "Address", key: "Address", sortable: false, sortKey: "t.address" },
    { title: "NRC", key: "NRC", sortable: true, sortKey: "t.nrc" },
    {
      title: "Total Classes",
      key: "Total Classes",
      sortable: true,
      sortKey: "total_classes",
    },
    {
      title: "Total Students",
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
                <TableIconContent icon={Phone} value={teacher.phone} />
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
                <TableIconContent icon={BookOpen} value={teacher.total_classes} />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Students")}>
                <TableIconContent icon={GraduationCap} value={teacher.total_students} />
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
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TeacherDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={teacherId}
      />
    </>
  );
};

export default TeachersList;
