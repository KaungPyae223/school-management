import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const CardInfo = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 group">
      <div className="p-2 text-muted-foreground rounded-md bg-muted flex items-center justify-center shrink-0">
        <Icon size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-foreground truncate">
          {value || t("students.na")}
        </p>
      </div>
    </div>
  );
};

export default CardInfo;
