import React, { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getUserAvatar, getUrl } from "../../../shared/functions";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  editPrivacy,
  deletePost,
  editContent,
  hidePost,
} from "../../../sockets/emit";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function DeletePic({ Fullphoto, setAnchorEl }) {
  const classes = useStyles();
  //   const [anchorEl, setAnchorEl] = React.useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);

  function onDelete() {
    deletePost(Fullphoto.post);
    setDeleteModal(false);
  }
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setDeleteModal(true);

            handleOpen();
          }}
        >
          <AiOutlineDelete style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
          Delete
        </p>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default DeletePic;
