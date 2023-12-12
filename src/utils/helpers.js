export const getISODate = function (date, options = {}) {
  if (options?.end) {
    // Set to the last second of the day
    date.setUTCHours(23, 59, 59, 999);
  } else date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

export const formatDate = function (dateString, dateOptions) {
  dateOptions = dateOptions || {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateObject = new Date(dateString);
  const formatedDate = dateObject.toLocaleDateString("en-us", dateOptions);
  return formatedDate;
};

export const getGradeTagColor = (grade) => {
  if (grade === "A") return "primary";
  if (grade === "B") return "secondary";
  if (grade === "C") return "gray";
  if (grade === "F") return "danger";
};
