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
import {
  editPrivacy,
  deletePost,
  editContent,
  hidePost,
} from "../../../sockets/emit";
import { DeletePost } from "../../../components/Post/Dialogs";
import DeletePic from "./DeletePic";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../../shared/constants/Variables";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function Poper({username, photoid, Fullphoto, handleOpen, photourl, photoPictitle, setMedia, media }) {
  let downloadRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const hanndleDelete = (event) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onCopy() {
    navigator.clipboard.writeText(getUrl(photourl, username));
    setAnchorEl(null);
  }
  function onDownload() {
    fetch(getUrl(photourl, username))
      .then((res) => res.blob())
      .then((blob) => {
        // console.log(media[0].types2, "file extension");
        let objectURL = URL.createObjectURL(blob);
        setDownloadFile(objectURL);
        setFileName(photoid + "." + "png");
        setAnchorEl(null);
        downloadRef.current.click();
      });
  }

  function onDelete() {

    deletePost(Fullphoto.post);
    const updateMedia = media.filter((post) => post.post !== Fullphoto.post )
    setMedia(updateMedia)

    setDeleteModal(false);
    setAnchorEl(null);
  }


  // useEffect(() => {}, [deleteModal]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  return (
    <div>

      <p className="ActionBtn-1" onClick={handleClick}>
        <HiDotsVertical />
      </p>

      <Popover
        className="popercustome"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setAnchorEl(null);
            handleOpen(photoid, photoPictitle);
          }}
          // onClick={() =>
          //   editHandler(photo.id)
          // }
        >
          <BiEdit
            style={{
              fontSize: "20px",
              marginRight: "4px",
            }}
          />{" "}
          Edit
        </p>

        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onCopy}
        >
          <MdContentCopy
            style={{
              fontSize: "20px",
              marginRight: "4px",
            }}
          />{" "}
          Copy
        </p>

        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onDownload}
        >
          <FiDownload style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
          Download
        </p>

        <a
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          ref={downloadRef}
          href={downloadFile}
          target="_blank"
          download={fileName}
        ></a>
        {/* <DeletePic setAnchorEl={setAnchorEl} Fullphoto={Fullphoto} /> */}
        
        
        <p
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            setDeleteModal(true);
            setAnchorEl(null);
            hanndleDelete
            // setAnchorEl(null);
          }}
        >
          <AiOutlineDelete style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
          Delete
        </p>
      </Popover>

        <DeletePost
          open={deleteModal}
          anchorEl={anchorEl1}
          close={() =>{
            setDeleteModal(false);
            // setAnchorEl(null);
          }}
          action={onDelete}
        />
    </div>
  );
}

export default Poper;
