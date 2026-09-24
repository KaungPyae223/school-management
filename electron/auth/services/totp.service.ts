import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";
import crypto from "crypto";

export interface Setup2FAResponse {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

const APP_NAME = "School Management";

export const totpService = {
  generateSetup: async (): Promise<Setup2FAResponse> => {
    const secret = generateSecret();
    const otpAuthUrl = generateURI({
      issuer: APP_NAME,
      label: "school-management",
      secret,
    });

    const qrCodeUrl = await QRCode.toDataURL(otpAuthUrl);

    const backupCodes = Array.from({ length: 6 }, () =>
      crypto.randomBytes(4).toString("hex").toUpperCase(),
    );

    return {
      secret,
      qrCodeUrl,
      backupCodes,
    };
  },

  verifyToken: async (token: string, secret: string): Promise<boolean> => {
    try {
      const result = await verify({
        secret,
        token: token.trim(),
        epochTolerance: 30,
      });

      return result.valid;
    } catch {
      return false;
    }
  },
};
