import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export default ({ open, close, action, working, name, setunFollowAfterRequest }) => {
  console.log(action);
  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={close}>
      <DialogTitle>
        <strong>Unfollow {name}</strong>
      </DialogTitle>
      <DialogContent dividers>Are you sure to unfollow?</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={close}
          disabled={working}
          style={{
            textTransform: "capitalize",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            action()
            setunFollowAfterRequest(true)
          }}
          disabled={working}
          style={{
            textTransform: "capitalize",
          }}
        >
          Unfollow
        </Button>
      </DialogActions>
    </Dialog>
  );
};
