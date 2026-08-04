export const teacherService = {
  createTeacher: async (payload: any) => {
    const data = await window.api.createTeacher(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  updateTeacher: async (payload: any) => {
    const data = await window.api.updateTeacher(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  getAllTeachers: async (params: any) => {
    const data = await window.api.getAllTeachers(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  getTeacher: async (id: number) => {
    const data = await window.api.getTeacher(id);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deleteTeacher: async (id: number) => {
    const data = await window.api.deleteTeacher(id);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  datatoreTeacher: async (id: number) => {
    const data = await window.api.datatoreTeacher(id);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  getTeacherClasses: async (params: any) => {
    const data = await window.api.getTeacherClasses(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },
};
