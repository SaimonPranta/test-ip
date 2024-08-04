export const convertToDate = (date) => {
  if (!date) {
    return "Invalid Time";
  }
  const today = new Date(date);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();


  let hours = today.getHours();
  const minutes = String(today.getMinutes()).padStart(2, '0');
  const seconds = String(today.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  hours = String(hours).padStart(2, '0');
 

  return `${dd}-${mm}-${yyyy} | ${hours}:${minutes}:${seconds} ${ampm}`;
};
