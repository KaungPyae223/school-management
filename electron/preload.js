const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAllCourses: (data) => ipcRenderer.invoke("course:index", data),
  createCourse: (data) => ipcRenderer.invoke("course:create", data),
  deleteCourse: (id) => ipcRenderer.invoke("course:delete", id),
});
