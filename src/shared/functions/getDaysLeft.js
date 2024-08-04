export const getDaysLeft = (futureDate) => {
  const currentDate = new Date();
  const parsedFutureDate = new Date(futureDate);
  const diffInTime = parsedFutureDate.getTime() - currentDate.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  const condition = diffInDays < 0 ? 0 : diffInDays;
  return condition + " days left";
};
