export const checkAuthorization = (error?: string): void => {
  if (error === "UNAUTHORIZED") {
    window.location.hash = "#/login";
  }
};
