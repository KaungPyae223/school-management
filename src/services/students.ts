export const studentService = {
  createStudent: async (payload: any) => {
    const res = await window.api.createStudent(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },

  updateStudent: async (payload: any) => {
    const res = await window.api.updateStudent(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },

  getAllStudents: async (params: any) => {
    const data = await window.api.getAllStudents(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deleteStudent: async (id: number) => {
    const res = await window.api.deleteStudent(id);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
};
