import React from 'react';
import { Redirect } from 'react-router-dom';

import { USERNAME_REGEX } from '../constants/RegEx';

export default function checkUsername(WrappedComponent) {
  return props => {
    if (USERNAME_REGEX.test(props.match.params.username)) {
      return <WrappedComponent {...props} />;
    } else {
      return <Redirect to='/' />;
    }
  };
}
