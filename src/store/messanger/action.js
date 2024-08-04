export const PUSH_MESSANGER_ROOMS = 'PUSH_MESSANGER_ROOMS';
export const MAKE_MESSANGER_ROOM_ACTIVE = 'MAKE_MESSANGER_ROOM_ACTIVE';
export const MAKE_MESSANGER_ROOM_INACTIVE = 'MAKE_MESSANGER_ROOM_INACTIVE';

export const GET_MESSANGER_MESSAGES = 'GET_MESSANGER_MESSAGES';
export const PUSH_MESSANGER_MESSAGE = 'PUSH_MESSANGER_MESSAGE';
export const REACT_MESSANGER_MESSAGE = 'REACT_MESSANGER_MESSAGE';
export const DELETE_MESSANGER_MESSAGE = 'DELETE_MESSANGER_MESSAGE';

export function pushMessangerRooms(payload) {
  return { type: PUSH_MESSANGER_ROOMS, payload };
}
export function makeMessangerActive(payload) {
  return { type: MAKE_MESSANGER_ROOM_ACTIVE, payload };
}
export function makeMessangerInactive(payload) {
  return { type: MAKE_MESSANGER_ROOM_INACTIVE, payload };
}
export function setMessangerMessages(payload) {
  return { type: GET_MESSANGER_MESSAGES, payload };
}
export function pushMessangerMessage(payload) {
  return { type: PUSH_MESSANGER_MESSAGE, payload };
}
export function reactMessangerMessage(payload) {
  return { type: REACT_MESSANGER_MESSAGE, payload };
}
export function deleteMessangerMessage(payload) {
  return { type: DELETE_MESSANGER_MESSAGE, payload };
}
