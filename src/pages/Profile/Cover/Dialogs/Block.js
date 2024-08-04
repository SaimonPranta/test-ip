import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export default ({ open, close, working, action, name }) => {
  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={close}>
      <DialogTitle>
        <strong>Block {name}</strong>
      </DialogTitle>
      <DialogContent dividers>
        Once you block, you won't be able to see {name} anymore.
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={close}
          disabled={working}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={action}
          disabled={working}
        >
          Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};
