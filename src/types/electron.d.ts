import type { ResponseDataType } from "./ResponseTypes";

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
  };
}
