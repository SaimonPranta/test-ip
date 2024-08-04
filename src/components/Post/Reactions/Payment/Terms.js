import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';

export default ({ open, close }) => {
  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>
        <strong>Terms & Conditions</strong>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant='subtitle1' gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
          porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
          auctor.
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
          dui. Donec ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close} variant='outlined' color='primary'>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
