import { getAllCourses, createCourse } from "./course.ipc.js";

export const registerIpcHandlers = () => {
  // Course Handler
  getAllCourses();
  createCourse();
};
