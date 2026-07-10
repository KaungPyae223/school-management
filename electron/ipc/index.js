import { courseIPCs } from "./course.ipc.js";
import { studentIPCs } from "./student.ipc.js";
import { teacherIPCs } from "./teacher.ipc.js";
import { classesIPCs } from "./classs.ipc.js";

export const registerIpcHandlers = () => {
  courseIPCs();
  studentIPCs();
  teacherIPCs();
  classesIPCs();
};
