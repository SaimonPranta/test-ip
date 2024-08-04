import React, { useState, useRef } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import {
  Icon,
  Menu,
  MenuItem,
  IconButton,
  Popper,
  Fade,
} from "@material-ui/core";
import { MoreVert, Public, People, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";

import {
  editPrivacy,
  deletePost,
  editContent,
  hidePost,
} from "../../../sockets/emit";
import { getUserAvatar, getUrl } from "../../../shared/functions";
import { EditPost, DeletePost } from "../Dialogs";
import { Verified } from "../../Tools";
import When from "../../When";

import "./style.scss";



import { makeStyles } from "@material-ui/core/styles";
import { RiPushpin2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { FiCamera } from "react-icons/fi"
import { IoNotificationsOffOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { userHeader } from "../../../shared/functions/Token";
import { BACKEND_URL } from "../../../shared/constants/Variables";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));
export default ({
  user: { name, username, avatar, gender, verified },
  privacy,
  date,
  postId,
  status,
  edited,
  content,
  isMe,
  media,
  setPeditStatus,
  editStatus,
  postStatus
}) => {
  const [privacyOpt, setPrivacyOpt] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [downloadFile, setDownloadFile] = useState("");
  const [fileName, setFileName] = useState("");
  let downloadRef = useRef();
  const origin = {
    vertical: "top",
    horizontal: "right",
  };
  function onEdit() {
    setEdit(true);
    setAnchorEl(null);
  }
  function onSave(val) {
    editContent(postId, val);
    setEdit(false);
    if (postStatus == 10) {
      setPeditStatus(11);
    }
  }



  function onCopy() {
    navigator.clipboard.writeText(getUrl(media[0].url, username));
    // alert.success("Copied")
    setAnchorEl(null);
    alert.show("Oh look, an alert!");
  }
  function onDownload() {
    fetch(getUrl(media[0].url, username))
      .then((res) => res.blob())
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        setDownloadFile(objectURL);
        setFileName(media[0].id + "." + media[0].types2);
        setAnchorEl(null);
        downloadRef.current.click();
      });
  }

  function onDelete() {
    deletePost(postId);
    setDeleteModal(false);
  }
  function onHide() {
    hidePost(postId);
    setAnchorEl(null);
  }
  function changePrivacy(p) {
    editPrivacy(postId, p);
    setPrivacyOpt(null);
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  const makeCover = (event) => {

    setAnchorEl(anchorEl ? null : event.currentTarget);

    const body = {
      postId: postId,
      type: "cover"
    }

    axios.put(`${BACKEND_URL}/profile/update-cover-avater`, body, {
      headers: userHeader()
    });

  }



  const makeProfile = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);

    const body = {
      postId: postId,
      type: "avatar"
    }

    axios.put(`${BACKEND_URL}/profile/update-cover-avater`, body, {
      headers: userHeader()
    })

  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const alert = useAlert();

  return (
    <div className="top-section">
      <div className="UserInfo">
        <div className="userProfile ">
          <img
            className="userImg  "
            src={getUserAvatar(avatar, gender, username)}
            alt=""
          />
          <div className="userInfo">
            <Link
              style={{ color: "black" }}
              to={`/${username}`}
              className="userName"
            >
              <span style={{ lineHeight: 1, }}>
                <Verified name={name} verified={verified} />{" "}
              </span>
              {!!status && <small>{status}</small>}
            </Link>


            {
              editStatus ?
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p className=" timeAgo">
                    <When date={date} />
                  </p>

                  <IconButton
                    style={{ padding: "0 10px" }}
                    disabled={!(isMe() && editStatus)}
                    onClick={(e) => {
                      setPrivacyOpt(e.currentTarget);

                    }}
                  >

                    {privacy === "private" ? (
                      <Lock />
                    ) : privacy === "friends" ? (
                      <People />
                    ) : (
                      <Public />
                    )}
                  </IconButton>

                  <Menu
                    anchorEl={privacyOpt}
                    keepMounted
                    open={!!privacyOpt}
                    onClose={() => setPrivacyOpt(null)}
                  >
                    <MenuItem onClick={() => changePrivacy("public")}>
                      Public
                    </MenuItem>
                    <MenuItem onClick={() => changePrivacy("friends")}>
                      Friends
                    </MenuItem>
                    <MenuItem onClick={() => changePrivacy("private")}>
                      Only me
                    </MenuItem>
                  </Menu>


                  {edited && <span style={{ fontSize: "12px" }}>Edited</span>}
                </div>
                :
                <p>Sponsored</p>

            }




          </div>
        </div>
      </div>
      <div className="opts">
        <Icon
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={(e) => setAnchorEl(e.currentTarget)}
          onClick={handleClick}
        >
          <MoreVert />
        </Icon>



        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={origin}
          transformOrigin={origin}
        >
          {isMe() && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={handleClick}
              >
                {" "}
                <RiPushpin2Line
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />{" "}
                Pin
              </p>
            </MenuItem>
          )}
          {(isMe() && editStatus) && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={onEdit}
              >
                <BiEdit style={{ fontSize: "20px", marginRight: "4px" }} /> Edit
              </p>
            </MenuItem>
          )}
          {isMe() && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={onCopy}
              >
                <MdContentCopy
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />{" "}
                Copy
              </p>
            </MenuItem>
          )}
          {isMe() && (
            <MenuItem>
              <p
                style={{
                  width: "100%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={onDownload}
              >
                <FiDownload style={{ fontSize: "20px", marginRight: "4px" }} />{" "}
                Download
              </p>
            </MenuItem>
          )}
          <a
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            ref={downloadRef}
            href={downloadFile}
            target="_blank"
            download={fileName}
          ></a>
          {isMe() && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={handleClick}
              >
                <IoNotificationsOffOutline
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />
                Turn off notification
              </p>
            </MenuItem>
          )}


          {(media[0]?.types === 'image' && isMe()) && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={makeProfile}
              >
                <FiCamera
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />
                Make profile
              </p>
            </MenuItem>
          )}
          {(media[0]?.types === 'image' && isMe()) && (
            <MenuItem>
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
                onClick={makeCover}
              >
                <FiCamera
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />
                Make cover
              </p>
            </MenuItem>
          )}
          {/* profile and cover photo making area END */}


          {(editStatus && isMe()) && (
            <MenuItem
              onClick={() => {
                setDeleteModal(true);
                setAnchorEl(null);
              }}
            >
              <p
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AiOutlineDelete
                  style={{ fontSize: "20px", marginRight: "4px" }}
                />{" "}
                Delete
              </p>
            </MenuItem>
          )}
          {/* <MenuItem>{isMe() && <p onClick={onHide}>Hide</p>}</MenuItem> */}
          <MenuItem>
            {!isMe() && <p onClick={() => setAnchorEl(null)}>Report</p>}
          </MenuItem>
        </Menu>
        <EditPost
          open={edit}
          close={() => setEdit(false)}
          content={content}
          onSave={onSave}
        />
        <DeletePost
          open={deleteModal}
          close={() => setDeleteModal(false)}
          action={onDelete}
        />
      </div>
    </div>
  );
};
