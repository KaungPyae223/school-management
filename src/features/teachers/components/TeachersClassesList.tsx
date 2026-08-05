import { useNavigate } from "react-router";
import type { TableHeadType } from "../../../types/TableHeader";
import Table from "../../../components/table/Table";
import TableHeaderGenerator from "../../../components/table/TableHeaderGenerator";
import TableBody from "../../../components/table/TableBody";
import TableRow from "../../../components/table/TableRow";
import TableCell from "../../../components/table/TableCell";
import { BookOpen, DollarSign, Users } from "lucide-react";
import TableIconContent from "../../../components/table/TableIconContent";
import { formatCurrency } from "../../../utils/format-currency";
import { formatDate } from "../../../utils/format-date";
import { changeTime } from "../../../utils/change-time";
import TableActionButtonsContainer from "../../../components/table/TableActionButtonsContainer";
import ClassesStatus from "../../classes/components/ClassesStatus";
import ImageDisplay from "../../../components/image/ImageDisplay";

const TeachersClassesList = ({ data }: { data: any }) => {
  console.log(data);

  const headers: TableHeadType[] = [
    {
      title: "Course",
      key: "course_name",
      sortable: true,
      sortKey: "course_name",
    },

    {
      title: "Price",
      key: "price",
      sortable: true,
      sortKey: "cl.price",
      align: "right",
    },
    {
      title: "Period",
      key: "startDate",
      sortable: true,
      sortKey: "cl.startDate",
    },
    {
      title: "Time",
      key: "startTime",
      sortable: true,
      sortKey: "cl.startTime",
    },
    {
      title: "Status",
      key: "status",
      sortable: false,
    },
    {
      title: "Total Students",
      key: "total_students",
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
          "Course",
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
        {data.map((classData) => (
          <TableRow key={classData.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <ImageDisplay
                  image={classData.image}
                  alt={classData.course_name}
                  fallbackIcon={BookOpen}
                  display="list"
                />
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">
                    {classData.course_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Batch {classData.batch}
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
                  <span className="text-xs text-muted-foreground">Start:</span>{" "}
                  {formatDate(classData.startDate)}
                </span>

                <span>
                  <span className="text-xs text-muted-foreground">End:</span>{" "}
                  {classData.endDate ? formatDate(classData.endDate) : "TBA"}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-0.5">
                <p className="font-medium text-foreground">
                  {changeTime(classData.startTime)} -{" "}
                  {changeTime(classData.endTime)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {classData.days
                    .split(",")
                    .map((day) => day.slice(0, 3))
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
                value={classData.total_students}
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

export default TeachersClassesList;
