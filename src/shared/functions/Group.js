import axios from "axios";

import { BACKEND_URL } from "../constants/Variables";
import { userHeader } from "../functions/Token";

export function getQuestions(id) {
  return axios.get(`${BACKEND_URL}/groups/questions/${id}`, {
    headers: userHeader(),
  });
}
export function joinGroup(id, answers) {
  return axios.put(
    `${BACKEND_URL}/groups/${id}/join`,
    { answers, date: new Date().toISOString() },
    { headers: userHeader() }
  );
}
export function leaveGroup(id) {
  return axios.put(
    `${BACKEND_URL}/groups/${id}/leave`,
    {},
    { headers: userHeader() }
  );
}
export function approve(id, uid) {
  return axios.put(
    `${BACKEND_URL}/groups/${id}/approve`,
    { date: new Date().toISOString(), uid },
    { headers: userHeader() }
  );
}
// changeAdminStatus;
export function adminStatus(id, uid) {
  // console.log(":id", id)
  // console.log(":uid", uid);
  return axios.put(
    `${BACKEND_URL}/groups/${id}/changeAdminStatus`,
    { uid },
    { headers: userHeader() }
  );
}
export function reject(id, uid) {
  return axios.put(
    `${BACKEND_URL}/groups/${id}/reject`,
    { uid },
    { headers: userHeader() }
  );
}
