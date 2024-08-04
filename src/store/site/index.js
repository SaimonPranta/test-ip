import {
  FETCH_SITE_INFO,
  _USER_OPENED_SUPPORT_CHATROOM_,
  OPEN_MAIL_COMPOSE,
  CLOSE_MAIL_COMPOSE,
  SENT_ALERM,
  RECEIVED_ALERM,
  CLOSE_ALERM,
} from "./type";
import { initState, onFetchSiteInfo, onSupportChatOpened } from "./function";

const FULFILLED = "_FULFILLED";
// eslint-disable-next-line
export default (state = initState, { type, payload }) => {
  switch (type) {
    case FETCH_SITE_INFO + FULFILLED:
      return onFetchSiteInfo(state, payload);
    case _USER_OPENED_SUPPORT_CHATROOM_:
      return onSupportChatOpened(state, payload);
    case OPEN_MAIL_COMPOSE:
      return {
        ...state,
        mail: {
          ...state.mail,
          address: payload,
          compose: true,
        },
      };
    case CLOSE_MAIL_COMPOSE:
      return {
        ...state,
        mail: {
          ...state.mail,
          address: "",
          compose: false,
        },
      };
    case SENT_ALERM:
      return {
        ...state,
        alerm: {
          ...state.alerm,
          sent: Date.now(),
        },
      };
    case RECEIVED_ALERM:
      return {
        ...state,
        alerm: {
          ...state.alerm,
          received: Date.now(),
        },
      };

    case CLOSE_ALERM:
      return {
        ...state,
        alerm: {
          ...state.alerm,
          received: 0,
          sent: 0,
        },
      };
    case "SET_SITE":
      return {
        ...state,
        ...payload,
      };
    default:
      return { ...state };
  }
};
