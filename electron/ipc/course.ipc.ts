import { prisma } from "../db/prisma";
import { saveImage } from "../utils/saveImage";
import { showImage } from "../utils/showImage";
import { deleteImage } from "../utils/deleteImage";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { buildPageMeta, normalizeSort } from "../utils/query-utils";
import { courseRepository } from "../repository/course.repository";
import { stringify } from "csv-stringify/sync";
import { dialog } from "electron";
import fs from "fs-extra";

export const courseIPCs = () => {
  protectedHandle("course:export-csv", async (_, data) => {
    const dateStr = new Date().toISOString().split("T")[0];

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save Course Data CSV",
      defaultPath: `courses_${dateStr}.csv`,
      filters: [{ name: "CSV File", extensions: ["csv"] }],
    });

    if (canceled || !filePath) {
      return { success: false, error: "Export canceled by user." };
    }

    try {
      const { courses } = await courseRepository.index(data);

      const formattedData = courses.map(({ image, ...course }) => ({
        ...course,
        createdAt: course.createdAt ? course.createdAt.toLocaleString() : "",
        updatedAt: course.updatedAt ? course.updatedAt.toLocaleString() : "",
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

  protectedHandle("course:index", async (_, data) => {
    try {
      const { courses, totalData } = await courseRepository.index(data);

      return {
        error: null,
        data: courses.map((course: any) => ({
          ...course,
          image: showImage(course.image),
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

  protectedHandle("course:search-all", async (_, data) => {
    try {
      const courses = await courseRepository.searchAll(data);
      return {
        data: courses.map((course) => ({
          ...course,
          image: showImage(course.image),
        })),
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("course:show", async (_, id) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id },
      });
      if (!course) {
        return { error: "Course not found" };
      }
      return {
        data: {
          ...course,
          image: showImage(course.image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("course:show-details", async (_, id) => {
    try {
      const course = await courseRepository.showDetails(id);
      if (!course) {
        return { error: "Course not found" };
      }
      return {
        data: {
          ...course[0],
          image: showImage(course[0].image),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("course:get-course-classes", async (_, data) => {
    try {
      const { classes, totalData } =
        await courseRepository.showCourseClasses(data);

      return {
        error: null,
        data: classes.map((classData) => ({
          ...classData,
          image: showImage(classData.teacher_image),
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

  protectedHandle("course:create", async (_, data) => {
    try {
      const { image, imageName, ...restData } = data;

      let imageUrl = undefined;
      if (image && imageName) {
        imageUrl = await saveImage(image, imageName);
      }

      await courseRepository.create({
        ...restData,
        image: imageUrl,
      });

      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:update", async (_, data) => {
    try {
      const { id, image, imageName, ...restData } = data;

      const existingCourse = await courseRepository.show(id);

      if (existingCourse?.deleted) {
        return { success: false, error: "Deleted course cannot be updated" };
      }

      let imageUrl = undefined;
      if (image && imageName) {
        if (existingCourse?.image) {
          await deleteImage(existingCourse.image);
        }

        imageUrl = await saveImage(image, imageName);
      }

      await courseRepository.update(id, {
        ...restData,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:delete", async (_, id) => {
    try {
      const hasLinkedClasses = await courseRepository.findLinkedClass(id);

      if (hasLinkedClasses) {
        await courseRepository.update(id, { deleted: true });
        return { success: true };
      }

      const course = await courseRepository.show(id);

      if (!course) {
        return { success: false, error: "Course not found." };
      }

      if (course.image) {
        await deleteImage(course.image);
      }

      await courseRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("course:restore", async (_, id) => {
    try {
      const course = await courseRepository.show(id);

      if (!course) {
        return { success: false, error: "Course not found." };
      }

      await courseRepository.update(id, { deleted: false });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });
};
