let is2FAVerified = false;

export const twoFactorSession = {
  is2FAVerified() {
    return is2FAVerified;
  },

  verify() {
    is2FAVerified = true;
  },
};
