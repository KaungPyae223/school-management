import { courseIPCs } from "./course.ipc";
import { studentIPCs } from "./student.ipc";
import { teacherIPCs } from "./teacher.ipc";
import { classesIPCs } from "./class.ipc";
import { enrollmentIPCs } from "./enrollment.ipc";
import { paymentIPCs } from "./payment.ipc";
import { storeIPCs } from "./store.ipc";

import { dashboardIPCs } from "./dashboard.ipc";
import { setupIPCs } from "./setup.ipc";
import { authIPCs } from "../auth/ipc/auth.ipc";
import { register2FAIPCs } from "../auth/ipc/twofactor.ipc";
import { backupIPCs } from "../auth/ipc/backup.ipc";

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
  setupIPCs();
};
