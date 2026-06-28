import { FieldLabel } from "../ui/field";

const RequiredLabel = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <FieldLabel
      htmlFor={id}
      className="flex flex-row justify-between items-center"
    >
      {children} *{" "}
      <span className="text-muted-foreground text-xs">Required</span>
    </FieldLabel>
  );
};

export default RequiredLabel;
