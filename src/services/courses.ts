import { checkAuthorization } from "./check-authorization";

export const courseService = {
  createCourse: async (payload: any) => {
    const data = await window.api.createCourse(payload);

    if (!data.success) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  updateCourse: async (payload: any) => {
    const data = await window.api.updateCourse(payload);

    if (!data.success) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getAllCourses: async (params: any) => {
    const data = await window.api.getAllCourses(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  searchAllCourses: async (params: any) => {
    const data = await window.api.searchAllCourses(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getCourseDetail: async (id: number) => {
    const data = await window.api.getCourseDetail(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getCourse: async (id: number) => {
    const data = await window.api.getCourse(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  getCourseClasses: async (params: any) => {
    const data = await window.api.getCourseClasses(params);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  deleteCourse: async (id: number) => {
    const data = await window.api.deleteCourse(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },

  restoreCourse: async (id: number) => {
    const data = await window.api.restoreCourse(id);

    if (data.error) {
      checkAuthorization(data.error);

      throw new Error(data.error);
    }

    return data;
  },
};
