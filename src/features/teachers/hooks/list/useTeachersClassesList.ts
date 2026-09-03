import { useTranslation } from "react-i18next";
import type { TableHeadType } from "../../../../types/TableHeader";
import { useNavigate } from "react-router";

export const useTeachersClassesList = () => {
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
    {
      title: t("general.withdrawn"),
      key: "Withdrawn Students",
      sortable: true,
      sortKey: "withdrawn_students",
      align: "right",
    },
  ];

  const selectedColumns = [
    "Teacher",
    "Price",
    "Period",
    "Time",
    "Status",
    "Total Students",
    "Withdrawn Students",
    "Created At",
  ];

  const navigate = useNavigate();

  return { headers, selectedColumns, navigate };
};
