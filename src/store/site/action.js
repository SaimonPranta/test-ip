import axios from "axios";

import {
  FETCH_SITE_INFO,
  OPEN_MAIL_COMPOSE,
  CLOSE_MAIL_COMPOSE,
  RECEIVED_ALERM,
  SENT_ALERM,
  CLOSE_ALERM,
} from "./type";
import { BACKEND_URL } from "../../shared/constants/Variables";

export const getSiteInfo = () => {
  const getUserDetails = axios.get(`${BACKEND_URL}/api/site`);
 
  return {
    type: FETCH_SITE_INFO,
    payload: getUserDetails,
  };
};

export function openMailCompose(payload = "") {
  return {
    type: OPEN_MAIL_COMPOSE,
    payload,
  };
}
export function closeMailCompose() {
  return {
    type: CLOSE_MAIL_COMPOSE,
  };
}

export function ringReceivedAlerm() {
  return { type: RECEIVED_ALERM };
}
export function ringSentAlerm() {
  return { type: SENT_ALERM };
}

export function closeRingReceivedAlerm() {
  return { type: CLOSE_ALERM };
}
