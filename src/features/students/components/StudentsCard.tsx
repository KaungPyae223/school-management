import {
  ArrowRight,
  BookOpen,
  Calendar,
  CalendarClock,
  Clock,
  EllipsisVertical,
  Mail,
  MapPin,
  Mars,
  Pencil,
  Phone,
  Trash2,
  User,
  Venus,
  VenusAndMars,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import StudentDeleteAlert from "./StudentsDeleteAlert";
import { useState } from "react";

const StudentCard = ({ student }: { student: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const genderIcon = student.gender ? (
    student.gender === "FEMALE" ? (
      <Venus className="size-4" />
    ) : (
      <Mars className="size-4" />
    )
  ) : (
    <VenusAndMars className="size-4" />
  );
  return (
    <>
      <Card className="shadow-sm hover:shadow-md relative transition-shadow duration-200 group overflow-hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon-sm"
              variant="secondary"
              className="absolute top3 right-3 hover:bg-black/10 transition-colors duration-300"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigate(`/students/edit/${student.id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setConfirmDialogOpen(true)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardHeader className="mb-1.5">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-32">
              <AvatarImage src={student.image} />
              <AvatarFallback>{student.name}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg mt-3">{student.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-3 flex-1 space-y-3.5">
          <InfoRow
            icon={<Phone className="size-4" />}
            label="Phone"
            value={student.phone}
          />
          <InfoRow
            icon={<Mail className="size-4" />}
            label="Email"
            value={student.email}
          />
          <InfoRow
            icon={<MapPin className="size-4" />}
            label="Address"
            value={student.address}
          />
          <InfoRow
            icon={<Calendar className="size-4" />}
            label="Date of Birth"
            value={student.dob && formatDate(student.dob)}
          />
          <InfoRow icon={genderIcon} label="Gender" value={student.gender} />
        </CardContent>
        <CardContent>
          <div className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2">
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
        </CardContent>
        <CardCretedUpdated
          createdAt={student.createdAt}
          updatedAt={student.updatedAt}
        />
        <CardFooter>
          <Button variant="ghost" className="w-full justify-between">
            View Student Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>

      <StudentDeleteAlert
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        id={student.id}
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

export default StudentCard;
