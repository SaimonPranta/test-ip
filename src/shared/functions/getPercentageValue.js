export const calculatePercentage = (value, percentage) => {
  return (value - (value * percentage) / 100).toFixed(2);
};
