import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { TableHeadType } from "../../../types/TableHeader";
import Table from "../../../components/table/Table";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";
import { DollarSign, Users } from "lucide-react";
import TableIconContent from "../../../components/table/TableIconContent";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { changeTime } from "../../../utils/change-time";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import ClassesStatus from "../../classes/components/ClassesStatus";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { replaceLocalDigit } from "../../../utils/replace-local-digit";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";

const CoursesClassesList = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  const headers: TableHeadType[] = [
    {
      title: t("students.table.teacher"),
      key: "Teacher",
      sortable: true,
      sortKey: "teacher_name",
    },

    {
      title: t("students.table.price"),
      key: "Price",
      sortable: true,
      sortKey: "cl.price",
      align: "right",
    },
    {
      title: t("students.table.period"),
      key: "Period",
      sortable: true,
      sortKey: "cl.startDate",
    },
    {
      title: t("students.table.time"),
      key: "Time",
      sortable: true,
      sortKey: "cl.startTime",
    },
    {
      title: "Status",
      key: "Status",
      sortable: false,
    },
    {
      title: t("teachers.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
      align: "right",
    },
  ];
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeaderGenerator
        headers={headers}
        selectedColumns={[
          "Teacher",
          "Price",
          "Period",
          "Time",
          "Status",
          "Total Students",
          "Created At",
        ]}
        prefix="cl."
      />
      <TableBody>
        {data.map((classData: any) => (
          <TableRow key={classData.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={classData.teacher_image}
                    alt={classData.teacher_name}
                  />
                  <AvatarFallback>
                    {generateImageFallBack(classData.teacher_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium  line-clamp-1">
                    {classData.teacher_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {classData.teacher_email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell align="right">
              <TableIconContent
                icon={DollarSign}
                value={formatCurrency(classData.price)}
                align="right"
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span>
                  <span className="text-xs text-muted-foreground">
                    {t("students.start")}:
                  </span>{" "}
                  {formatDate(classData.startDate)}
                </span>

                <span>
                  <span className="text-xs text-muted-foreground">
                    {t("students.end")}:
                  </span>{" "}
                  {classData.endDate
                    ? formatDate(classData.endDate)
                    : t("students.tba")}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-0.5">
                <p className="font-medium text-foreground">
                  {changeTime(classData.startTime)} -{" "}
                  {changeTime(classData.endTime)}
                </p>
                <p className="text-xs text-muted-foreground max-w-52">
                  {classData.days
                    .split(",")
                    .map((day) => t(`general.days.${day}`))
                    .join(", ")}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <ClassesStatus status={classData.status} />
            </TableCell>
            <TableCell align="right">
              <TableIconContent
                icon={Users}
                value={replaceLocalDigit(classData.total_students)}
                align="right"
              />
            </TableCell>
            <TableCell>{formatDate(classData.createdAt)}</TableCell>

            <TableCell>
              <TableActionButtonsContainer
                onView={() => {
                  navigate(`/classes/details/${classData.id}`);
                }}
              ></TableActionButtonsContainer>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoursesClassesList;
