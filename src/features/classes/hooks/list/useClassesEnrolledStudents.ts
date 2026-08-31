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

  const [withdrawEnrolledID, setWithdrawEnrolledID] = useState<number>(0);
  const [isWithdrawStatus, setIsWithdrawStatus] = useState<boolean>(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    setEnrolledID(id);
    setConfirmDialogOpen(true);
  };

  const handleWithdraw = (id: number, currentWithdraw: boolean) => {
    setWithdrawEnrolledID(id);
    setIsWithdrawStatus(currentWithdraw);
    setWithdrawDialogOpen(true);
  };

  return {
    headers,
    enrolledID,
    confirmDialogOpen,
    setConfirmDialogOpen,
    handleDelete,
    withdrawEnrolledID,
    isWithdrawStatus,
    withdrawDialogOpen,
    setWithdrawDialogOpen,
    handleWithdraw,
    navigate,
  };
};
