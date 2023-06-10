export const numToMonth = (num) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  if (months[num - 1]) {
    return months[num - 1] + " ";
  }
  return "";
};
