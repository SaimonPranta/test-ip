import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import axios from "axios";

import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import { Spinner } from "../../../../shared";

export function AddNote({ open, close, addNote, saving }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);
  function onClose() {
    setError(false);
    setName("");
    setNotes("");
    close();
  }
  function handleChange(_) {
    setName(_.target.value);
    setError(false);
  }
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        <strong>Add a note</strong>
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <TextField
            variant="filled"
            autoFocus
            autoComplete="off"
            onChange={handleChange}
            label="Note's Title"
            margin="normal"
          />
          <TextField
            variant="filled"
            margin="normal"
            multiline
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Type your Note"
          />
          <FormHelperText style={{ color: "red" }} hidden={!error}>
            All fields are required
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
          variant="outlined"
          color="primary"
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={() => addNote(name, notes, "public")}
          disabled={saving || !name || !notes}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// eita change hobe new window er kaz sesh hyle
export function EditNote({ open, close, editing, editNote, id, username }) {
  const [error, setError] = useState("");
  const [working, setWorking] = useState(true);
  const [note, setNote] = useState({});
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (!!id && !!username) {
      axios
        .get(`${BACKEND_URL}/profile/notes/${username}/${id}`, {
          headers: userHeader(),
        })
        .then(({ data }) => {
          setNote(data);
          setName(data.title);
          setNotes(data.note);
          setWorking(false);
        })
        .catch((err) => {
          setWorking(false);
          setError("Something went wrong.");
          throw err;
        });
    }
  }, [id, username]);
  function onClose() {
    setNote({});
    setWorking(true);
    setError(false);
    close();
  }
  function handleChange(_) {
    setName(_.target.value);
    setError(false);
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <strong>Edit note</strong>
      </DialogTitle>
      <DialogContent dividers>
        {working ? (
          <Spinner height={30} />
        ) : (
          <FormControl className="input-control" fullWidth>
            <TextField
              autoFocus
              autoComplete="off"
              onChange={handleChange}
              variant="filled"
              margin="normal"
              label="Note's Title"
              value={name}
            />
            <TextField
              multiline
              onChange={(e) => setNotes(e.target.value)}
              variant="filled"
              rows={5}
              placeholder="Type your Note"
              value={notes}
              margin="normal"
            />
            <FormHelperText style={{ color: "red" }} hidden={!error}>
              All fields are required
            </FormHelperText>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
          variant="outlined"
          color="primary"
          disabled={editing}
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={() => editNote(note.id, { title: name, note: notes })}
          disabled={
            editing ||
            (note.note === notes && note.title === name) ||
            !name ||
            !notes
          }
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function ReadNote({ open, close, id, username }) {
  const [working, setWorking] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState({});
  useEffect(() => {
    if (!!id && !!username) {
      axios
        .get(`${BACKEND_URL}/profile/notes/${username}/${id}`, {
          headers: userHeader(),
        })
        .then(({ data }) => {
          setNote(data);
          setWorking(false);
        })
        .catch((err) => {
          setWorking(false);
          setError("Something went wrong.");
        });
    }
  }, [id, username]);
  function onClose() {
    setNote({});
    setWorking(true);
    setError(null);
    close();
  }
  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      <DialogTitle>
        <strong>My Notes</strong>
      </DialogTitle>
      <DialogContent dividers>
        {!working && !!error && (
          <div style={{ textAlign: "center" }}>{error}</div>
        )}
        {working && !error ? (
          <Spinner height={30} />
        ) : (
          <>
            <div style={{ height: "auto", wordWrap: "break-word" }}>
              <label style={{ marginBottom: "10px" }}>
                <b>Title</b>
              </label>
              <p>{note.title}</p>
            </div>

            <div
              style={{ height: "auto", wordWrap: "break-word", marginTop: 30 }}
            >
              <label style={{ marginBottom: "10px" }}>
                <b>Notes:</b>
              </label>
              {/* <p>{note.note}</p> */}
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: note.note }}
              />
            </div>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={onClose}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function DeleteDialog({ open, close, action, working }) {
  return (
    <Dialog maxWidth="sm" open={open} onClose={close}>
      <DialogTitle>
        <strong>Are you sure?</strong>
      </DialogTitle>
      <DialogContent dividers>
        Let me make you sure that you won't be able to recover this note again
        once you delete it.
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={close}
          variant="outlined"
          color="primary"
          disabled={working}
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={action}
          variant="contained"
          color="primary"
          disabled={working}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
