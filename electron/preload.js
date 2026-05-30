const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // Course
  getAllCourses: (data) => ipcRenderer.invoke("course:index", data),
  getCourse: (id) => ipcRenderer.invoke("course:show", id),
  createCourse: (data) => ipcRenderer.invoke("course:create", data),
  updateCourse: (data) => ipcRenderer.invoke("course:update", data),
  deleteCourse: (id) => ipcRenderer.invoke("course:delete", id),
});
