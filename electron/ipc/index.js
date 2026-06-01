import { courseIPCs } from "./course.ipc.js";
import { studentIPCs } from "./student.ipc.js";

export const registerIpcHandlers = () => {
  courseIPCs();
  studentIPCs();
};
