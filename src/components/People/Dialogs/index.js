import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export function Unfriend({ open, close, username, action }) {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>
        Are you sure to unfollow {username}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          style={{
            color: "black",
            border: "1px solid #3f51b5",
            textTransform: "none",
          }}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{
            background: "#3f51b5",
            color: "white",
            textTransform: "none",
          }}
          onClick={action}
        >
          Unfollow
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export function Block({ open, close, username, action }) {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent dividers>Are you sure to block {username}</DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" color="primary" onClick={close}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={action}
        >
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
}
