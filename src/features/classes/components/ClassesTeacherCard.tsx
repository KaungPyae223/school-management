import { useTranslation } from "react-i18next";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { cn } from "../../../lib/utils";
import { generateImageFallBack } from "../../../utils/generate-image-fallback";

const ClassesTeacherCard = ({
  image,
  name,
  className,
}: {
  image: string;
  name: string;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        " flex items-center gap-3 border rounded-md p-3",
        className,
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{generateImageFallBack(name)}</AvatarFallback>
      </Avatar>

      <div>
        <p className="text-xs text-muted-foreground">{t("classes.fields.teacher")}</p>
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

export default ClassesTeacherCard;

