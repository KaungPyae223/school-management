export const teacherService = {
  createTeacher: async (payload: any) => {
    const res = await window.api.createTeacher(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },

  updateTeacher: async (payload: any) => {
    const res = await window.api.updateTeacher(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },

  getAllTeachers: async (params: any) => {
    const data = await window.api.getAllTeachers(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deleteTeacher: async (id: number) => {
    const res = await window.api.deleteTeacher(id);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
};
