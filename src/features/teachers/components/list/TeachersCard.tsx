import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BookOpen,
  DoorOpen,
  GraduationCap,
  IdCard,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";
import CardCretedUpdated from "../../../../components/card-utils/CardCretedUpdated";

import { useNavigate } from "react-router";
import TeachersDeleteAlert from "../alerts/TeachersDeleteAlert";
import { useState } from "react";
import { generateImageFallBack } from "../../../../utils/generate-image-fallback";
import CardMenu from "../../../../components/card-utils/CardMenu";
import CardInfo from "../../../../components/card-utils/CardInfo";
import CardMeta from "../../../../components/card-utils/CardMeta";
import TeachersRestoreAlert from "../alerts/TeachersRestoreAlert";
import { replaceLocalDigit } from "../../../../utils/replace-local-digit";

const TeacherCard = ({ teacher }: { teacher: any }) => {
  const { t } = useTranslation();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] =
    useState<boolean>(false);
  const [restoreConfirmDialogOpen, setRestoreConfirmDialogOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  console.log(teacher);

  return (
    <>
      <Card className="shadow-xs flex flex-row hover:shadow-md pt-0 gap-0  transition-shadow duration-200 group overflow-hidden">
        <div className="relative w-72 bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 flex flex-col items-center p-6 border-r">
          <CardMenu
            onEdit={() => navigate(`/teachers/edit/${teacher.id}`)}
            onDelete={() => setDeleteConfirmDialogOpen(true)}
            onRestore={() => setRestoreConfirmDialogOpen(true)}
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
            <CardMeta
              icon={BookOpen}
              title={t("teachers.totalClasses")}
              value={teacher.total_classes}
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            />
            <CardMeta
              icon={GraduationCap}
              title={t("teachers.totalStudents")}
              value={teacher.total_students}
              className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
            />
            <CardMeta
              icon={DoorOpen}
              title={"Withdrawn Students"}
              value={teacher.withdrawn_students}
              className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col  justify-between gap-3">
          <CardContent className="pt-4 flex-1 space-y-3.5">
            <CardInfo
              icon={Phone}
              label={t("teachers.fields.phone")}
              value={replaceLocalDigit(teacher.phone)}
            />
            <CardInfo
              icon={Mail}
              label={t("teachers.fields.email")}
              value={teacher.email}
            />
            <CardInfo
              icon={MapPin}
              label={t("teachers.fields.address")}
              value={teacher.address}
            />
            <CardInfo
              icon={IdCard}
              label={t("teachers.fields.nrc")}
              value={teacher.nrc}
            />
          </CardContent>
          <div>
            <CardCretedUpdated
              createdAt={teacher.createdAt}
              updatedAt={teacher.updatedAt}
            />
            <CardFooter className="mt-3">
              <Button
                variant="ghost"
                className="w-full justify-between cursor-pointer"
                onClick={() => navigate(`/teachers/details/${teacher.id}`)}
              >
                {t("teachers.viewTeacherDetails")}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>

      <TeachersDeleteAlert
        confirmDialogOpen={deleteConfirmDialogOpen}
        setConfirmDialogOpen={setDeleteConfirmDialogOpen}
        id={teacher.id}
      />

      <TeachersRestoreAlert
        confirmDialogOpen={restoreConfirmDialogOpen}
        setConfirmDialogOpen={setRestoreConfirmDialogOpen}
        id={teacher.id}
      />
    </>
  );
};

export default TeacherCard;
