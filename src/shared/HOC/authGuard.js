import React from 'react';
import { Redirect } from 'react-router-dom';

import store from '../../store';

export default function authGuard(WrappedComponent) {
  return (props) => {
    if (store.getState().auth.loggedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to='/' />;
    }
  };
}
