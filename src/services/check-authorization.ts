export const checkAuthorization = (error?: string): void => {
  if (error === "UNAUTHORIZED") {
    window.location.href = "/login"; // or window.location.hash = "#/login" for HashRouter
  }
};
