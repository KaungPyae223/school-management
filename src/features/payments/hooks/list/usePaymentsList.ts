import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../../types/TableHeader";

export const usePaymentsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const selectedColumns = useGetSelectedColumns([
    "Name",
    "Course",
    "Price",
    "Phone",
    "Paid Amount",
    "Remaining Amount",
    "Payment Times",
  ]);

  const headers: TableHeadType[] = [
    {
      title: t("students.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "studentName",
    },
    {
      title: t("students.table.course"),
      key: "Course",
      sortable: true,
      sortKey: "courseName",
    },
    {
      title: t("students.fields.email"),
      key: "Email",
      sortable: true,
      sortKey: "studentEmail",
    },
    {
      title: t("students.fields.phone"),
      key: "Phone",
      sortable: true,
      sortKey: "studentPhone",
    },
    {
      title: t("students.table.price"),
      key: "Price",
      sortable: true,
      sortKey: "e.price",
      align: "right",
    },
    {
      title: t("payments.firstPaidDate"),
      key: "First Paid Date",
      sortable: true,
      sortKey: "firstPaidAt",
    },
    {
      title: t("payments.lastPaidDate"),
      key: "Last Paid Date",
      sortable: true,
      sortKey: "lastPaidAt",
    },
    {
      title: t("payments.paidAmount"),
      key: "Paid Amount",
      sortable: true,
      sortKey: "paidAmount",
      align: "right" as const,
    },
    {
      title: t("payments.remainingAmount"),
      key: "Remaining Amount",
      sortable: true,
      sortKey: "remainingAmount",
      align: "right" as const,
    },
    {
      title: t("payments.paymentTimes"),
      key: "Payment Times",
      sortable: true,
      sortKey: "paymentTimes",
      align: "right",
    },
  ];

  return {
    headers,
    selectedColumns,
    navigate,
  };
};
