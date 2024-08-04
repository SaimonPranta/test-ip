const yearList = new Array(100).fill().map((item, index) => {
  const currentYear = new Date().getFullYear();
  const startingDate = currentYear - 18;
  return startingDate - index;
});
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayList = new Array(31).fill().map((item, index) => {
  const day = index + 1;
  return day.toString().padStart(2, "0");
});
export { yearList, monthList, dayList };
