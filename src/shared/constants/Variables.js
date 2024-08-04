// Process.env removed here and declared environment
// const environment = 'production'
// const environment = "development";

export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:2000/web"
    : "https://backend.www.micple.com/web";
export const CLOUD_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:2300"
    : "https://backend.cloud.micple.com";
export const LOCAL_CLOUD_URL =
  process.env.NODE_ENV === "development"
    ? "https://backend.cloud.micple.com"
    : "http://127.0.0.1:2300";
export const BACKEND_URL2 =
  process.env.NODE_ENV === "development" 
    ? "http://localhost:3010"
    : "https://micple.com/";

//Promotions backend URL
export const PROMOTION_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:10001/api/v1"
    : "https://backend.promotion.micple.com/api/v1";

export const audioTypes = [
  "audio/mp3",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/aac",
  "audio/x-m4a",
  "audio/vnd.dlna.adts",
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
  "video/quicktime",
];
export const fileTypes = ["application/pdf", "text/plain", ""];
