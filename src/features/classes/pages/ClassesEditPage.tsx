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
import { Textarea } from "../../../components/ui/textarea";
import FormHeader from "../../../components/form/FormHeader";
import FormFooter from "../../../components/form/FormFooter";
import useAddBreadcrumb from "../../../hooks/use-add-breadcrumb";
import { useState } from "react";
import ConfirmDialog from "../../../components/dialog/ConfirmDialog";
import RequiredLabel from "../../../components/form/RequiredLabel";
import TimeInput from "../../../components/form/TimeInput";
import DateInput from "../../../components/form/DateInput";
import ClassesCourseInput from "../components/ClassesCourseInput";
import ClassesTeacherInput from "../components/ClassesTeacherInput";
import ClassesDayInput from "../components/ClassesDayInput";
import { toast } from "sonner";
import FormError from "../../../components/form/FormError";
import { useEditClass } from "../hooks/useEditClass";
import { useLoaderData } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";

const formSchema = z
  .object({
    teacherId: z.number().min(1, "Teacher is required"),
    courseId: z.number().min(1, "Course is required"),
    startDate: z
      .date({
        message: "Start date is required",
      })
      .refine((date) => date >= new Date(), {
        message: "Start date must be greater than or equal to today",
      }),
    startTime: z.date({ message: "Start time is required" }),
    endTime: z.date({ message: "End time is required" }),
    days: z.string().min(1, "Day is required"),
    description: z.string().optional(),
    price: z.number().min(1, "Price is required"),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["endTime"],
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["startTime"],
  });

const ClassesEditPage = () => {
  const data = useLoaderData();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useAddBreadcrumb({
    title: "Edit Class",
    params: [
      {
        name: "Classes",
        link: "/classes",
      },
      {
        name: "Edit",
        link: "/classes/edit",
      },
    ],
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: data.teacher.id,
      courseId: data.course.id,
      startDate: data.startDate,
      startTime: data.startTime,
      endTime: data.endTime,
      days: data.days,
      description: data.description ?? "",
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useEditClass();

  const editClass = async () => {
    setErrorMessage("");
    try {
      const data = form.getValues();

      await mutateAsync(data);

      toast.success("Class editd successfully");
      form.reset();
    } catch (error: unknown) {
      toast.error((error as Error).message);
      setErrorMessage((error as Error).message);
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
      <FormHeader title="Edit Class" />
      <CardContent>
        <form id="edit-class-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormError errorMessage={errorMessage} />

            <Field>
              <Label>Batch</Label>

              <Input value={data.batch} readOnly />
            </Field>

            <Controller
              name="courseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesCourseInput
                  field={field}
                  fieldState={fieldState}
                  setValue={form.setValue}
                  defaultSelectedCourse={{
                    id: data.course.id,
                    image: data.course_image,
                    price: data.price,
                    name: data.course.name,
                  }}
                />
              )}
            />
            <Controller
              name="teacherId"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesTeacherInput
                  field={field}
                  fieldState={fieldState}
                  defaultSelectedTeacher={{
                    id: data.id,
                    image: data.teacher_image,
                    name: data.teacher.name,
                  }}
                />
              )}
            />
            <Controller
              name="days"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="days">Day</RequiredLabel>
                  <ClassesDayInput field={field} fieldState={fieldState} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <RequiredLabel id="startDate">Start Date</RequiredLabel>

                  <DateInput
                    field={field}
                    label="Start Date"
                    ariaInvalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="startTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="startTime">Start Time</RequiredLabel>

                    <TimeInput
                      field={field}
                      fieldState={fieldState}
                      id="startTime"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="endTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <RequiredLabel id="endTime">End Time</RequiredLabel>
                    <TimeInput
                      field={field}
                      fieldState={fieldState}
                      id="endTime"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="classDescription">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="classDescription"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter class description"
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
        formID="edit-class-form"
        isSubmitting={isPending}
        resetForm={resetForm}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={editClass}
        title="Edit this class?"
        description="Please confirm that you want to edit this class with the provided information. You can edit the class later if needed."
      />
    </Card>
  );
};

export default ClassesEditPage;
