export const USERNAME_REGEX = /^[a-z]+_[0-9]+$/;
export const PASSWORD_REGEX = /^[a-zA-Z0-9@#*.]{8,12}$/;
export const MAIL_REGEX = /^[a-z]+_[0-9]+@micple.com$/;
// export const MIMETYPE_REXEX_IMG = /\.(jpe?g|png|gif|tiff)$/i;
export const MIMETYPE_REXEX_IMG = /(\.jpeg|\.jpg|\.png|\.gif|\.tiff)/i;
// export const MIMETYPE_REXEX_VID = /\.(mp4|mpeg|mkv|avi|wmv|webm|mov)$/i;
export const MIMETYPE_REXEX_VID =
  /(\.mp4|\.mpeg|\.mkv|\.avi|\.wmv|\.webm|\.mov)/i;
// export const MIMETYPE_REXEX_AUD = /\.(mp3|ogg|wav|aac|m4a|mpeg)$/i;
export const MIMETYPE_REXEX_AUD = /(\.mp3|\.ogg|\.wav|\.aac|\.m4a|\.mpeg)/i;
// export const MIMETYPE_REXEX_FILE = /\.(txt|pdf|docx|psd|psd|iso)$/i;
export const MIMETYPE_REXEX_FILE = /(\.txt|\.pdf|\.docx|\.psd|\.psd|\.iso)/i;
export const checkSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const checkEmptyString = /([^\s]*)\s/i;
export const checkAnyNumber = /([1-9][0-9]*)/;
export const checkForAddress = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?]+/;
export const checkForZip = /^[A-Z0-9]*$/;

export const NUMBER_REGEX = new RegExp(/^\d+$/);

//regex for note
export const checkWebaddresssRegex = /^[a-z0-9]*$/;
