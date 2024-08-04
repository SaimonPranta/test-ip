import React, { useState, useRef, useEffect } from "react";
import {
  PersonAdd,
  Chat,
  Email,
  PersonAddDisabled,
  MoreVert,
} from "@material-ui/icons";


import { FiLogIn } from "react-icons/fi";

import { Button, Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import {
  Container,
  Space,
  SetCover,
  Buttons,
  AvatarContainer,
  UserProfile,
} from "./style";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { getUserAvatar, getUrl } from "../../../shared/functions";
import { friendRequest } from "../../../shared/functions/Friend";
import { Verified, HoverOver } from "../../../components/Tools";
import { openMailCompose } from "../../../store/site/action";
import { userHeader } from "../../../shared/functions/Token";

import { openChat } from "../../../store/chat/action";
import { openChatByUid } from "../../../sockets/emit";
import { Unfriend, Reports, Blocks } from "./Dialogs";
import { logout } from "../../../store/auth/action";
import { TabWrapper, LogOut } from "../style";

import ProfileTabs from "./ProfileTabs";
import store from "../../../store";
import "./style.scss";
import styles from "./cover.module.css";

import { BiBlock } from "react-icons/bi";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";

import { getFriendCounts } from "../Hooks";



function Cover({ profile, setProfile, history, isMe, dispatch, chat, auth }) {
  const currentUser = window.location.href.match(
    /[a-zA-Z0-9]+_[a-zA-Z0-9]+/
  )[0];
  let followers = getFriendCounts(currentUser).follows || 0;


  const [anchorEl, setAnchorEl] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [openUnfriend, setOpenUnfriend] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [editable, setEditable] = useState(false);
  const [color, setColor] = useState();
  const [colorR, setColorR] = useState(profile.color?.colorR);
  const [colorG, setColorG] = useState(profile.color?.colorG);
  const [colorB, setColorB] = useState(profile.color?.colorB);
  const [btnDisable, setBtnDisable] = useState(false);
  const [unFollowAfterRequest, setunFollowAfterRequest] = useState(false);

  useEffect(() => {
    setColorR(profile.color?.colorR);
    setColorG(profile.color?.colorG);
    setColorB(profile.color?.colorB);
  }, [profile]);

  useEffect(() => {
    if (color) {
      setColorR(color.color.r);
      setColorG(color.color.g);
      setColorB(color.color.b);
    }
  }, [color]);
  let inputCover = useRef();
  function loadNewImage(file, name) {
    setNewImage(file);
    setEdit(name);
  }
  function cancel() {
    setEdit(null);
    setNewImage(null);
    setEditing(false);
  }

  function onSave() {
    if (!newImage || !edit) {
      return;
    }
    if (edit == "avatar") {
      setBtnDisable(true);
    }
    const off = inputCover.scrollTop;
    const body = new FormData();
    body.append(edit, newImage);
    body.append("date", new Date().toISOString());
    if (edit === "cover") {
      body.append("offset", off);
    }
    setEditing(true);
    axios
      .put(`${BACKEND_URL}/profile/profilephoto/${edit}`, body, {
        headers: userHeader(),
      })
      .then(({ data }) => {
        setBtnDisable(false);
        const d = {
          [edit]: data,
        };
        if (edit === "cover") {
          d.offset = off;
        }
        setProfile({ ...profile, ...d });
        cancel();
      })
      .catch((err) => {
        setEditing(false);
        throw err;
      });
  }
  function loadImgAvatar() {
    if (edit === "avatar" && newImage) {
      return URL.createObjectURL(newImage);
    } else {
      // console.log("profile.avatar", profile.avatar);
      return getUserAvatar(profile.avatar, profile.gender, profile.username);
    }
  }
  function onFriendRequest(name) {
    setIsRequesting(true);
    friendRequest(name, profile.username)
      .then(() => {
        if (name === "accept") {
          setProfile({
            ...profile,
            isFriend: true,
            isRequested: null,
          });
        } else {
          if (name === "send") {
            setProfile({
              ...profile,
              isRequested: "sent",
            });
          } else {
            setProfile({
              ...profile,
              isRequested: false,
            });
          }
          setIsRequesting(false);
        }
        setOpenUnfriend(false);
      })
      .catch((e) => {
        setIsRequesting(false);
        throw e;
      });
  }

  function onSearch() {
    if (!search) return;
    history.push(`/search?tab=people&query=${search}`);
  }

  function onReport() {
    setReporting(false);
    setOpenReport(true);
    setAnchorEl(null);
  }

  function onBlock() {
    setBlocking(false);
    setOpenBlock(true);
    setAnchorEl(null);
  }

  function onOpenChat() {
    const room = chat.find((item) => item.user.id === profile.id);
    if (room) {
      dispatch(openChat(room.id));
    } else {
      openChatByUid(profile.id);
    }
  }
  function openCompose() {
    console.log(auth);
    dispatch(openMailCompose(profile.username));
  }
  function blockProfile() {
    setBlocking(true);
    axios
      .post(
        `${BACKEND_URL}/profile/block`,
        { userid: profile.id },
        { headers: userHeader() }
      )
      .then(() => {
        setBlocking(false);
        history.push("/me");
      })
      .catch((err) => {
        setBlocking(false);
        throw err;
      });
  }

  function reportProfile(title, detail) {
    setReporting(true);
    axios
      .post(
        `${BACKEND_URL}/profile/report`,
        { userid: profile.id, title, detail, date: new Date().toISOString() },
        { headers: userHeader() }
      )
      .then(() => {
        setReporting(false);
        setOpenReport(false);
      })
      .catch((err) => {
        setReporting(false);
        throw err;
      });
  }




  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;


  return (
    <div>
      <div className="timeLineProfile" style={{ borderBottom: "1px solid lightgray" }} >
        <Container
          className=""
          style={{
            backgroundPositionY: -profile.offset,
            backgroundImage:
              !!profile.cover &&
              `url(${getUrl(profile.cover, profile.username)})`,
            backgroundColor: "white",
          }} >

          <div className="profile-photo-and-button-section" >

            <div className={styles.userProfile}>
              <img className="" src={loadImgAvatar()} alt="" />
            </div>

            {/* <Buttons> */}
            <div className="button-section">
              {!isMe() && (
                <>
                  {profile?.isFriend ? (
                    <Button
                      variant="contained"
                      style={{
                        background: "#3f51b5",
                        color: "white",
                        textTransform: "capitalize",
                        boxShadow: "none",
                      }}
                      startIcon={
                        unFollowAfterRequest ? (
                          <PersonAdd />
                        ) : (
                          <PersonAddDisabled />
                        )
                      }
                      onClick={() => setOpenUnfriend(true)}
                      disabled={isRequesting}
                    >
                      {unFollowAfterRequest ? "Follow" : "Unfollow"}
                    </Button>
                  ) : (
                    <>
                      {!!profile?.isRequested ? (
                        <>
                          {profile?.isRequested === "sent" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onFriendRequest("cancel")}
                              disabled={isRequesting}
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              Unfollow
                            </Button>
                          ) : (
                            <>
                              <Button
                                color="primary"
                                variant="contained"
                                startIcon={<PersonAdd />}
                                onClick={() => onFriendRequest("accept")}
                                disabled={isRequesting}
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                Confirm
                              </Button>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={() => onFriendRequest("cancel")}
                                disabled={isRequesting}
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<PersonAdd />}
                          onClick={() => onFriendRequest("send")}
                          disabled={isRequesting}
                          style={{
                            textTransform: "capitalize",
                          }}
                        >
                          {" "}
                          Follow
                        </Button>
                      )}
                    </>
                  )}
                  {profile?.isFriend && (
                    <Button
                      style={{
                        background: "#3f51b5",
                        color: "white",
                        textTransform: "none",
                        boxShadow: "none",
                      }}
                      variant="contained"
                      startIcon={<Chat />}
                      onClick={onOpenChat}
                    >
                      Message
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    startIcon={<Email />}
                    onClick={openCompose}
                    style={{
                      background: "#3f51b5",
                      color: "white",
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                  >
                    Mail
                  </Button>
                </>
              )}

              {!isMe() && (
                <IconButton aria-describedby={id} onClick={handleClick}>
                  <MoreVert fontSize="large" style={{ color: "#3f51b5" }} />
                </IconButton>
              )}


              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={origin}
                transformOrigin={origin}
                style={{ marginTop: "20px" }}
              >
                <div style={{ padding: "5px" }}>
                  <MenuItem onClick={onReport}>
                    <BiBlock style={{ fontSize: "19px" }} /> &nbsp; Report
                  </MenuItem>
                  <MenuItem onClick={onBlock}>
                    <ReportOutlinedIcon style={{ fontSize: "19px" }} />{" "}
                    &nbsp; Block
                  </MenuItem>
                </div>
              </Menu>

            </div>

            {/* </Buttons> */}

          </div>

          <div className="user-name-and-bio-section">
            
            <div className="username">
              <h2 style={{ fontWeight: "bold" }} className=" name">
                <Verified
                  name={profile.name}
                  verified={profile.verified}
                  width={18}
                />
              </h2>
              <div
                style={{
                  marginTop: '10px',
                  marginLeft: '3px'
                }}
              >
                <strong style={{ color: "rgb(89 88 88)" }}>
                  {followers <= 1
                    ? `(${followers + " follower"})`
                    : `(${followers + " followers"})`}
                </strong>
              </div>
            </div>

            <div className="bio-in-cover" >{profile.description}</div>
          </div>




        </Container>




        {/* Dialogs */}
        <Unfriend
          open={openUnfriend}
          setunFollowAfterRequest={setunFollowAfterRequest}
          close={() => setOpenUnfriend(false)}
          working={isRequesting}
          action={() => onFriendRequest("cancel")}
        />
        <Reports
          open={openReport}
          close={() => setOpenReport(false)}
          action={reportProfile}
          working={reporting}
        />
        <Blocks
          open={openBlock}
          name={profile.name?.join(" ")}
          close={() => setOpenBlock(false)}
          action={blockProfile}
          working={blocking}
        />
      </div>
      <div className={styles.profileTabs}>
        <ProfileTabs username={profile.username} view={profile.view} />
        {isMe() && (
          <HoverOver title="Logout">
            <LogOut onClick={() => store.dispatch(logout())}>
              <FiLogIn style={{ fontSize: "20px" }} />
            </LogOut>
          </HoverOver>
        )}
      </div>
    </div>
  );
}

export default connect((store) => ({
  chat: store.chat,
  auth: store.auth,
  store: store,
}))(withRouter(Cover));
