import axios from 'axios';
// fixing remove token from cookies , for that need this package
import Cookies from 'universal-cookie';

import { BACKEND_URL } from '../../shared/constants/Variables';
import { userHeader } from '../../shared/functions/Token';

export const LOGIN = 'LOGIN';
export const AFTER_RESET_LOGIN = 'AFTER_RESET_LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const SET_INDICATOR = 'SET_INDICATOR';
export const PUSH_INDICATOR = 'PUSH_INDICATOR';
export const PULL_INDICATOR = 'PULL_INDICATOR';
export const PULL_INDICATORS = 'PULL_INDICATORS';
export const UPDATE_INDICATOR = 'UPDATE_INDICATOR';
// export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';

// export function updateDescription(){
//   return { type: UPDATE_DESCRIPTION, payload: axios.get(`${BACKEND_URL}/profile/description`) }
// }
export function login(username, password ) {
  return { type: LOGIN, payload: axios.post(`${BACKEND_URL}/user/auth/login`, { username, password }) };
}

//automate login after reset password
export function automateLoginAfterResetPassword(loginDetails) {
  return { type: AFTER_RESET_LOGIN, payload: loginDetails };
}

export function signup(body) {
  return { type: REGISTER, payload: axios.post(`${BACKEND_URL}/user/auth/signup`, body)};
}

//cookies issue area start
const cookies = new Cookies();
export function logout() {
  cookies.remove('token', 'null');
  return { type: LOGOUT, payload: axios.get(`${BACKEND_URL}/user/auth/logout`) };
}
//cookies issue area end

export function auto() {
  const u_exp = parseInt(localStorage.getItem('u_exp'));
  const user = JSON.parse(localStorage.getItem('u'));
  const token = localStorage.getItem('u_t');
  if (u_exp && u_exp > Date.now() && user && token) {
    return {
      type: AUTO_LOGIN,
      payload: axios.get(`${BACKEND_URL}/user/auth/auto`, { headers: userHeader() }),
    };
  } else {
    return { type: 'SET_AUTH', payload: { loggedIn: false } };
  }
}

export function setIndicators(payload) {
  return { type: SET_INDICATOR, payload };
}
export function updateIndicator(payload) {
  return { type: UPDATE_INDICATOR, payload };
}
export function pushIndicator(name, id) {
  return { type: PUSH_INDICATOR, payload: { name, id } };
}
export function pullIndicators(name, ids) {
  return { type: PULL_INDICATORS, payload: { name, ids } };
}
export function pullIndicator(name, id) {
  return { type: PULL_INDICATOR, payload: { name, id } };
}
