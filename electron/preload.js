const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Course
  getAllCourses: (data) => ipcRenderer.invoke("course:index", data),
  getCourse: (id) => ipcRenderer.invoke("course:show", id),
  createCourse: (data) => ipcRenderer.invoke("course:create", data),
  updateCourse: (data) => ipcRenderer.invoke("course:update", data),
  deleteCourse: (id) => ipcRenderer.invoke("course:delete", id),

  // Student
  getAllStudents: (data) => ipcRenderer.invoke("student:index", data),
  getStudent: (id) => ipcRenderer.invoke("student:show", id),
  createStudent: (data) => ipcRenderer.invoke("student:create", data),
  updateStudent: (data) => ipcRenderer.invoke("student:update", data),
  deleteStudent: (id) => ipcRenderer.invoke("student:delete", id),

  // Teacher
  getAllTeachers: (data) => ipcRenderer.invoke("teacher:index", data),
  getTeacher: (id) => ipcRenderer.invoke("teacher:show", id),
  createTeacher: (data) => ipcRenderer.invoke("teacher:create", data),
  updateTeacher: (data) => ipcRenderer.invoke("teacher:update", data),
  deleteTeacher: (id) => ipcRenderer.invoke("teacher:delete", id),
});
