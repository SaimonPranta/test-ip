import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

export default ({ open, close }) => {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle style={{ textAlign: "center" }}>
        <strong>Advertise</strong>
      </DialogTitle>
      <DialogContent dividers>
        <p>Lorem ipsam text.</p>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={close}
          style={{ fontSize: 14, textTransform: "initial", padding: "0 5px" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
