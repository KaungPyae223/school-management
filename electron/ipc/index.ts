import { courseIPCs } from "./course.ipc";
import { studentIPCs } from "./student.ipc";
import { teacherIPCs } from "./teacher.ipc";
import { classesIPCs } from "./classes.ipc";
import { enrollmentIPCs } from "./enrollment.ipc";
import { paymentIPCs } from "./payment.ipc";

export const registerIpcHandlers = () => {
  courseIPCs();
  studentIPCs();
  teacherIPCs();
  classesIPCs();
  enrollmentIPCs();
  paymentIPCs();
};
