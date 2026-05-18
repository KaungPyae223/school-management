interface Window {
  api: {
    createCourse: (
      data: any,
    ) => Promise<{ success: boolean; data?: any; error?: string }>;
    updateCourse: (
      data: any,
    ) => Promise<{ success: boolean; data?: any; error?: string }>;
  };
}
