import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { buildPageMeta } from "../utils/query-utils";
import { studentRepository } from "../repository/student.repository";
import { stringify } from "csv-stringify/sync";
import { dialog } from "electron";
import fs from "fs-extra";

export const studentIPCs = () => {
  protectedHandle("student:export-csv", async (_, data) => {
    const dateStr = new Date().toISOString().split("T")[0];

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save Student Data CSV",
      defaultPath: `students_${dateStr}.csv`,
      filters: [{ name: "CSV File", extensions: ["csv"] }],
    });

    if (canceled || !filePath) {
      return { success: false, error: "Export canceled by user." };
    }

    try {
      const { students } = await studentRepository.index(data);

      const formattedData = students.map(({ image, ...student }) => ({
        ...student,
        createdAt: student.createdAt ? student.createdAt.toISOString() : "",
        updatedAt: student.updatedAt ? student.updatedAt.toISOString() : "",
      }));

      const csvContent = stringify(formattedData, {
        header: true,
      });

      await fs.writeFile(filePath, csvContent, "utf-8");
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return {
        error: error.message,
      };
    }
  });
  protectedHandle("student:index", async (_, data) => {
    try {
      const { students, totalData } = await studentRepository.index(data);

      return {
        error: null,
        data: students.map((student: any) => ({
          ...student,
          image: showImage(student.image),
        })),
        meta: buildPageMeta(totalData, data.page, data.limit),
      };
    } catch (error: any) {
      console.error(error);
      return {
        error: error.message,
        data: [],
        meta: buildPageMeta(),
      };
    }
  });

  protectedHandle("student:show", async (_, id) => {
    try {
      const student = await studentRepository.show(id);
      if (!student) {
        return { error: "Student not found" };
      }
      return {
        data: {
          ...student,
          image: showImage(student.image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("student:show-details", async (_, id) => {
    try {
      const student = await studentRepository.showDetails(id);
      if (!student) {
        return { error: "Student not found" };
      }
      return {
        data: {
          ...student[0],
          image: showImage(student[0].image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("student:search-all-active", async (_, data) => {
    try {
      const students = await studentRepository.searchAllActive(data);
      return {
        data: students.map((student) => ({
          ...student,
          image: showImage(student.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("student:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      const existing = await studentRepository.createValidate(restData);

      if (existing) {
        if (restData.email !== null && existing.email === restData.email)
          return { success: false, error: "Email already exists" };
        if (restData.phone !== null && existing.phone === restData.phone)
          return { success: false, error: "Phone already exists" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await studentRepository.create({
        ...restData,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const validate = await studentRepository.updateValidate(id, restData);

      if (validate) {
        if (restData.email !== null && validate.email === restData.email)
          return { success: false, error: "Email already exists" };
        if (restData.phone !== null && validate.phone === restData.phone)
          return { success: false, error: "Phone already exists" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        const existingStudent = await studentRepository.findImageById(id);

        if (existingStudent && existingStudent.image) {
          await deleteImage(existingStudent.image);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await studentRepository.update(id, {
        ...restData,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:delete", async (_, id) => {
    try {
      const hasLinkedEnrollment =
        await studentRepository.hasLinkedEnrollment(id);

      if (hasLinkedEnrollment) {
        return {
          success: false,
          error: "Student has linked enrollment. Cannot delete",
        };
      }

      const studentData = await studentRepository.findImageById(id);

      if (studentData?.image) {
        await deleteImage(studentData.image);
      }

      await studentRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("student:get-attended-classes", async (_, data) => {
    try {
      const { classes, totalData } =
        await studentRepository.getAttendedClasses(data);

      return {
        error: null,
        data: classes.map((item: any) => ({
          ...item,
          teacher_image: showImage(item.teacher_image),
          course_image: showImage(item.course_image),
        })),
        meta: buildPageMeta(totalData, data.page, data.limit),
      };
    } catch (error: any) {
      console.error(error);
      return {
        error: error.message,
        data: [],
        meta: buildPageMeta(),
      };
    }
  });
};
