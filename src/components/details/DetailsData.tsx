import type { LucideIcon } from "lucide-react";

const DetailsData = ({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-2 p-3 border rounded-md">
      <div className="flex items-center text-sm gap-1.5 text-muted-foreground">
        <Icon size={13} />
        {label}
      </div>
      {children}
    </div>
  );
};

export default DetailsData;
