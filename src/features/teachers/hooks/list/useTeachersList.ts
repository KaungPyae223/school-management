import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../../types/TableHeader";

export const useTeachersList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const [teacherId, setTeacherId] = useState<number>(0);

  const handleDelete = (id: number) => {
    setTeacherId(id);
    setDeleteConfirmDialogOpen(true);
  };

  const handleRestore = (id: number) => {
    setTeacherId(id);
    setRestoreConfirmDialogOpen(true);
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
    {
      title: t("teachers.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "t.name",
    },
    {
      title: t("teachers.fields.phone"),
      key: "Phone",
      sortable: true,
      sortKey: "t.phone",
    },
    {
      title: t("teachers.fields.email"),
      key: "Email",
      sortable: true,
      sortKey: "t.email",
    },
    {
      title: t("teachers.fields.address"),
      key: "Address",
      sortable: false,
      sortKey: "t.address",
    },
    {
      title: t("teachers.fields.nrc"),
      key: "NRC",
      sortable: true,
      sortKey: "t.nrc",
    },
    {
      title: t("teachers.totalClasses"),
      key: "Total Classes",
      sortable: true,
      sortKey: "total_classes",
    },
    {
      title: t("teachers.totalStudents"),
      key: "Total Students",
      sortable: true,
      sortKey: "total_students",
    },
  ];

  return {
    headers,
    selectedColumns,
    deleteConfirmDialogOpen,
    setDeleteConfirmDialogOpen,
    restoreConfirmDialogOpen,
    setRestoreConfirmDialogOpen,
    teacherId,
    handleDelete,
    handleRestore,
    navigate,
  };
};
