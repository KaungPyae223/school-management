let isAuthenticated = false;

export const authSession = {
  isAuthenticated() {
    return isAuthenticated;
  },

  login() {
    isAuthenticated = true;
  },
};
