import { BACKEND_URL } from "../constants/Variables";

export const getMedia = (mediaName, commercialUserName, type) => {
  return `${BACKEND_URL}/commercial/media/${type}/${mediaName}?commercialUserName=${commercialUserName}`;
};
