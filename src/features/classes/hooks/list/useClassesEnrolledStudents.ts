import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import type { TableHeadType } from "../../../../types/TableHeader";

export const useClassesEnrolledStudents = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const headers: TableHeadType[] = [
    {
      title: t("students.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "studentName",
    },
    {
      title: t("students.fields.phone"),
      key: "Phone",
      sortable: true,
      sortKey: "studentPhone",
    },
    {
      title: t("students.fields.email"),
      key: "Email",
      sortable: true,
      sortKey: "studentEmail",
    },
    {
      title: t("classes.fields.paidAmount"),
      key: "Paid Amount",
      sortable: true,
      sortKey: "paidAmount",
      align: "right",
    },
    {
      title: t("classes.fields.remainingAmount"),
      key: "Remaining Amount",
      sortable: true,
      sortKey: "remainingAmount",
      align: "right",
    },
  ];

  const handleDelete = (id: number) => {
    setEnrolledID(id);
    setConfirmDialogOpen(true);
  };

  return {
    headers,
    enrolledID,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleDelete,
    navigate,
    t,
  };
};
