export const PUSH_NOTIFICATIONS = 'PUSH_NOTIFICATIONS';
export const PULL_NOTIFICATION = 'PULL_NOTIFICATION';
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
export const READ_NOTIFICATIONS = 'READ_NOTIFICATIONS';

export function pushNotiffications(data) {
  const notifications = Array.isArray(data) ? data : [data];
  return { type: PUSH_NOTIFICATIONS, payload: notifications };
}
export function updateNotiffication(notification) {
  return { type: UPDATE_NOTIFICATION, payload: notification };
}
export function pullNotiffication(id) {
  return { type: PULL_NOTIFICATION, payload: id };
}
export function readNotiffications(ids) {
  return { type: READ_NOTIFICATIONS, payload: ids };
}
