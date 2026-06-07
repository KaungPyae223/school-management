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
        trash?: string;
      }) => Promise<ResponseDataType>;
      getCourse: (id: number) => Promise<{ data?: any; error?: string }>;
      createCourse: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      updateCourse: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteCourse: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;

      getAllStudents: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
      }) => Promise<ResponseDataType>;
      getStudent: (id: number) => Promise<{ data?: any; error?: string }>;
      createStudent: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      updateStudent: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteStudent: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;

      getAllTeachers: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        trash?: string;
      }) => Promise<ResponseDataType>;
      getTeacher: (id: number) => Promise<{ data?: any; error?: string }>;
      createTeacher: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      updateTeacher: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteTeacher: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
