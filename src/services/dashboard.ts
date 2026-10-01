import { checkAuthorization } from "./check-authorization";

export const dashboardService = {
  getKPI: async () => {
    const result = await window.api.getKPI();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getRevenueEnrollment: async () => {
    const result = await window.api.revenueEnrollment();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getCoursesEnrollments: async () => {
    const result = await window.api.coursesEnrollments();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getTodayClasses: async () => {
    const result = await window.api.getTodayClasses();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getRecentEnrollment: async (data: { page: number; limit: number }) => {
    const result = await window.api.getRecentEnrollment(data);

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getRecentPayment: async (data: { page: number; limit: number }) => {
    const result = await window.api.getRecentPayment(data);

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getTotalPendingAmount: async () => {
    const result = await window.api.getTotalPendingAmount();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
};
