import { generateRandomString } from "../../../../../shared/functions/randomString.js";

const getBrowseID = () => {
  const browserID = localStorage.getItem("browserID");
  if (browserID) {
    return browserID;
  }
  localStorage.setItem("browserID", generateRandomString());
  const newBrowserID = localStorage.getItem("browserID");
  return newBrowserID;
};

const setPhoneNumber = (phoneNumber) => {
  localStorage.setItem("supportChatPhoneNumber", phoneNumber);
};
const getPhoneNumber = () => {
  const phoneNumber = localStorage.getItem("supportChatPhoneNumber");

  return phoneNumber ? phoneNumber : null;
};

export { getBrowseID, setPhoneNumber, getPhoneNumber};
