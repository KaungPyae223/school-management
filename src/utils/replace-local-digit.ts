import i18next from "i18next";

export const replaceLocalDigit = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return "";
  const MMdigits = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];

  if (i18next.language === "my-MM") {
    return String(value).replace(/\d/g, (digit) => MMdigits[Number(digit)]);
  }

  return String(value);
};
