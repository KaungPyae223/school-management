export type AuthResponseType = {
  success: boolean;
  message: string;
  locked?: boolean;
  retryAfterSeconds?: number;
  remainingAttempts?: number;
};