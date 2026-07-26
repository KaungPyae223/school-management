import type { LucideIcon } from "lucide-react";

const TableIconContent = ({
  icon: Icon,
  value,
  align = "left",
}: {
  icon: LucideIcon;
  value: string | number | null | undefined;
  align?: "right" | "left" | "center";
}) => {
  const alignment = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex items-center gap-1.5 w-full ${alignment[align]}`}>
      <Icon className="h-4 w-4 text-muted-foreground/60" />
      <span className="font-medium line-clamp-1">{value || "--"}</span>
    </div>
  );
};

export default TableIconContent;
