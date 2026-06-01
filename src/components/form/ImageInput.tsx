import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

const ImageInput = <T extends FieldValues = FieldValues>({
  form,
  label,
  imageInputName,
  oldImageURL,
  imageWatch,
}: {
  form: UseFormReturn<T>;
  label: string;
  imageInputName: Path<T>;
  oldImageURL?: string;
  imageWatch: File | undefined;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  console.log("imageWatch", imageWatch);

  const selectedImage = imageWatch ? URL.createObjectURL(imageWatch) : null;

  const handleImageUpload = (
    files: FileList | null,
    onChange: (file: File | undefined) => void,
  ) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG, or WebP image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    form.setValue(imageInputName, file as PathValue<T, Path<T>>);

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
    form.setValue(imageInputName, undefined, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Controller
      control={form.control}
      name={imageInputName}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="image">
            <div className="w-full">
              {label}
              <div
                className={`border-2 mb-2 mt-3 border-dashed rounded-xl p-6 text-center w-full transition-all cursor-pointer ${
                  isDragging
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
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
                      className={`h-8 w-8 my-6 mx-auto transition-colors duration-200 ${
                        isDragging ? "text-indigo-500" : "text-gray-400 "
                      }`}
                    />
                    <p className="text-sm text-gray-600 my-2">
                      Drag and drop or click to upload cover image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WebP (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </FieldLabel>
          <Input
            id="image"
            name={field.name}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(e.target.files, field.onChange);
              }
            }}
            className="hidden"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default ImageInput;
