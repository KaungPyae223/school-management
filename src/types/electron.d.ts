import type { AuthResponseType } from "./AuthData";
import type { ResponseDataType } from "./ResponseTypes";

declare global {
  interface Window {
    electronStore: {
      get: (key: string) => Promise<string | null>;
      set: (key: string, value: string) => Promise<void>;
      delete: (key: string) => Promise<void>;
    };
    dashboardAPI: {
      getKPI: () => Promise<{ data?: any; error?: string }>;
    };
    authAPI: {
      isAuthenticated: () => Promise<boolean>;
      hasPassword: () => Promise<boolean>;
      setPassword: (
        plainPassword: string,
      ) => Promise<{ success: boolean; message?: string }>;
      changePassword: (
        oldPassword: string,
        newPassword: string,
      ) => Promise<AuthResponseType>;
      verifyPassword: (plainPassword: string) => Promise<AuthResponseType>;
      getRemainTime: () => Promise<AuthResponseType>;

      // 2FA
      generate2FA: () => Promise<{
        success: boolean;
        qrCodeUrl?: string;
        secret?: string;
        backupCodes?: string[];
        message?: string;
      }>;
      enable2FA: (data: {
        token: string;
        backupCodes: string[];
      }) => Promise<{ success: boolean; message?: string }>;
      verify2FA: (token: string) => Promise<{
        success: boolean;
        usedBackupCode?: boolean;
        message?: string;
      }>;
      disable2FA: (
        token: string,
      ) => Promise<{ success: boolean; message?: string }>;
      is2FAEnabled: () => Promise<boolean>;
      is2FAVerified: () => Promise<boolean>;
    };

    backupAPI: {
      exportBackup: (
        password: string,
      ) => Promise<{ success: boolean; error?: string }>;
      importBackup: (data: {
        filePath: string;
        password: string;
      }) => Promise<{ success: boolean; error?: string }>;
      getFilePath: (file: any) => Promise<string>;
      relaunchApp: () => Promise<void>;
    };

    api: {
      getAllCourses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        trash?: string;
      }) => Promise<ResponseDataType>;
      searchAllCourses: (data: {
        search?: string;
        page?: number;
        limit?: number;
        onlyActive?: boolean;
      }) => Promise<{ data?: any; error?: string }>;
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
      getCourseDetail: (id: number) => Promise<{ data?: any; error?: string }>;
      restoreCourse: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
      getCourseClasses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        id: number;
      }) => Promise<ResponseDataType>;

      getAllStudents: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
      }) => Promise<ResponseDataType>;
      getStudent: (id: number) => Promise<{ data?: any; error?: string }>;
      searchAllStudents: (data: {
        search?: string;
        page?: number;
        limit?: number;
      }) => Promise<{ data?: any; error?: string }>;
      createStudent: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      updateStudent: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteStudent: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
      getStudentAttendedClasses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        studentId: number;
      }) => Promise<ResponseDataType>;

      getAllTeachers: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        trash?: string;
      }) => Promise<ResponseDataType>;
      searchAllTeachers: (data: {
        search?: string;
        page?: number;
        limit?: number;
        onlyActive?: boolean;
      }) => Promise<{ data?: any; error?: string }>;
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
      restoreTeacher: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
      getTeacherClasses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        id: number;
      }) => Promise<ResponseDataType>;

      getAllClasses: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
        courseIds?: string;
        teacherIds?: string;
        startTime?: string;
        endTime?: string;
        startDate?: string;
        endDate?: string;
        minPrice?: number;
        maxPrice?: number;
        start_month?: string;
        start_year?: string;
        end_month?: string;
        end_year?: string;
        teacherId?: number;
        courseId?: number;
      }) => Promise<ResponseDataType>;
      getClassDetails: (id: number) => Promise<{ data?: any; error?: string }>;
      createClass: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      updateClass: (
        data: any,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      deleteClass: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
      completeClass: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;

      createEnrollment: (
        data: any,
      ) => Promise<{ success: boolean; error?: string }>;
      deleteEnrollment: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
      toggleWithdrawEnrollment: (
        id: number,
      ) => Promise<{ success: boolean; data?: any; error?: string }>;
      getEnrollmentByClass: (data: {
        classId: number;
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
      }) => Promise<ResponseDataType>;
      getEnrollment: (id: number) => Promise<{ data?: any; error?: string }>;

      // Payments
      createPayment: (
        data: any,
      ) => Promise<{ success: boolean; error?: string }>;
      getAllPayments: (data: {
        page?: number;
        limit?: number;
        search?: string;
        sort?: string;
        order?: string;
      }) => Promise<ResponseDataType>;
      getAllPaymentsByEnrollment: (
        id: number,
      ) => Promise<{ data?: any[]; error?: string }>;
      deletePayment: (
        id: number,
      ) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
