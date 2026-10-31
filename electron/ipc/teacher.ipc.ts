import { prisma } from "../db/prisma";
import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { Prisma } from "../../generated/prisma/client";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { teacherRepository } from "../repository/teacher.repository";
import { buildPageMeta } from "../utils/query-utils";
import { stringify } from "csv-stringify/sync";
import { dialog } from "electron";
import fs from "fs-extra";

export const teacherIPCs = () => {
  protectedHandle("teacher:export-csv", async (_, data) => {
    const dateStr = new Date().toISOString().split("T")[0];

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save Teacher Data CSV",
      defaultPath: `teachers_${dateStr}.csv`,
      filters: [{ name: "CSV File", extensions: ["csv"] }],
    });

    if (canceled || !filePath) {
      return { success: false, error: "Export canceled by user." };
    }

    try {
      const { teachers } = await teacherRepository.index(data);

      const formattedData = teachers.map(({ image, ...teacher }) => ({
        ...teacher,
        createdAt: teacher.createdAt ? teacher.createdAt.toISOString() : "",
        updatedAt: teacher.updatedAt ? teacher.updatedAt.toISOString() : "",
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

  protectedHandle("teacher:index", async (_, data) => {
    try {
      const { teachers, totalData } = await teacherRepository.index(data);

      return {
        error: null,
        data: teachers.map((teacher) => ({
          ...teacher,
          image: showImage(teacher.image),
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

  protectedHandle("teacher:get-teacher-classes", async (_, data) => {
    try {
      const { classes, totalData } =
        await teacherRepository.getTeacherClasses(data);

      return {
        error: null,
        data: classes.map((classData) => ({
          ...classData,
          image: showImage(classData.course_image),
          status: generateStatus(classData.startDate, classData.endDate),
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

  protectedHandle("teacher:search-all", async (_, data) => {
    try {
      const teachers = await teacherRepository.searchAll(data);
      return {
        data: teachers.map((teacher) => ({
          ...teacher,
          image: showImage(teacher.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("teacher:show", async (_, id) => {
    try {
      const teacher = await teacherRepository.show(id);
      if (!teacher) {
        return { error: "Teacher not found" };
      }
      return {
        data: {
          ...teacher,
          image: showImage(teacher.image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("teacher:show-details", async (_, id) => {
    try {
      const teacher = await teacherRepository.showDetals(id);
      if (!teacher) {
        return { error: "Teacher not found" };
      }
      return {
        data: {
          ...teacher[0],
          image: showImage(teacher[0].image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("teacher:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      const validate = await teacherRepository.createValidate(restData);

      if (validate) {
        if (restData.nrc !== null && validate.nrc === restData.nrc)
          return { success: false, error: "NRC already exists" };
        if (restData.email !== null && validate.email === restData.email)
          return { success: false, error: "Email already exists" };
        if (restData.phone !== null && validate.phone === restData.phone)
          return { success: false, error: "Phone already exists" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await teacherRepository.create({
        ...restData,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const validate = await teacherRepository.updateValidate(id, restData);

      if (validate) {
        if (restData.nrc !== null && validate.nrc === restData.nrc)
          return { success: false, error: "NRC already exists" };
        if (restData.email !== null && validate.email === restData.email)
          return { success: false, error: "Email already exists" };
        if (restData.phone !== null && validate.phone === restData.phone)
          return { success: false, error: "Phone already exists" };
      }

      const existingTeacher = await teacherRepository.show(id);

      if (existingTeacher?.deleted) {
        return { success: false, error: "Deleted teacher cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingTeacher?.image) {
          await deleteImage(existingTeacher.image);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await teacherRepository.update(id, {
        ...restData,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:delete", async (_, id) => {
    try {
      const hasLinkedClasses = await teacherRepository.findLinkedClass(id);

      if (hasLinkedClasses) {
        await teacherRepository.update(id, { delete: true });
        return { success: true };
      }

      const teacherData = await prisma.teacher.findUnique({
        where: { id },
        select: { image: true },
      });

      if (teacherData?.image) {
        await deleteImage(teacherData.image);
      }

      await teacherRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("teacher:restore", async (_, id) => {
    try {
      await teacherRepository.update(id, {
        deleted: false,
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });
};
