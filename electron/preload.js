const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  createCourse: (data) =>
    ipcRenderer.invoke("course:create", data),
  updateCourse: (data) =>
    ipcRenderer.invoke("course:update", data),
});
