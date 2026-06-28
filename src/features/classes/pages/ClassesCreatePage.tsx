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
import { useCreateCourse } from "../../courses/hooks/useCreateCourse";
import TimeInput from "../../../components/form/TimeInput";
import DateInput from "../../../components/form/DateInput";
import ClassesCourseInput from "../components/ClassesCourseInput";
import ClassesTeacherInput from "../components/ClassesTeacherInput";
import ClassesDayInput from "../components/ClassesDayInput";

const formSchema = z
  .object({
    teacherID: z.number().min(1, "Teacher is required"),
    courseID: z.number().min(1, "Course is required"),
    startDate: z
      .date({
        message: "Start date is required",
      })
      .refine((date) => date > new Date(), {
        message: "Start date must be greater than today",
      }),
    startTime: z.date({ message: "Start time is required" }),
    endTime: z.date({ message: "End time is required" }),
    days: z.string().min(1, "Day is required"),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },
    {
      message: "Start time must be before end time",
      path: ["startTime", "endTime"],
    },
  );

const ClassesCratePage = () => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  useAddBreadcrumb({
    title: "Create Class",
    params: [
      {
        name: "Classes",
        link: "/classes",
      },
      {
        name: "Create",
        link: "/classes/create",
      },
    ],
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherID: 0,
      courseID: 0,
      startDate: undefined,
      startTime: undefined,
      endTime: undefined,
      days: "",
      description: undefined,
    },
  });

  const onSubmit = () => {
    setConfirmDialogOpen(true);
  };

  const { mutateAsync, isPending } = useCreateCourse();

  const createCourse = async () => {};

  return (
    <Card className="w-full sm:max-w-lg mx-auto shadow-sm">
      <FormHeader title="Create Class" />
      <CardContent>
        <form id="create-course-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="courseID"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesCourseInput field={field} fieldState={fieldState} />
              )}
            />
            <Controller
              name="teacherID"
              control={form.control}
              render={({ field, fieldState }) => (
                <ClassesTeacherInput field={field} fieldState={fieldState} />
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
        form={form}
        formID="create-course-form"
        isSubmitting={isPending}
      />

      <ConfirmDialog
        confirmDialogOpen={confirmDialogOpen}
        setConfirmDialogOpen={setConfirmDialogOpen}
        onConfirm={createCourse}
        title="Create this course?"
        description="Please confirm that you want to create this course with the provided information. You can edit the course later if needed."
      />
    </Card>
  );
};

export default ClassesCratePage;
