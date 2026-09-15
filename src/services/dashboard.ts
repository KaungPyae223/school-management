import { checkAuthorization } from "./check-authorization";

export const dashboardService = {
  getKPI: async () => {
    const result = await window.dashboardAPI.getKPI();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getRevenueEnrollment: async () => {
    const result = await window.dashboardAPI.revenueEnrollment();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getCoursesEnrollments: async () => {
    const result = await window.dashboardAPI.coursesEnrollments();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getTodayClasses: async () => {
    const result = await window.dashboardAPI.getTodayClasses();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  getRecentEnrollment: async (data: { page: number; limit: number }) => {
    const result = await window.dashboardAPI.getRecentEnrollment(data);

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
};
