import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Popover from "@material-ui/core/Popover";

import { HiDotsVertical } from "react-icons/hi";
import { Buttons, PoperIcon } from "../style";
import { HoverOver } from "../../../../components/Tools";
import { DeletePost } from "../../../../components/Post/Dialogs";

import { MdContentCopy } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";


import {
  BACKEND_URL,
  BACKEND_URL2,
} from "../../../../shared/constants/Variables";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function NoteActionPoper({
  editNote,
  setEditId,
  handleOpen,
  setEditModal,
  deleteNote,
  isMe,
  note,
  deleting,
  username,
  noteSelectedId,
  anchorEl,
  setAnchorEl
}) {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteid, setDeleteid] = useState()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function onCopy() {
    // navigator.clipboard.writeText(
    //   `${BACKEND_URL2}/${username}/notePreview/${note.id}`
    // );

    //creating public note link
    navigator.clipboard.writeText(
      `${BACKEND_URL2}view/${note?.webLinkAddress}`
    );
    setAnchorEl(null);
  }

  // eikhane shudu edit er part
  var myWindow = (url, id) => {
    window.open(
      `/${url}/${username}/${id}`,
      "Data",
      "height=1000,width=2000"
    );
  };

  const hanndleDeletePoper = (event) => {
    setAnchorEl1(event.currentTarget)

    setDeleteid(note.id);
  }

  const handleDelete = () => {
    deleteNote(deleteid)
  }

  // useEffect(() => { }, [noteSelectedId]);

  return (
    <div>
      {/* <p onClick={handleClick}>Open Popover</p> */}
      {isMe() && (
        <PoperIcon onClick={handleClick}>
          <HiDotsVertical />
        </PoperIcon>
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
        {/* <Buttons> */}
        {/* <HoverOver title="Privacy">
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              disabled={!isMe()}
            >
              {note.privacy === "private" ? (
                <Lock />
              ) : note.privacy === "friends" ? (
                <People />
              ) : (
                <Public />
              )}
            </IconButton>
          </HoverOver> */}
        <p>
          {isMe() && (
            <p
              className="NoteActionOption"
              onClick={() => {
                myWindow("edit-note", note.id);
                // setEditModal(true);
                setAnchorEl(null);
                setEditId(note.id);
              }}
            >
              <BiEdit /> Edit
            </p>
          )}
        </p>

        <p>
          {isMe() && (
            <p
              className="NoteActionOption"
              onClick={() => {
                setAnchorEl(null);
                setEditId(note.id);
                handleOpen(note.id);
              }}
            >
              <BiEdit /> Modify
            </p>
          )}
        </p>

        {/* <Link to={`/note/${note.id}`}>Click</Link> */}

        {/* <Link
          to={`http://localhost:3000/${username}/notePreview/${note.id}`}
          target="_blank"
          download
        >
          Download
        </Link> */}
        <small>
          {isMe() && (
            <p className="NoteActionOption" onClick={onCopy}>
              <MdContentCopy /> Copy
            </p>
          )}
        </small>

        <p>
          {isMe() && (
            <p
              className="NoteActionOption"
              onClick={() => {
                setDeleteModal(true);
                setAnchorEl(null);
                hanndleDeletePoper(note.id)
              }}
            >
              <AiOutlineDelete /> Delete
            </p>
          )}
        </p>

      </Popover>

      {/* eitar change er dorkr nai  */}
      <DeletePost
        open={deleteModal}
        anchorEl={anchorEl1}
        close={() => setDeleteModal(false)}
        action={handleDelete}
      />
    </div>
  );
}
