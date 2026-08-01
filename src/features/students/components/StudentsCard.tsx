import {
  ArrowRight,
  BookOpen,
  Calendar,
  Mail,
  MapPin,
  Mars,
  Phone,
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
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { formatDate } from "../../../utils/format-date";
import CardCretedUpdated from "../../../components/card-utils/CardCretedUpdated";

import { useNavigate } from "react-router";
import StudentDeleteAlert from "./StudentsDeleteAlert";
import { useState } from "react";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";
import CardMenu from "../../../components/card-utils/CardMenu";
import CardInfo from "../../../components/card-utils/CardInfo";
import CardMeta from "../../../components/card-utils/CardMeta";

const StudentCard = ({ student }: { student: any }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const genderIcon = student.gender
    ? student.gender === "FEMALE"
      ? Venus
      : Mars
    : VenusAndMars;
  return (
    <>
      <Card className="shadow-sm hover:shadow-md  relative transition-shadow duration-200 group overflow-hidden">
        <CardMenu
          onEdit={() => navigate(`/students/edit/${student.id}`)}
          onDelete={() => setConfirmDialogOpen(true)}
        />

        <CardHeader className="mb-1.5">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-32">
              <AvatarImage src={student.image} />
              <AvatarFallback>
                {generateImageFallBack(student.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg mt-3">{student.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-3 flex-1 space-y-3.5">
          <CardInfo icon={Phone} label="Phone" value={student.phone} />
          <CardInfo icon={Mail} label="Email" value={student.email} />
          <CardInfo icon={MapPin} label="Address" value={student.address} />
          <CardInfo
            icon={Calendar}
            label="Date of Birth"
            value={student.dob && formatDate(student.dob)}
          />
          <CardInfo icon={genderIcon} label="Gender" value={student.gender} />
        </CardContent>
        <CardContent>
          <CardMeta
            icon={BookOpen}
            title="Total classes"
            value={student.total_classes}
            className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          />
        </CardContent>
        <CardCretedUpdated
          createdAt={student.createdAt}
          updatedAt={student.updatedAt}
        />
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full justify-between cursor-pointer"
            onClick={() => navigate(`/students/details/${student.id}`)}
          >
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

export default StudentCard;
