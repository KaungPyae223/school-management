const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Course
  getAllCourses: (data) => ipcRenderer.invoke("course:index", data),
  searchAllCourses: (data) =>
    ipcRenderer.invoke("course:search-all-active", data),
  getCourse: (id) => ipcRenderer.invoke("course:show", id),
  createCourse: (data) => ipcRenderer.invoke("course:create", data),
  updateCourse: (data) => ipcRenderer.invoke("course:update", data),
  deleteCourse: (id) => ipcRenderer.invoke("course:delete", id),

  // Student
  getAllStudents: (data) => ipcRenderer.invoke("student:index", data),
  searchAllStudents: (data) =>
    ipcRenderer.invoke("student:search-all-active", data),
  getStudent: (id) => ipcRenderer.invoke("student:show", id),
  createStudent: (data) => ipcRenderer.invoke("student:create", data),
  updateStudent: (data) => ipcRenderer.invoke("student:update", data),
  deleteStudent: (id) => ipcRenderer.invoke("student:delete", id),

  // Teacher
  getAllTeachers: (data) => ipcRenderer.invoke("teacher:index", data),
  searchAllTeachers: (data) =>
    ipcRenderer.invoke("teacher:search-all-active", data),
  getTeacher: (id) => ipcRenderer.invoke("teacher:show", id),
  createTeacher: (data) => ipcRenderer.invoke("teacher:create", data),
  updateTeacher: (data) => ipcRenderer.invoke("teacher:update", data),
  deleteTeacher: (id) => ipcRenderer.invoke("teacher:delete", id),

  // Class
  getAllClasses: (data) => ipcRenderer.invoke("class:index", data),
  getClassDetails: (id) => ipcRenderer.invoke("class:show", id),
  createClass: (data) => ipcRenderer.invoke("class:create", data),
  updateClass: (data) => ipcRenderer.invoke("class:update", data),
  deleteClass: (id) => ipcRenderer.invoke("class:delete", id),

  // Enrollment
  createEnrollment: (data) => ipcRenderer.invoke("enrollment:create", data),
  deleteEnrollment: (id) => ipcRenderer.invoke("enrollment:delete", id),
  getEnrollmentByClass: (data) =>
    ipcRenderer.invoke("enrollment:getEnrollmentByClass", data),
});
