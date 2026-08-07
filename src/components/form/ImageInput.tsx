import { useTranslation } from "react-i18next";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import type {
  ControllerRenderProps,
  ControllerFieldState,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { toast } from "sonner";
import { cn } from "../../lib/utils";

const ImageInput = <T extends FieldValues = FieldValues>({
  required,
  label,
  id,
  field,
  fieldState,
  oldImageURL,
}: {
  required?: boolean;
  label: string;
  id: string;
  field: ControllerRenderProps<T, FieldPath<T>>;
  fieldState: ControllerFieldState;
  oldImageURL?: string;
}) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const selectedImage = field.value ? URL.createObjectURL(field.value) : null;

  const handleImageUpload = (
    files: FileList | null,
    onChange: (file: File | undefined) => void,
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      toast.error(t("validation.fileFormat"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("validation.fileSize"));
      return;
    }

    onChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    onChange: (file: File | undefined) => void,
  ) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files, onChange);
  };

  const clearImage = () => {
    field.onChange(undefined);
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={id}>
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            {label}
            {required && (
              <span className="text-muted-foreground text-xs">{t("form.required")}</span>
            )}
          </div>
          <div
            className={cn(
              "border-2 mt-3 border-dashed rounded-xl p-6 text-center w-full transition-all cursor-pointer",
              isDragging
                ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, field.onChange)}
          >
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Project cover"
                  className="w-full mx-auto max-h-64 object-cover rounded-lg shadow-sm"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-8 w-8 p-0 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearImage();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : oldImageURL ? (
              <img
                src={oldImageURL}
                alt="Project cover"
                className="w-full mx-auto max-h-64 object-cover rounded-lg shadow-sm"
              />
            ) : (
              <div>
                <Upload
                  className={cn(
                    "h-8 w-8 my-6 mx-auto transition-colors duration-200",
                    isDragging ? "text-indigo-500" : "text-gray-400",
                  )}
                />
                <p className="text-sm text-gray-600 my-2">
                  {t("form.dragAndDrop")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("form.imageFormats")}
                </p>
              </div>
            )}
          </div>
        </div>
      </FieldLabel>
      <Input
        id={id}
        name={field.name}
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageUpload(e.target.files, field.onChange);
        }}
        className="hidden"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

export default ImageInput;
