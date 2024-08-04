import {
  OPEN_CHAT,
  CLOSE_CHAT,
  TOGGLE_CHAT,
  PUSH_CHAT_MESSAGES,
  DELETE_CHAT_MESSAGE,
  PUSH_CHAT_ROOMS,
  MAKE_ROOM_ACTIVE,
  MAKE_ROOM_INACTIVE,
  GONE_OFFLINE,
  REACT_CHAT_MESSAGE,
} from './type';

export function openChat(id) {
  return { type: OPEN_CHAT, payload: id };
}
export function closeChat(id) {
  return { type: CLOSE_CHAT, payload: id };
}
export function toggleChat(id) {
  return { type: TOGGLE_CHAT, payload: id };
}

export function pushRooms(rooms) {
  return { type: PUSH_CHAT_ROOMS, payload: rooms };
}
export function makeActive(roomId) {
  return { type: MAKE_ROOM_ACTIVE, payload: roomId };
}
export function makeInactive(roomId) {
  return { type: MAKE_ROOM_INACTIVE, payload: roomId };
}

export function setMessages(roomId, messages) {
  return { type: PUSH_CHAT_MESSAGES, payload: { roomId, messages } };
}
export function reactMessage(payload) {
  return { type: REACT_CHAT_MESSAGE, payload };
}
export function deleteMessage(roomId, msgId) {
  return { type: DELETE_CHAT_MESSAGE, payload: { roomId, msgId } };
}

export function goneOffline(userId) {
  return { type: GONE_OFFLINE, payload: userId };
}
