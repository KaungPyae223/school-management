import { checkAuthorization } from "./check-authorization";

export const teacherService = {
  createTeacher: async (payload: any) => {
    const data = await window.api.createTeacher(payload);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  updateTeacher: async (payload: any) => {
    const data = await window.api.updateTeacher(payload);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getAllTeachers: async (params: any) => {
    const data = await window.api.getAllTeachers(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  searchAllTeachers: async (params: any) => {
    const data = await window.api.searchAllTeachers(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getTeacher: async (id: number) => {
    const data = await window.api.getTeacher(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getTeacherDetail: async (id: number) => {
    const data = await window.api.getTeacherDetail(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  deleteTeacher: async (id: number) => {
    const data = await window.api.deleteTeacher(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  restoreTeacher: async (id: number) => {
    const data = await window.api.restoreTeacher(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getTeacherClasses: async (params: any) => {
    const data = await window.api.getTeacherClasses(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
};
