export const generateStatus = (startDate: Date, endDate: Date | null) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  if (today < start) {
    return "not_started";
  } else if (end && today >= end) {
    return "complete";
  } else {
    return "ongoing";
  }
};
