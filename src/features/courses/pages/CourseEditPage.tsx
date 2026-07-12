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
import RequiredLabel from "../../../components/form/RequiredLabel";
import FormError from "../../../components/form/FormError";

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
  description: z.string().optional(),
  price: z.number().min(0, "Price must be at least 0"),
});

const CourseEditPage = () => {
  const navigate = useNavigate();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const course = useLoaderData();

  useAddBreadcrumb({
    title: "Edit Course",
    params: [
      {
        name: "Courses",
        link: "/courses",
      },
      {
        name: "Edit",
        link: "/courses/edit",
      },
    ],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      name: course.name,
      description: course.description ?? "",
      price: course.price,
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useUpdateCourse();

  const editCourse = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();
      const imageData = await generateImageData(data.image);

      await mutateAsync({
        ...data,
        ...imageData,
        id: course.id,
      });

      toast.success("Course edited successfully");
      navigate("/courses");
    } catch (error: any) {
      toast.error(error.message);
      setErrorMessage(error.message);
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setErrorMessage("");
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title="Edit Course" />
      <CardContent>
        <form id="edit-course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />
            <Controller
              control={form.control}
              name={"image"}
              render={({ field, fieldState }) => (
                <ImageInput
                  required
                  label="Image"
                  id="image"
                  field={field}
                  fieldState={fieldState}
                  oldImageURL={course.image}
                />
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="name">Name</RequiredLabel>
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
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="price">Price</RequiredLabel>
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
          </FieldGroup>
        </form>
      </CardContent>
      <FormFooter
        formID="edit-course-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editCourse}
        title="Edit this course?"
        description="Please confirm that you want to edit this course with the provided information. You can edit the course later if needed."
      />
    </Card>
  );
};

export default CourseEditPage;
