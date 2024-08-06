import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTO_LOGIN,
  SET_INDICATOR,
  UPDATE_INDICATOR,
  PUSH_INDICATOR,
  PULL_INDICATORS,
  PULL_INDICATOR,
  AFTER_RESET_LOGIN,
} from "./action";

const FULFILLED = "_FULFILLED";
const PENDING = "_PENDING";
const REJECTED = "_REJECTED";

const initialState = {
  user: {
    id: "",
    name: [],
    username: "",
    email: "",
    avatar: "",
    mail: "",
    approved: false,
    rejected: false,
    banned: false,
    description: "",
    mainBalance: 0,
    campaignInfo: {},
    verificationInfo: {},
    blueBadgeInfo: {},
  },

  loggedIn: false,
  loggingIn: true,
  loginError: "",
  loginErrorType: "",
  registering: false,
  registerError: "",
  registerErrorType: "",
  loginLoading: true,
  counts: {
    newsfeed: new Set([]),
    profile: new Set([]),
    mails: new Set([]),
    messanger: new Set([]),
    notifications: new Set([]),
    groups: new Set([]),
  },
  friendrequests: new Set([]),
};

// eslint-disable-next-line
export default (state = initialState, { type, payload }) => { 
console.log(`hello from "AUTO_LOGIN" `, {
  type,
  payload
})
  switch (type) {
    case REGISTER + PENDING:
      return {
        ...state,
        registering: true,
        loggingIn: true,
      };
    case REGISTER + FULFILLED:
      return onLoginFulfilled(state, payload);
    case REGISTER + REJECTED:
      return {
        ...state,
        registerError: payload.response.data.message,
        registerErrorType: payload.response.data.type,
        loggingIn: true,
      };
    case REGISTER:
      console.log("enter to the condition =====>>>");
      return onLoginFulfilled(state, payload);
    case LOGIN + PENDING:
      return {
        ...state,
        loggingIn: true,
        loginError: null,
        loginErrorType: null,
      };
    case LOGIN + FULFILLED:
      // console.log('login fullfill', payload);
      return onLoginFulfilled(state, payload);

    case AFTER_RESET_LOGIN:
      // console.log('login fullfill', payload);
      console.log("echeking", payload);
      return onLoginFulfilled(state, payload);

    case LOGIN + REJECTED:
      return {
        ...state,
        loginError: payload?.response?.data?.message,
        loginErrorType: payload?.response?.data?.type,
        loggingIn: false,
      };
    case LOGOUT + FULFILLED || LOGOUT + REJECTED || LOGOUT + PENDING:
      return onLogout(state);
    case AUTO_LOGIN + PENDING:
      const user = JSON.parse(localStorage.getItem("u"));
      return {
        ...state,
        user,
        loggedIn: true,
        loggingIn: true,
      };
    case AUTO_LOGIN + FULFILLED:
      return onLoginFulfilled(state, payload);
    case AUTO_LOGIN + REJECTED:
      const err = payload.response?.data?.type;
      if (err === "nouser" || err === "expired") {
        localStorage.removeItem("u_t");
        localStorage.removeItem("u");
        localStorage.removeItem("u_exp");
      }
      return {
        ...state,
        user: initialState.user,
        loggedIn: false,
        loggingIn: false,
      };

    case SET_INDICATOR:
      return {
        ...state,
        counts: {
          newsfeed: new Set(payload.newsfeed),
          profile: new Set(payload.profile),
          mails: new Set(payload.mails),
          messanger: new Set(payload.messanger),
          notifications: new Set(payload.notifications),
          groups: new Set(payload.groups),
        },
        friendrequests: new Set(payload.profile),
      };
    case UPDATE_INDICATOR:
      return {
        ...state,
        counts: {
          ...state.counts,
          [payload.name]: new Set(payload.ids),
        },
        friendrequests:
          payload.name === "profile"
            ? new Set(payload.ids)
            : state.friendrequests,
      };
    case PUSH_INDICATOR:
      state.counts[payload.name].add(payload.id);
      return state;
    case PULL_INDICATORS:
      for (const id of payload.ids) {
        state.counts[payload.name].delete(id);
      }
      return state;
    case PULL_INDICATOR:
      state.counts[payload.name].delete(payload.id);
      return state;

    case "SET_AUTH":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};


function onLoginFulfilled(state, { data: { user, token } }) {
  const u_exp = Date.now() + 1296000000;
  // const u_exp = Date.now() + 604800000;
  document.cookie = `token=${token}`;
  localStorage.setItem("u_exp", u_exp);
  localStorage.setItem("u_t", token);
  localStorage.setItem("u", JSON.stringify(user));
  // console.log('login fullfil user', user);
  return {
    ...state,
    user,
    loggedIn: true,
    loginError: "",
    registerError: "",
    loggingIn: false,
    loginErrorType: null,
  };
}
function onLogout(state) {
  localStorage.removeItem("u_exp");
  localStorage.removeItem("u");
  localStorage.removeItem("u_t");
  return {
    ...state,
    loggedIn: false,
    user: initialState.user,
  };
}
