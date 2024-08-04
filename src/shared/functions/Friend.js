import axios from 'axios';

import { BACKEND_URL } from '../constants/Variables';
import { updateIntigator } from '../../sockets/emit';
import { userHeader } from './Token';

export function friendRequest(name, username) {
  if (name === 'accept') {
    updateIntigator('profile');
  }
  return axios.post(
    `${BACKEND_URL}/profile/friends/requests/friendship/${name}/${username}`,
    { date: new Date().toISOString() },
    { headers: userHeader() }
  );
}
