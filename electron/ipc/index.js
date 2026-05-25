import { getAllCourses, createCourse } from "./course.ipc.js";

export const registerIpcHandlers = () => {
  getAllCourses();
  createCourse();
};
