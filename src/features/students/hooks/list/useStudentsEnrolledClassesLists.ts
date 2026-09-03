import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { TableHeadType } from "../../../../types/TableHeader";
import { useState } from "react";

export const useStudentsEnrolledClassesLists = () => {
  const { t } = useTranslation();

  const [enrolledID, setEnrolledID] = useState<number>(0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [withdrawEnrolledID, setWithdrawEnrolledID] = useState<number>(0);
  const [isWithdrawStatus, setIsWithdrawStatus] = useState<boolean>(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState<boolean>(false);

  const headers: TableHeadType[] = [
    {
      title: t("students.table.course"),
      key: "Course",
      sortable: true,
      sortKey: "course_name",
    },
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
      sortKey: "price",
      align: "right",
    },
    {
      title: t("students.table.period"),
      key: "Period",
      sortable: true,
      sortKey: "startDate",
    },
    {
      title: t("students.table.time"),
      key: "Time",
      sortable: true,
      sortKey: "startTime",
    },
    {
      title: t("students.table.remaining"),
      key: "Remaining",
      sortable: true,
      sortKey: "remainingAmount",
      align: "right",
    },
  ];

  const selectedColumns = [
    "Course",
    "Teacher",
    "Price",
    "Period",
    "Time",
    "Remaining",
    "Created At",
  ];

  const handleDelete = (id: number) => {
    setEnrolledID(id);
    setConfirmDialogOpen(true);
  };

  const handleWithdraw = (id: number, currentWithdraw: boolean) => {
    setWithdrawEnrolledID(id);
    setIsWithdrawStatus(currentWithdraw);
    setWithdrawDialogOpen(true);
  };

  const navigate = useNavigate();

  return {
    headers,
    handleDelete,
    handleWithdraw,
    confirmDialogOpen,
    withdrawDialogOpen,
    withdrawEnrolledID,
    isWithdrawStatus,
    enrolledID,
    setConfirmDialogOpen,
    setWithdrawDialogOpen,
    navigate,
    selectedColumns,
  };
};
