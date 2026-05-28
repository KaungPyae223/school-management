import { courseIPCs } from "./course.ipc.js";

export const registerIpcHandlers = () => {
  courseIPCs();
};
