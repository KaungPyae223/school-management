import { checkAuthorization } from "./check-authorization";

export const enrollmentService = {
  createEnrollment: async (payload: any) => {
    const data = await window.api.createEnrollment(payload);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
  getEnrollmentByClass: async (queryParams: any) => {
    const data = await window.api.getEnrollmentByClass(queryParams);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  getEnrollment: async (id: number) => {
    const data = await window.api.getEnrollment(id);

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  },

  deleteEnrollment: async (id: number) => {
    const data = await window.api.deleteEnrollment(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  toggleLeaveEnrollment: async (id: number) => {
    const data = await window.api.toggleLeaveEnrollment(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
};
