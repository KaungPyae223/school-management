export const studentService = {
  createStudent: async (payload: any) => {
    const data = await window.api.createStudent(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  updateStudent: async (payload: any) => {
    const data = await window.api.updateStudent(payload);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  getAllStudents: async (params: any) => {
    const data = await window.api.getAllStudents(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deleteStudent: async (id: number) => {
    const data = await window.api.deleteStudent(id);

    if (!data.success) {
      throw new Error(data.error);
    }

    return data;
  },

  getStudentAttendedClasses: async (params: any) => {
    const data = await window.api.getStudentAttendedClasses(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  getStudent: async (id: number) => {
    const data = await window.api.getStudent(id);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },
};
