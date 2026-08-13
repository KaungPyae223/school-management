import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";

const CardDayBadge = ({
  day,
  variant,
}: {
  day: string;
  variant?: "default" | "outline" | "secondary";
}) => {
  const { t, i18n } = useTranslation();

  const language = i18n.language;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={variant} key={day}>
          {t(`general.days.${day}` as any)}
        </Badge>
      </TooltipTrigger>
      {language == "en-GB" && (
        <TooltipContent>{t(`classes.days.${day}` as any)}</TooltipContent>
      )}
    </Tooltip>
  );
};

export default CardDayBadge;
