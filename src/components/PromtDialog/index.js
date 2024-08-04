import React, { forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

import { Spinner } from "../../shared";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({
  open,
  close,
  working,
  takeAction,
  message = "",
  title = "Are you sure?",
  btnText = "Delete",
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={close}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle style={{ fontSize: "20px" }}>{title}</DialogTitle>
      {!!message && (
        <DialogContent dividers>
          <DialogContentText variant="h5">{message}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          onClick={close}
          color="default"
          variant="outlined"
          disabled={working}
        >
          Cancel
        </Button>
        <Button
          onClick={takeAction}
          color="primary"
          variant="contained"
          disabled={working}
        >
          {working ? <Spinner height={1} /> : btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
