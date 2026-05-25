export const courseService = {
  createCourse: async (payload: any) => {
    const res = await window.api.createCourse(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },

  getAllCourses: async (params: any) => {
    const data = await window.api.getAllCourses(params);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },
};
