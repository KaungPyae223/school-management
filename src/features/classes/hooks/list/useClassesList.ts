import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../../types/TableHeader";

export const useClassesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [classId, setClassId] = useState(0);

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Teacher",
    "Total Students",
    "Days",
    "Price",
    "Status",
    "Time",
  ]);

  const headers: TableHeadType[] = [
    {
      title: t("classes.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "course_name",
    },
    {
      title: t("classes.fields.teacher"),
      key: "Teacher",
      sortable: true,
      sortKey: "teacher_name",
    },
    {
      title: t("classes.fields.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
      align: "right",
    },
    {
      title: t("classes.fields.days"),
      key: "Days",
      sortable: true,
      sortKey: "cl.days",
    },
    {
      title: t("classes.fields.price"),
      key: "Price",
      sortable: true,
      sortKey: "cl.price",
      align: "right",
    },
    {
      title: t("classes.fields.status"),
      key: "Status",
      sortable: false,
    },
    {
      title: t("classes.fields.time"),
      key: "Time",
      sortable: true,
      sortKey: "cl.startTime",
    },
    {
      title: t("classes.fields.startDate"),
      key: "Start Date",
      sortable: true,
      sortKey: "cl.startDate",
    },
    {
      title: t("classes.fields.endDate"),
      key: "End Date",
      sortable: true,
      sortKey: "cl.endDate",
    },
  ];

  const handleDelete = (id: number) => {
    setClassId(id);
    setConfirmDialogOpen(true);
  };

  return {
    headers,
    selectedColumns,
    confirmDialogOpen,
    setConfirmDialogOpen,
    classId,
    handleDelete,
    navigate,
  };
};
