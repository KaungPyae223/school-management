import { courseIPCs } from "./course.ipc";
import { studentIPCs } from "./student.ipc";
import { teacherIPCs } from "./teacher.ipc";
import { classesIPCs } from "./class.ipc";
import { enrollmentIPCs } from "./enrollment.ipc";
import { paymentIPCs } from "./payment.ipc";
import { storeIPCs } from "./store.ipc";
import { authIPCs } from "./auth.ipc";

export const registerIpcHandlers = () => {
  courseIPCs();
  studentIPCs();
  teacherIPCs();
  classesIPCs();
  enrollmentIPCs();
  paymentIPCs();
  storeIPCs();
  authIPCs();
};
