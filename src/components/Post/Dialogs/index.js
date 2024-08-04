import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    minWidth: "400px",
    width: "400px"
  },

}));


export function EditPost({ open, close, content, onSave }) {
  const [input, setInput] = useState(content || "");
  function onSubmit() {
    const value = input.trim();
    if (!!value) {
      onSave(input);
    }
  }
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle>
        <strong>Edit Post</strong>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          placeholder="New content"
          multiline
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" color="primary" onClick={close}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={content === input}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export function DeletePost({ open, close, action }) {


  const classes = useStyles();

  return (
    // <Dialog open={open} onClose={close}  classes={{ paper: classes.paper }}>
    <Dialog open={open} onClose={close}  classes={{ paper: classes.paper }}>
      <DialogTitle>
        <strong>Delete Post</strong>
      </DialogTitle>
      <DialogContent dividers>
        <strong>Are you sure to delete the post.</strong>
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
          Close
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
