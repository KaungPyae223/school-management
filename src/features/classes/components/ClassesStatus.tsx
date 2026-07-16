import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

const ClassesStatus = ({ status }: { status: string }) => {
  const statusConfig = {
    not_started: {
      label: "Not started",
      icon: <Circle size={12} />,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    },
    ongoing: {
      label: "Ongoing",
      icon: <PlayCircle size={12} />,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    },
    complete: {
      label: "Complete",
      icon: <CheckCircle2 size={12} />,
      className:
        "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    },
  };
  return (
    <Badge className={` ${statusConfig[status].className}`}>
      {statusConfig[status].icon} {statusConfig[status].label}
    </Badge>
  );
};

export default ClassesStatus;
