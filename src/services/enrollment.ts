export const enrollmentService = {
  createEnrollment: async (payload: any) => {
    const res = await window.api.createEnrollment(payload);

    if (!res.success) {
      throw new Error(res.error);
    }

    return res;
  },
};
