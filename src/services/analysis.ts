import { checkAuthorization } from "./check-authorization";

export const analysisService = {
  scheduleUtilization: async () => {
    const result = await window.api.scheduleUtilization();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  ageDemographics: async () => {
    const result = await window.api.ageDemographics();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  enrollmentRetention: async () => {
    const result = await window.api.enrollmentRetention();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  analysisCourses: async (data: { page: number; limit: number }) => {
    const result = await window.api.analysisCourses(data);

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  teacherRevenue: async () => {
    const result = await window.api.teacherRevenue();

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
  teacherWorkload: async (data: { page: number; limit: number }) => {
    const result = await window.api.teacherWorkload(data);

    if (result.error) {
      checkAuthorization(result.error);

      throw new Error(result.error);
    }

    return result;
  },
};
