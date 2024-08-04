export const getFutureDate = (days) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + days);
  
    return futureDate;
}