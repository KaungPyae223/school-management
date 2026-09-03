import { useTranslation } from "react-i18next";
import Table from "../../../../components/table/Table";
import TableHeaderGenerator from "../../../../components/table/TableHeaderGenerator";
import TableBody from "../../../../components/table/TableBody";
import TableRow from "../../../../components/table/TableRow";
import TableCell from "../../../../components/table/TableCell";
import { BookOpen, DollarSign, DoorOpen, Users } from "lucide-react";
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
                    {t("students.batch")} {replaceLocalDigit(classData.batch)}
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
            <TableCell align="right">
              <TableIconContent
                icon={DoorOpen}
                value={replaceLocalDigit(classData.withdrawn_students)}
                align="right"
              />
            </TableCell>
            <TableCell align="right">
              {formatDate(classData.createdAt)}
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
