import { FieldLabel } from "../ui/field";

const RequiredLabel = ({ id, title }: { id: string; title: string }) => {
  return (
    <FieldLabel
      htmlFor={id}
      className="flex flex-row justify-between items-center"
    >
      {title} * <span className="text-muted-foreground text-xs">Required</span>
    </FieldLabel>
  );
};

export default RequiredLabel;
