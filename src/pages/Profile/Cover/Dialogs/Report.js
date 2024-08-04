import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";

import "./style.scss";

const conditions = [
  "Fake account",
  "My another Account",
  "Harassment or bullying",
  "Posting sexual or inappropriate content",
  "Abusing me",
  "Something else",
];

export default ({ open, close, working, action }) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  return (
    <Dialog className="MaindivReport" open={open} fullWidth maxWidth="sm" onClose={close}>
      <DialogTitle>
        <strong>Report</strong>
      </DialogTitle>
      <DialogContent dividers>
        {/* 
        <List component={RadioGroup}>
          {conditions.map((val, i) => (
            <ListItem
              key={i}
              role={undefined}
              value={val}
              onClick={() => setTitle(val)}
              component={FormControlLabel}
              label={val}
              control={<Radio />}
            />
          ))}
        </List>
        <textarea
          variant="filled"
          rows={5}
          fullWidth
          multiline
          label="Please describe the issue."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        /> */}
        <List component={RadioGroup}>
          {conditions.map((val, i) => (
            <ListItem
              key={i}
              role={undefined}
              value={val}
              onClick={() => setTitle(val)}
              component={FormControlLabel}
              label={val}
              control={<Radio />}
            />
          ))}
        </List>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="reportTextarea"
          style={{ width: "100%" }}
          placeholder="Please describe the issue."
        ></textarea>
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
          onClick={() => action(title, detail)}
          disabled={working || !title || !detail}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
