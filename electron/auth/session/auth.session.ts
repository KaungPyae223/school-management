import { store } from "../../store";
let isAuthenticated = false;

export const authSession = {
  isAuthenticated() {
    return isAuthenticated;
  },

  login() {
    isAuthenticated = true;
  },

  hasPassword() {
    return !!store.get("user_password_hash");
  },

  has2FA() {
    return !!store.get("two_factor_enabled");
  },
};
