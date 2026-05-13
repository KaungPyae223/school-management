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

const ImageInput = <T extends FieldValues = FieldValues>({
  form,
  label,
  imageInputName,
  previewImageURL,
}: {
  form: UseFormReturn<T>;
  label: string;
  imageInputName: Path<T>;
  previewImageURL?: string;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG, PNG, WebP, or SVG image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    form.setValue(imageInputName, file as PathValue<T, Path<T>>);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const clearImage = () => {
    setSelectedImage(null);
    form.setValue(imageInputName, undefined);
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
                onDrop={handleDrop}
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
                        e.stopPropagation();
                        clearImage();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : previewImageURL ? (
                  <img
                    src={previewImageURL}
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
                form.setValue(imageInputName, file as PathValue<T, Path<T>>);
                handleImageUpload(e.target.files);
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
