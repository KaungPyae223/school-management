export const enrollmentService = {
  createEnrollment: async (payload: any) => {
    const res = await window.api.createEnrollment(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
  getEnrollmentByClass: async (queryParams: any) => {
    const data = await window.api.getEnrollmentByClass(queryParams);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },
  
  deleteEnrollment: async (id: number) => {
    const res = await window.api.deleteEnrollment(id);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
};
