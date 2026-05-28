import type { ResponseDataType } from "./ResponseTypes";

declare global {
  interface Window {
    api: {
      getAllCourses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
      }) => Promise<ResponseDataType>;
      createCourse: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteCourse: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
