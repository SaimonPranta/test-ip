// Process.env removed here and declared environment
// const environment = 'production'
const environment = 'development'

export const BACKEND_URL =
  environment === "development"
    ? "http://127.0.0.1:2000/web"
    : "https://micple.com/web";
export const CLOUD_URL =
  environment === "development"
    ? "http://127.0.0.1:2300"
    : "https://cloud.micple.com";
export const LOCAL_CLOUD_URL =
  environment === "development"
    ? "http://127.0.0.1:2300/src/assets/reactions/gif"
    : "https://cloud.micple.com";
export const BACKEND_URL2 =
  environment === "development"
    ? "http://localhost:3000"
    : "https://micple.com/";

//Promotions backend URL
export const PROMOTION_URL = environment === "development"
  ? "http://localhost:10001/api/v1"
  : ''


export const audioTypes = [
  "audio/mp3",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/x-m4a",
  "audio/vnd.dlna.adts"
];
export const imageTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/tiff",
];
export const videoTypes = [
  "video/mp4",
  "video/mpeg",
  "video/mkv",
  "video/avi",
  "video/x-ms-wmv",
  "video/webm",
  "video/mov",
  "video/x-matroska",
  "video/quicktime"
];
export const fileTypes = ["application/pdf", "text/plain", ""];
