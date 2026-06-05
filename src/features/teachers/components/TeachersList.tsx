import {
  BookOpen,
  Calendar,
  Eye,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  Mars,
  Pencil,
  Phone,
  Trash2,
  Venus,
  VenusAndMars,
  type LucideIcon,
} from "lucide-react";
import Table from "../../../components/table/Table";
import TableActionButton from "../../../components/table/TableActionButton";
import TableBody from "../../../components/table/TableBody";
import TableCell from "../../../components/table/TableCell";
import TableHead from "../../../components/table/TableHead";
import TableHeader from "../../../components/table/TableHeader";
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
    { title: "Name", key: "name", sortable: true, sortKey: "name" },
    { title: "Phone", key: "phone", sortable: true, sortKey: "phone" },
    { title: "Email", key: "email", sortable: true, sortKey: "email" },
    { title: "Address", key: "address", sortable: true, sortKey: "address" },
    { title: "NRC", key: "nrc", sortable: true, sortKey: "nrc" },
    {
      title: "Total Classes",
      key: "totalClasses",
      sortable: true,
      sortKey: "totalClasses",
    },
    {
      title: "Total Students",
      key: "totalStudents",
      sortable: true,
      sortKey: "totalStudents",
    },
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
                <TableIconContent icon={BookOpen} value="24" />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Students")}>
                <TableIconContent icon={GraduationCap} value="24" />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(teacher.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(teacher.updatedAt)}
              </TableCell>
              <TableCell className="py-4 pl-3 pr-6 text-right">
                <div className="flex items-center justify-end gap-1">
                  <TableActionButton
                    icon={<Eye className="size-4" />}
                    tooltip="View"
                  />
                  <TableActionButton
                    onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
                    icon={<Pencil className="size-4" />}
                    tooltip="Edit"
                  />
                  <TableActionButton
                    onClick={() => handleDelete(teacher.id)}
                    icon={<Trash2 className="size-4 text-destructive" />}
                    tooltip="Delete"
                    variant="destructive"
                  />
                </div>
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
