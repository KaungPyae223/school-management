import {
  BadgeCheck,
  BookOpen,
  CalendarCheck2,
  CalendarDays,
  CalendarOff,
  CheckCircle2,
  ChevronLeft,
  Circle,
  Clock,
  DollarSign,
  Pencil,
  PlayCircle,
  Trash,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "../../../components/ui/card";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useLoaderData, useNavigate } from "react-router";
import DetailsHeader from "../../../components/details-header/DetailsHeader";
import { Separator } from "../../../components/ui/separator";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import { formatDate } from "../../../utils/format-date";
import { formatCurrency } from "../../../utils/format-currency";
import { useChangeTime } from "../hooks/useChangeTime";
import ClassesDetailsCard from "../components/ClassesDetailsCard";

const ClassesDetailsPage = () => {
  useAddBreadcrumb({
    title: "Class Details",
    params: [
      {
        name: "Classes",
        link: "/classes",
      },
      {
        name: "Details",
        link: "/classes/details",
      },
    ],
  });

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

  const data = useLoaderData();

  console.log(data);

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <DetailsHeader
        onDelete={() => {
          navigate(`classes/edit/${data.id}`);
        }}
        onUpdate={() => {
          navigate(`classes/edit/${data.id}`);
        }}
        isTrashView={false}
      />
      <ClassesDetailsCard data={data} />
      <Separator />
    </div>
  );
};

export default ClassesDetailsPage;
