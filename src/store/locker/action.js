export const LOCKER_ALL_FILES = 'LOCKER_ALL_FILES';
export const LOCKER_ADD_FILES = 'LOCKER_ADD_FILES';
export const LOCKER_MULTIPLE_PUBLISH_FILE = 'LOCKER_MULTIPLE_PUBLISH_FILE';
export const LOCKER_MULTIPLE_REMOVE_FILE = 'LOCKER_MULTIPLE_REMOVE_FILE';

export const LOCKER_ALL_FOLDERS = 'LOCKER_ALL_FOLDERS';
export const LOCKER_MULTIPLE_FOLDER_PUBLISH_FILE = 'LOCKER_MULTIPLE_FOLDER_PUBLISH_FILE';
export const LOCKER_MULTIPLE_FOLDER_REMOVE_FILE = 'LOCKER_MULTIPLE_FOLDER_REMOVE_FILE';




export function lockerAllFiles() {
  return { type: LOCKER_ALL_FILES };
}

export function lockerAddFiles(files) {
  return { type: LOCKER_ADD_FILES, payload: files };
}

export function lockerMultiplePublishFile(id) {
  return { type: LOCKER_MULTIPLE_PUBLISH_FILE, payload: id };
}

export function lockerMultipleRemoveFile(id) {
  return { type: LOCKER_MULTIPLE_REMOVE_FILE, payload: id };
}
// -----------------------------------------------------------------------------
export function lockerAllFolders() {
  return { type: LOCKER_ALL_FOLDERS };
}
export function lockerMultipleFolderPublishFile(checkedList, folderId) {
  return { type: LOCKER_MULTIPLE_FOLDER_PUBLISH_FILE, payload: {checkedList, folderId} };
}
export function lockerMultipleFolderRemoveFile(checkedList, folderId) {
  return { type: LOCKER_MULTIPLE_FOLDER_REMOVE_FILE, payload: {checkedList, folderId}};
}