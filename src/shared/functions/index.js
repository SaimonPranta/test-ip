import { FemaleAvatar, MaleAvatar, GroupAvatar } from "../../assets/profile";

export function getUrl(url = "", username) {

  const back =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:2300"
      : "https://backend.cloud.micple.com";
 
  return !!url ? `${back}${url}&userName=${username}` : "";
}
export function getUserAvatar(url = "", gender = "", username) {
  if (url) {
    return getUrl(url, username);
  } else {
    return gender.toLocaleLowerCase() === "female" ? FemaleAvatar : MaleAvatar;
  }
}

export const getCommercialMedia = (url, commercialUserName) => {
  const back =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:2300"
      : "https://backend.cloud.micple.com";
  return !!url ? `${back}${url}?u=${commercialUserName}` : MaleAvatar;
};

export function getGroupAvatar(url) {
  return getUrl(url) || GroupAvatar;
}

export const getChatMedia = (pathName, chatId) => {
  if (!pathName || !chatId) return 
  const back =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:2300"
      : "https://backend.cloud.micple.com";
  return `${back}/i/support-media/${chatId}/${pathName}`;
};
