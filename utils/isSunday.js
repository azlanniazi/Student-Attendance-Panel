exports.isSunday = (date) => {
  const day = date.getDay();

  return day === 0;
};
