import { showImage } from "../utils/showImage";
import { formatTime } from "../utils/formatTime";
import { generateStatus } from "../utils/generateStatus";
import { protectedHandle } from "../auth/ipc/protected.ipc";
import { classRepository } from "../repository/class.repository";
import { buildPageMeta } from "../utils/query-utils";
import { stringify } from "csv-stringify/sync";
import { dialog } from "electron";
import fs from "fs-extra";

export const classesIPCs = () => {
  protectedHandle("class:export-csv", async (_, data) => {
    const dateStr = new Date().toISOString().split("T")[0];

    const { canceled, filePath } = await dialog.showSaveDialog({
      title: "Save Class Data CSV",
      defaultPath: `classes_${dateStr}.csv`,
      filters: [{ name: "CSV File", extensions: ["csv"] }],
    });

    if (canceled || !filePath) {
      return { success: false, error: "Export canceled by user." };
    }

    try {
      const { classes } = await classRepository.index(data);

      const formattedData = classes.map(
        ({ teacher_image, course_image, ...classData }) => ({
          ...classData,
          startDate: classData.startDate
            ? classData.startDate.toLocaleString()
            : "",
          endDate: classData.endDate ? classData.endDate.toLocaleString() : "",
          startTime: classData.startTime
            ? classData.startTime.toLocaleString()
            : "",
          endTime: classData.endTime ? classData.endTime.toLocaleString() : "",
          createdAt: classData.createdAt
            ? classData.createdAt.toLocaleString()
            : "",
          updatedAt: classData.updatedAt
            ? classData.updatedAt.toLocaleString()
            : "",
        }),
      );

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

  protectedHandle("class:index", async (_, data) => {
    try {
      const { classes, totalData } = await classRepository.index(data);

      return {
        error: null,
        data: classes.map((classData: any) => ({
          ...classData,
          course_image: showImage(classData.course_image),
          teacher_image: showImage(classData.teacher_image),
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

  protectedHandle("class:show", async (_, id) => {
    try {
      const classData = await classRepository.show(id);
      if (!classData) {
        return { error: "Class not found" };
      }
      return {
        data: {
          ...classData,
          course_image: showImage(classData.course.image),
          teacher_image: showImage(classData.teacher.image),
          status: generateStatus(classData.startDate, classData.endDate),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("class:detail", async (_, id) => {
    try {
      const classes = await classRepository.showDetails(id);
      if (!classes) {
        return { error: "Class not found" };
      }
      return {
        data: {
          ...classes[0],
          course_image: showImage(classes[0].course_image),
          teacher_image: showImage(classes[0].teacher_image),
          status: generateStatus(classes[0].startDate, classes[0].endDate),
        },
      };
    } catch (error: any) {
      console.error(error);
      return { error: error.message };
    }
  });

  protectedHandle("class:create", async (_, data) => {
    try {
      const latestBath = await classRepository.getCourseLastClassBatch(
        data.courseId,
      );

      const checkTeacherBusy: any[] = await classRepository.isTeacherBusy(
        data.teacherId,
        data.days,
        data.startTime,
        data.endTime,
      );

      if (checkTeacherBusy.length > 0) {
        throw new Error(
          `Teacher has a schedule conflict on ${checkTeacherBusy[0].days} at ${formatTime(checkTeacherBusy[0].startTime)} to ${formatTime(checkTeacherBusy[0].endTime)}. Please choose another day or time.`,
        );
      }

      await classRepository.create({
        ...data,
        batch: latestBath ? latestBath.batch + 1 : 1,
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:update", async (_, data) => {
    try {
      const { id, ...restData } = data;

      if (restData.teacherId) {
        const checkTeacherBusy: any[] = await classRepository.isTeacherBusy(
          restData.teacherId,
          restData.days,
          restData.startTime,
          restData.endTime,
          id,
        );

        if (checkTeacherBusy.length > 0) {
          throw new Error(
            `Teacher has a schedule conflict on ${checkTeacherBusy[0].days} at ${formatTime(checkTeacherBusy[0].startTime)} to ${formatTime(checkTeacherBusy[0].endTime)}. Please choose another day or time.`,
          );
        }
      }

      await classRepository.update(id, {
        ...restData,
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:delete", async (_, id) => {
    try {
      const hasLinkedStudents = await classRepository.hasLinkedStudents(id);

      if (hasLinkedStudents) {
        return { success: false, error: "Class has linked students" };
      }

      await classRepository.delete(id);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });

  protectedHandle("class:complete", async (_, id) => {
    try {
      await classRepository.update(id, {
        endDate: new Date().toISOString(),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  });
};
