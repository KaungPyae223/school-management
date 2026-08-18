const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronStore", {
  get: (key) => ipcRenderer.invoke("store:get", key),
  set: (key, value) => ipcRenderer.invoke("store:set", key, value),
  delete: (key) => ipcRenderer.invoke("store:delete", key),
});

contextBridge.exposeInMainWorld("authAPI", {
  getRemainTime: () => ipcRenderer.invoke("auth:get-remain-time"),
  isAuthenticated: () => ipcRenderer.invoke("auth:is-authenticated"),
  hasPassword: () => ipcRenderer.invoke("auth:has-password"),
  setPassword: (plainPassword) =>
    ipcRenderer.invoke("auth:set-password", plainPassword),
  changePassword: (oldPassword, newPassword) =>
    ipcRenderer.invoke("auth:change-password", oldPassword, newPassword),
  verifyPassword: (plainPassword) =>
    ipcRenderer.invoke("auth:verify-password", plainPassword),

  // 2FA
  generate2FA: () => ipcRenderer.invoke("auth:2fa-generate"),
  enable2FA: (token, backupCodes) =>
    ipcRenderer.invoke("auth:2fa-enable", token, backupCodes),
  verify2FA: (token) => ipcRenderer.invoke("auth:2fa-verify", token),
  disable2FA: (token) => ipcRenderer.invoke("auth:2fa-disable", token),
  is2FAEnabled: () => ipcRenderer.invoke("auth:2fa-is-enabled"),
  is2FAVerified: () => ipcRenderer.invoke("auth:2fa-is-verified"),
});

contextBridge.exposeInMainWorld("api", {
  // Course
  getAllCourses: (data) => ipcRenderer.invoke("course:index", data),
  searchAllCourses: (data) =>
    ipcRenderer.invoke("course:search-all-active", data),
  getCourse: (id) => ipcRenderer.invoke("course:show", id),
  createCourse: (data) => ipcRenderer.invoke("course:create", data),
  updateCourse: (data) => ipcRenderer.invoke("course:update", data),
  deleteCourse: (id) => ipcRenderer.invoke("course:delete", id),
  restoreCourse: (id) => ipcRenderer.invoke("course:restore", id),
  getCourseDetail: (id) => ipcRenderer.invoke("course:show-detail", id),
  getCourseClasses: (data) =>
    ipcRenderer.invoke("course:get-course-classes", data),

  // Student
  getAllStudents: (data) => ipcRenderer.invoke("student:index", data),
  searchAllStudents: (data) =>
    ipcRenderer.invoke("student:search-all-active", data),
  getStudent: (id) => ipcRenderer.invoke("student:show", id),
  createStudent: (data) => ipcRenderer.invoke("student:create", data),
  updateStudent: (data) => ipcRenderer.invoke("student:update", data),
  deleteStudent: (id) => ipcRenderer.invoke("student:delete", id),
  getStudentAttendedClasses: (data) =>
    ipcRenderer.invoke("student:get-attended-classes", data),

  // Teacher
  getAllTeachers: (data) => ipcRenderer.invoke("teacher:index", data),
  searchAllTeachers: (data) =>
    ipcRenderer.invoke("teacher:search-all-active", data),
  getTeacher: (id) => ipcRenderer.invoke("teacher:show", id),
  createTeacher: (data) => ipcRenderer.invoke("teacher:create", data),
  updateTeacher: (data) => ipcRenderer.invoke("teacher:update", data),
  deleteTeacher: (id) => ipcRenderer.invoke("teacher:delete", id),
  restoreTeacher: (id) => ipcRenderer.invoke("teacher:restore", id),
  getTeacherClasses: (data) =>
    ipcRenderer.invoke("teacher:get-teacher-classes", data),

  // Class
  getAllClasses: (data) => ipcRenderer.invoke("class:index", data),
  getClassDetails: (id) => ipcRenderer.invoke("class:show", id),
  createClass: (data) => ipcRenderer.invoke("class:create", data),
  updateClass: (data) => ipcRenderer.invoke("class:update", data),
  deleteClass: (id) => ipcRenderer.invoke("class:delete", id),
  completeClass: (id) => ipcRenderer.invoke("class:complete", id),

  // Enrollment
  createEnrollment: (data) => ipcRenderer.invoke("enrollment:create", data),
  deleteEnrollment: (id) => ipcRenderer.invoke("enrollment:delete", id),
  getEnrollmentByClass: (data) =>
    ipcRenderer.invoke("enrollment:getEnrollmentByClass", data),
  getEnrollment: (id) => ipcRenderer.invoke("enrollment:show", id),

  // Payment
  createPayment: (data) => ipcRenderer.invoke("payment:create", data),
  getAllPayments: (data) => ipcRenderer.invoke("payment:index", data),
  getAllPaymentsByEnrollment: (id) =>
    ipcRenderer.invoke("payment:get-by-enrollment", id),
  deletePayment: (id) => ipcRenderer.invoke("payment:delete", id),
});
