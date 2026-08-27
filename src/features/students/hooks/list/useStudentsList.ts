import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Mars, Venus, VenusAndMars } from "lucide-react";
import { useGetSelectedColumns } from "../../../../hooks/use-get-selected-columns";
import type { TableHeadType } from "../../../../types/TableHeader";

export const useStudentsList = () => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<number>(0);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setStudentId(id);
    setConfirmDialogOpen(true);
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
      title: t("students.fields.name"),
      key: "Name",
      sortable: true,
      sortKey: "s.name",
    },
    {
      title: t("students.fields.phone"),
      key: "Phone",
      sortable: true,
      sortKey: "s.phone",
    },
    {
      title: t("students.fields.email"),
      key: "Email",
      sortable: true,
      sortKey: "s.email",
    },
    {
      title: t("students.fields.address"),
      key: "Address",
      sortable: true,
      sortKey: "s.address",
    },
    {
      title: t("students.fields.gender"),
      key: "Gender",
      sortable: true,
      sortKey: "s.gender",
    },
    {
      title: t("students.fields.dob"),
      key: "Date of Birth",
      sortable: true,
      sortKey: "s.dob",
    },
    {
      title: t("students.totalClasses"),
      key: "Total Classes",
      sortable: true,
      sortKey: "total_classes",
    },
  ];

  const generateGenderIcon = (gender: string) => {
    return gender ? (gender === "FEMALE" ? Venus : Mars) : VenusAndMars;
  };

  const getGenderLabel = (gender: string) => {
    if (gender === "FEMALE") return t("students.fields.female");
    if (gender === "MALE") return t("students.fields.male");
    return gender;
  };

  return {
    headers,
    selectedColumns,
    confirmDialogOpen,
    setConfirmDialogOpen,
    studentId,
    handleDelete,
    generateGenderIcon,
    getGenderLabel,
    navigate,
  };
};
