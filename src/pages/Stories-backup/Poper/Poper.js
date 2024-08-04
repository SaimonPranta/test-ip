import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AiOutlineDelete, AiOutlineSetting } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Lock, People, Public } from "@material-ui/icons";

export default function StorySettingAction({ privacy, setPrivacy }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("privacy", privacy);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <AiOutlineSetting
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{
          color: "black",
          fontSize: "30px",
          alignSelf: "center",
        }}
      /> */}
      {privacy === "Public" && (
        <Public
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{
            color: "black",
            fontSize: "25px",
            alignSelf: "center",
          }}
        />
      )}
      {privacy === "Friends" && (
        <People
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{
            color: "black",
            fontSize: "25px",
            alignSelf: "center",
          }}
        />
      )}
      {privacy === "Private" && (
        <Lock
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          style={{
            color: "black",
            fontSize: "25px",
            alignSelf: "center",
          }}
        />
      )}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <p>
          <p
            className="NoteActionOption"
            onClick={() => {
              setPrivacy("Public");
              setAnchorEl(null);
            }}
          >
            <Public /> Public
          </p>
        </p>

        <small>
          <p
            className="NoteActionOption"
            onClick={() => {
              setPrivacy("Private");
              setAnchorEl(null);
            }}
          >
            <Lock /> Private
          </p>
        </small>

        <p>
          <p
            className="NoteActionOption"
            onClick={() => {
              setPrivacy("Friends");
              setAnchorEl(null);
            }}
          >
            <People /> Friends
          </p>
        </p>
      </Popover>
    </div>
  );
}
