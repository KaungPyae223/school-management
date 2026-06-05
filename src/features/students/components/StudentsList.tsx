import {
  BookOpen,
  Calendar,
  Eye,
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
import StudentDeleteAlert from "./StudentsDeleteAlert";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";

const StudentsList = ({ data }: { data: any }) => {
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
    { title: "Name", key: "name", sortable: true, sortKey: "name" },
    { title: "Phone", key: "phone", sortable: true, sortKey: "phone" },
    { title: "Email", key: "email", sortable: true, sortKey: "email" },
    { title: "Address", key: "address", sortable: true, sortKey: "address" },
    { title: "Gender", key: "gender", sortable: true, sortKey: "gender" },
    { title: "Date of Birth", key: "dob", sortable: true, sortKey: "dob" },
    {
      title: "Total Classes",
      key: "totalClasses",
      sortable: true,
      sortKey: "totalClasses",
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

  const generateGenderIcon = (gender: any) => {
    return gender ? (gender === "FEMALE" ? Venus : Mars) : VenusAndMars;
  };

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
                <TableIconContent icon={Phone} value={student.phone} />
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
                  value={student.gender}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Date of Birth")}>
                <TableIconContent
                  icon={Calendar}
                  value={student.dob && formatDate(student.dob)}
                />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Total Classes")}>
                <TableIconContent icon={BookOpen} value="24" />
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Created At")}>
                {formatDate(student.createdAt)}
              </TableCell>
              <TableCell hidden={!selectedColumns.includes("Updated At")}>
                {formatDate(student.updatedAt)}
              </TableCell>
              <TableCell className="py-4 pl-3 pr-6 text-right">
                <div className="flex items-center justify-end gap-1">
                  <TableActionButton
                    icon={<Eye className="size-4" />}
                    tooltip="View"
                  />
                  <TableActionButton
                    onClick={() => navigate(`/students/edit/${student.id}`)}
                    icon={<Pencil className="size-4" />}
                    tooltip="Edit"
                  />
                  <TableActionButton
                    onClick={() => handleDelete(student.id)}
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
      <StudentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={studentId}
      />
    </>
  );
};

export default StudentsList;
