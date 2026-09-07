import { useTranslation } from "react-i18next";
import Table from "../../../../components/table/Table";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableBody from "../../../../components/table/TableBody";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import { BookOpen, Currency, DollarSign, DoorOpen, HandCoins, Users } from "lucide-react";
import TableIconContent from "../../../../components/table/TableIconContent";
import { formatCurrency } from "../../../../utils/format-currency";
import { formatDate } from "../../../../utils/format-date";
import { changeTime } from "../../../../utils/change-time";
import TableActionButtonsContainer from "../../../../components/table/TableActionButtonsContainer";
import ImageDisplay from "../../../../components/image/ImageDisplay";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";
import ClassesStatus from "../../../classes/components/shared/ClassesStatus";
import { useTeachersClassesList } from "../../hooks/list/useTeachersClassesList";

const TeachersClassesList = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  const { headers, selectedColumns, navigate } = useTeachersClassesList();

  return (
    <Table>
      <TableHeaderGenerator
        headers={headers}
        selectedColumns={selectedColumns}
        prefix="cl."
      />
      <TableBody>
        {data.map((classData: any) => (
          <TableRow key={classData.id}>
            <TableCell hidden={!selectedColumns.includes("Course")}>
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
                    {t("students.batch")} {replaceLocalDigit(classData.batch)}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell align="right" hidden={!selectedColumns.includes("Price")}>
              <TableIconContent
                icon={DollarSign}
                value={formatCurrency(classData.price)}
                align="right"
              />
            </TableCell>
            <TableCell hidden={!selectedColumns.includes("Period")}>
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
            <TableCell hidden={!selectedColumns.includes("Time")}>
              <div className="space-y-0.5">
                <p className="font-medium text-foreground">
                  {changeTime(classData.startTime)} -{" "}
                  {changeTime(classData.endTime)}
                </p>
                <p className="text-xs text-muted-foreground max-w-52">
                  {classData.days
                    .split(",")
                    .map((day: string) => t(`general.days.${day}`))
                    .join(", ")}
                </p>
              </div>
            </TableCell>
            <TableCell hidden={!selectedColumns.includes("Status")}>
              <ClassesStatus status={classData.status} />
            </TableCell>
            <TableCell
              align="right"
              hidden={!selectedColumns.includes("Total Students")}
            >
              <TableIconContent
                icon={Users}
                value={replaceLocalDigit(classData.total_students)}
                align="right"
              />
            </TableCell>
            <TableCell
              align="right"
              hidden={!selectedColumns.includes("Withdrawn Students")}
            >
              <TableIconContent
                icon={DoorOpen}
                value={replaceLocalDigit(classData.withdrawn_students)}
                align="right"
              />
            </TableCell>
            <TableCell
              hidden={!selectedColumns.includes("Total Revenue")}
              align="right"
            >
              <TableIconContent
                icon={Currency}
                value={replaceLocalDigit(classData.total_revenue)}
                align="right"
              />
            </TableCell>
            <TableCell
              hidden={!selectedColumns.includes("Remaining Amount")}
              align="right"
            >
              <TableIconContent
                icon={HandCoins}
                value={replaceLocalDigit(classData.remaining_amount)}
                align="right"
              />
            </TableCell>
            <TableCell
              align="right"
              hidden={!selectedColumns.includes("Created At")}
            >
              {formatDate(classData.createdAt)}
            </TableCell>
            <TableCell
              align="right"
              hidden={!selectedColumns.includes("Updated At")}
            >
              {formatDate(classData.updatedAt)}
            </TableCell>
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
