import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import * as z from "zod";

import { Card, CardContent } from "../../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import ImageInput from "../../../components/form/ImageInput";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import { useLoaderData, useNavigate } from "react-router";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import { generateImageData } from "../../../utils/generate-image-data";

const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported",
      },
    )
    .optional(),
  name: z.string().min(1, "Course name must be at least 1 characters."),
  description: z.string().min(1, "Description must be at least 1 characters."),
  price: z.number().min(0, "Price must be at least 0"),
});

const CourseUpdatePage = () => {
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const course = useLoaderData();

  useAddBreadcrumb({
    title: "Update Course",
    params: [
      {
        name: "Courses",
        link: "/courses",
      },
      {
        name: "Update",
        link: "/courses/update",
      },
    ],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: course.name,
      description: course.description,
      price: course.price,
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useUpdateCourse();

  const updateCourse = async () => {
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
        id: course.id,
      });

      toast.success("Course updated successfully");
      navigate("/courses");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title="Update Course" />
      <CardContent>
        <form id="create-course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <ImageInput
              label="Image"
              form={form}
              imageInputName="image"
              imageWatch={form.watch("image")}
              oldImageURL={course.image}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter course name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter course description"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? undefined : Number(val));
                    }}
                    placeholder="Enter course price"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        form={form}
        formID="create-course-form"
        isSubmitting={isPending}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={updateCourse}
        title="Update this course?"
        description="Please confirm that you want to update this course with the provided information. You can edit the course later if needed."
      />
    </Card>
  );
};

export default CourseUpdatePage;
