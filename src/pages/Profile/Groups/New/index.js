import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogTitle,
  IconButton,
  Chip,
  Paper,
  Avatar,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { Group, Close } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import { getUserAvatar } from "../../../../shared/functions";
import { getFriendSugGroup } from "../../Hooks";
import { Spinner } from "../../../../shared";
import "../style.scss";

export default ({ open, close, setGroup }) => {
  const [nameInput, setNameInput] = useState("");
  const [description, setDescription] = useState("");
  const [searchI, setSearchI] = useState("");
  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [working, setWorking] = useState(false);
  const [selected, setSelected] = useState([]);
  const results = getFriendSugGroup(searchI.trim(), selected);
  function createGroup() {
    const name = nameInput.trim();
    const desc = description.trim();
    if (!name || !desc) {
      setError("Missing input.");
      return;
    }
    setWorking(true);
    const data = {
      name,
      description: desc,
      friends: [...selected.map((i) => i.id)],
      privacy,
      date: new Date().toISOString(),
    };
    axios
      .post(`${BACKEND_URL}/groups/group`, data, { headers: userHeader() })
      .then(({ data }) => {
        setGroup(data);
        setWorking(false);
        close();
      })
      .catch(() => setWorking(false));
  }
  function onSelect(item) {
    const ind = selected.findIndex((i) => i.id === item.id);
    if (ind > -1) {
      setSearchI("");
      return;
    }
    setSelected([...selected, item]);
    setSearchI("");
  }
  return (
    <Dialog open={open}>
      <DialogTitle onClose={close}>
        Create New Group
        <IconButton
          color="primary"
          onClick={close}
          disabled={working}
          style={{ position: "absolute", right: 20, top: 10 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className="group-modal-info-a4">
          <div className="group-modal-icon-div-a5">
            <Group className="group-modal-icon-a6" />
          </div>
          <div className="group-moadl-info-div-a7">
            <div className="group-modal-info-p-a8">
              Groups are great for getting things done staying in touch with
              just the people are you want. Share photos and videos, have
              conversations, make plans and more.
            </div>
          </div>
        </div>

        {!!error && <div>{error}</div>}

        <div className="group-modal-group-name-a8">
          <TextField
            className="group-name-a9"
            label="Group Name (within 32 letters)"
            fullWidth
            margin="normal"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            variant="outlined"
          />
        </div>
        <div className="group-modal-group-name-a8">
          <TextField
            className="group-name-a9"
            label="Group Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={5}
          />
        </div>

        <div className="group-modal-group-name-a8">
          <Autocomplete
            freeSolo
            disableClearable
            options={results}
            renderOption={(op) => (
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => onSelect(op)}
              >
                <Avatar alt="" src={getUserAvatar(op.avatar, op.gender, op.username)} />
                <Typography
                  component="h4"
                  variant="h5"
                  style={{ marginLeft: 10 }}
                >
                  {op.name}
                </Typography>
              </div>
            )}
            getOptionLabel={(op) => op.name}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Search Followers"
                value={searchI}
                onChange={(e) => setSearchI(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            )}
          />
        </div>

        {selected.length > 0 && (
          <Paper component="ul" className="respg">
            {selected.map((u) => (
              <li key={u.id}>
                <Chip
                  avatar={
                    <Avatar alt="" src={getUserAvatar(u.avatar, u.gender, u.username)} />
                  }
                  label={u.name}
                  onDelete={() =>
                    setSelected([...selected.filter((i) => i.id !== u.id)])
                  }
                />
              </li>
            ))}
          </Paper>
        )}

        <div className="group-modal-group-name-a8">
          <FormControl
            component="fieldset"
            style={{ margin: "10px 0 0", width: "100%" }}
          >
            <FormLabel component="legend" style={{ fontSize: 15, padding: 5 }}>
              Group Privacy
            </FormLabel>
            <RadioGroup
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              style={{ flexDirection: "initial" }}
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="secret"
                disabled
                control={<Radio />}
                label="Secret"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={close}
          variant="contained"
          color="primary"
          disabled={working}
        >
          Cancel
        </Button>
        <Button
          onClick={createGroup}
          variant="contained"
          color="primary"
          disabled={
            !nameInput || nameInput.length > 32 || !description || working
          }
        >
          {working ? <Spinner height="25px" /> : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
