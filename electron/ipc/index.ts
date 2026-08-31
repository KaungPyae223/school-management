import { courseIPCs } from "./course.ipc";
import { studentIPCs } from "./student.ipc";
import { teacherIPCs } from "./teacher.ipc";
import { classesIPCs } from "./class.ipc";
import { enrollmentIPCs } from "./enrollment.ipc";
import { paymentIPCs } from "./payment.ipc";
import { storeIPCs } from "./store.ipc";
import { authIPCs } from "../auth/auth.ipc";
import { register2FAIPCs } from "../auth/two-factor.ipc";
import { backupIPCs } from "../auth/backup.ipc";
import { dashboardIPCs } from "./dashboard.ipc";

export const registerIpcHandlers = () => {
  courseIPCs();
  studentIPCs();
  teacherIPCs();
  classesIPCs();
  enrollmentIPCs();
  paymentIPCs();
  storeIPCs();
  authIPCs();
  register2FAIPCs();
  backupIPCs();
  dashboardIPCs();
};
