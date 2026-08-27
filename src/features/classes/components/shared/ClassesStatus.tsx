import { useTranslation } from "react-i18next";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";

const ClassesStatus = ({ status }: { status: string }) => {
  const { t } = useTranslation();

  const statusConfig = {
    not_started: {
      label: t("classes.status.not_started"),
      icon: <Circle size={12} />,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    },
    ongoing: {
      label: t("classes.status.ongoing"),
      icon: <PlayCircle size={12} />,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    },
    complete: {
      label: t("classes.status.complete"),
      icon: <CheckCircle2 size={12} />,
      className:
        "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    },
  };
  return (
    <Badge className={cn(statusConfig[status as keyof typeof statusConfig]?.className)}>
      {statusConfig[status as keyof typeof statusConfig]?.icon}{" "}
      {statusConfig[status as keyof typeof statusConfig]?.label}
    </Badge>
  );
};

export default ClassesStatus;

