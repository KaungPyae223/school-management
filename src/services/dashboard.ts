import { checkAuthorization } from "./check-authorization";

export const dashboardService = {
  getKPI: async () => {
    const data = await window.dashboardAPI.getKPI();

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
  getRevenueEnrollment: async () => {
    const data = await window.dashboardAPI.revenueEnrollment();

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
  getCoursesEnrollments: async () => {
    const data = await window.dashboardAPI.coursesEnrollments();

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
};
