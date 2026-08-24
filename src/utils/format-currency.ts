import { replaceLocalDigit } from "./replace-local-digit";

export const formatCurrency = (amount: number) => {
  return replaceLocalDigit(
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount),
  );
};
