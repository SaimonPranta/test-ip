import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { AlertTitle, Alert } from '@material-ui/lab';

// eslint-disable-next-line
export default (WrappedComponent) => {
  return (props) => {
    const {
      user: { approved, banned, rejected },
    } = props.auth;
    if (approved && !banned && !rejected) {
      return <WrappedComponent {...props} />;
    } else {
      return (
        <Dialog fullWidth maxWidth='sm' open>
          <DialogTitle>Profile Status</DialogTitle>
          <DialogContent dividers>
            {!approved && !banned && !rejected && (
              <Alert severity='info'>
                <AlertTitle>Application in review.</AlertTitle>
                <div style={{ fontSize: 13 }}>You'll get a response within 3 business days.</div>
              </Alert>
            )}
            {approved && banned && !rejected && (
              <Alert severity='error'>
                <AlertTitle>Profile has been banned.</AlertTitle>
                <div style={{ fontSize: 13 }}>Please contact our support.</div>
              </Alert>
            )}
            {!approved && !banned && rejected && (
              <Alert severity='warning'>
                <AlertTitle>Application has been rejected.</AlertTitle>
                <div style={{ fontSize: 13 }}>Please contact our support.</div>
                <div style={{ fontSize: 13 }}> Please contact our support.</div>
              </Alert>
            )}
          </DialogContent>
        </Dialog>
      );
    }
  };
};
