import { useTranslation } from "react-i18next";
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

import { replaceLocalDigit } from "../../../utils/replace-local-digit";

const StudentCard = ({ student }: { student: any }) => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const genderIcon = student.gender
    ? student.gender === "FEMALE"
      ? Venus
      : Mars
    : VenusAndMars;

  const getGenderLabel = (gender: string) => {
    if (gender === "FEMALE") return t("students.fields.female");
    if (gender === "MALE") return t("students.fields.male");
    return gender;
  };

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
          <CardInfo icon={Phone} label={t("students.fields.phone")} value={replaceLocalDigit(student.phone)} />
          <CardInfo icon={Mail} label={t("students.fields.email")} value={student.email} />
          <CardInfo icon={MapPin} label={t("students.fields.address")} value={student.address} />
          <CardInfo
            icon={Calendar}
            label={t("students.fields.dob")}
            value={student.dob && formatDate(student.dob)}
          />
          <CardInfo
            icon={genderIcon}
            label={t("students.fields.gender")}
            value={getGenderLabel(student.gender)}
          />
        </CardContent>
        <CardContent>
          <CardMeta
            icon={BookOpen}
            title={t("students.totalClasses")}
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
            {t("students.viewStudentDetails")}
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
