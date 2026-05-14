import { createCourse, updateCourse } from "./course.ipc.js";

export const registerIpcHandlers = () => {
  createCourse();
  updateCourse();
};
