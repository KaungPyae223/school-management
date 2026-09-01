import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../../types/TableHeader";

export const useCoursesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const [courseId, setCourseId] = useState<number>(0);

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Price",
    "Total Students",
    "Withdrawn",
    "Description",
    "Created At",
  ]);

  const handleDelete = (id: number) => {
    setCourseId(id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleRestore = (id: number) => {
    setCourseId(id);
    setRestoreConfirmDialogOpen(true);
  };

  const headers: TableHeadType[] = [
    {
      title: t("courses.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "c.name",
    },
    {
      title: t("courses.fields.price"),
      key: "Price",
      align: "right",
      sortable: true,
      sortKey: "c.price",
    },
    {
      title: t("courses.fields.description"),
      key: "Description",
      sortKey: "c.description",
    },
    {
      title: t("courses.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
    },
    {
      title: t("courses.withdrawn"),
      key: "Withdrawn",
      sortable: true,
      sortKey: "withdrawn_students",
    },
    {
      title: t("courses.teachers"),
      key: "Teachers",
      sortable: true,
      sortKey: "total_teachers",
    },
    {
      title: t("courses.classes"),
      key: "Classes",
      sortable: true,
      sortKey: "total_classes",
    },
    {
      title: t("courses.active"),
      key: "Active",
      sortable: true,
      sortKey: "total_active_classes",
    },
  ];

  return {
    headers,
    selectedColumns,
    deleteConfirmDialogOpen,
    setDeleteConfirmDialogOpen,
    restoreConfirmDialogOpen,
    setRestoreConfirmDialogOpen,
    courseId,
    handleDelete,
    handleRestore,
    navigate,
  };
};
