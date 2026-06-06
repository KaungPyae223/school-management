import {
  ArrowRight,
  BookOpen,
  Calendar,
  EllipsisVertical,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  Mars,
  Pencil,
  Phone,
  Trash2,
  Venus,
  VenusAndMars,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import { formatDate } from "../../../utils/format-date";
import CardCretedUpdated from "../../../components/card-utils/CardCretedUpdated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useNavigate } from "react-router";
import TeacherDeleteAlert from "./TeachersDeleteAlert";
import { useState } from "react";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import CardMenu from "../../../components/card-utils/CardMenu";

const TeacherCard = ({ teacher }: { teacher: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="shadow-sm flex flex-row hover:shadow-md pt-0 gap-0  transition-shadow duration-200 group overflow-hidden">
        <div className="relative w-72 bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 flex flex-col items-center p-6 border-r">
          <CardMenu
            onEdit={() => navigate(`/teachers/edit/${teacher.id}`)}
            onDelete={() => setConfirmDialogOpen(true)}
          />
          <div className="flex-1 flex flex-col items-center justify-center">
            <Avatar className="size-32">
              <AvatarImage src={teacher.image} />
              <AvatarFallback className="text-2xl">
                {generateImageFallBack(teacher.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg mt-3">{teacher.name}</CardTitle>
          </div>
          <div className="w-full space-y-1.5">
            <div className="flex items-center w-full justify-between bg-muted rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                  <BookOpen
                    size={14}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  Total classes
                </span>
              </div>
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="flex items-center w-full justify-between bg-muted rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-green-100 dark:bg-green -900/30">
                  <GraduationCap
                    size={14}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  Total Students
                </span>
              </div>
              <span className="text-sm font-medium">50</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col  justify-between gap-3">
          <CardContent className="pt-4 flex-1 space-y-3.5">
            <InfoRow
              icon={<Phone className="size-4" />}
              label="Phone"
              value={teacher.phone}
            />
            <InfoRow
              icon={<Mail className="size-4" />}
              label="Email"
              value={teacher.email}
            />
            <InfoRow
              icon={<MapPin className="size-4" />}
              label="Address"
              value={teacher.address}
            />
            <InfoRow
              icon={<IdCard className="size-4" />}
              label="NRC"
              value={teacher.dob && formatDate(teacher.dob)}
            />
          </CardContent>
          <div>
            <CardCretedUpdated
              createdAt={teacher.createdAt}
              updatedAt={teacher.updatedAt}
            />
            <CardFooter className="mt-3">
              <Button variant="ghost" className="w-full justify-between">
                View Teacher Details
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <TeacherDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={teacher.id}
      />
    </>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-3 group">
      <div className="p-2 text-muted-foreground rounded-md bg-muted flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground truncate">
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default TeacherCard;
