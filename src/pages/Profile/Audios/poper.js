import React, { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

import Popover from "@material-ui/core/Popover";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.scss";
import { DeletePost } from "../../../components/Post/Dialogs";
import { getUrl } from "../../../shared/functions";
import {
  editPrivacy,
  deletePost,
  editContent,
  hidePost,
} from "../../../sockets/emit";


function Poper({
  username,
  audioid,
  audiourl,
  FullAudio,
  handleOpen,
  audioPictitle,
  media,
  setMedia
}) {
  let downloadRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [fileName, setFileName] = useState("");


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = (event) => {
    setDeleteModal(true)
    setAnchorEl(null);
    setAnchorEl1(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  function onCopy() {
    navigator.clipboard.writeText(getUrl(audiourl, username));
    setAnchorEl(null);
  }


  function onDownload() {
    fetch(getUrl(audiourl, username))
      .then((res) => res.blob())
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        setDownloadFile(objectURL);
        setFileName(audioid + "." + "mp3");
        setAnchorEl(null);
        downloadRef.current.click();
      });
  }

  function onDelete() {


    deletePost(FullAudio.post);
    const updateMedia = media?.filter((post) => post.post !== FullAudio.post)
    setMedia(updateMedia)

    setDeleteModal(false);
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <p className="audio-actionBtn" onClick={handleClick}>
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
            handleOpen(audioid, audioPictitle);
          }}
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
          onClick={(e) => handleDelete(e)}
        >
          <AiOutlineDelete style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
          Delete
        </p>
      </Popover>

      <DeletePost
        open={deleteModal}
        anchorEl={anchorEl1}
        close={() => setDeleteModal(false)}
        action={onDelete}
      />
    </div>
  );
}

export default Poper;
