import React, { useState, useEffect, useRef } from "react";
import {
  CloseOutlined,
  Call,
  Duo,
  Close,
  PhotoLibrary,
  EmojiEmotions,
  Attachment,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import Scroll from "react-scroll-to-bottom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { sendMessage, getMessages } from "../../../../sockets/emit";
import { readImage } from "../../../../shared/functions/Avatar";
import { getUserAvatar, getUrl } from "../../../../shared/functions";
import Wave from "../../../../assets/messages/Wave.png";
// import { Reactions } from '../../../../shared';
import { HoverOver } from "../../../Tools";
// import { InconWrapper } from '../style';
import Reaction from "../Reactions";
import { When } from "../../..";
import "./style.scss";

function Chat({ room, index, onToggle, onClose, sendWave, auth }) {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [showReacts, setShowReacts] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  let right = "17vw";
  switch (index) {
    case 0:
      right = "17vw";
      break;
    case 1:
      right = "17vw";
      break;
    case 2:
      right = "17vw";
      break;
    default:
      right = "17vw";
      break;
  }
  useEffect(() => {
    getMessages(room.id);
  }, [room.id]);
  function sendReaction(name) {
    sendMessage(room.id, name);
  }
  function onSendMsg(e) {
    if (e.key === "Enter" && (!!input || !!image)) {
      if (image) {
        readImage(image)
          .then((data) => {
            sendMessage(room.id, "text", input, {
              data,
              name: image.name,
              type: image.type,
            }, auth.user.username);
          })
          .catch((e) => setError(e));
      } else {
        sendMessage(room.id, "text", input);
      }
      setInput([]);
      setImage(null);
      setError("");
    }
  }
  function getPerson(username) {
    if (auth.user.username === username) {
      return "sender";
    } else {
      return "reciever";
    }
  }
  function createPopupWin(pageURL, pageTitle, popupWinWidth, popupWinHeight) {
    var left = (window.screen.width - popupWinWidth) / 2;
    var top = (window.screen.height - popupWinHeight) / 4;

    var myWindow = window.open(
      pageURL,
      pageTitle,
      "resizable=yes, width=" +
        popupWinWidth +
        ", height=" +
        popupWinHeight +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }
  function makeCall(type) {
    createPopupWin("/call", "Micple Call", 1280, 720);
  }
  function selectImage({ target }) {
    const file = target.files[0];
    if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1])) {
      setError("Invalid image type.");
    } else if (file.size > 1048576) {
      setError("Image is too large");
    } else {
      setError("");
      setImage(file);
    }
  }
  
  return (
    <div
      className={` chat-container ${!!room.minimized ? "minimized" : ""}`}
      style={{ right }}
    >
      <div className="header">
        <div className="user">
          <img
            className="user-img"
            src={getUserAvatar(room.user.avatar, room.user.gender, room.user.username)}
            alt=""
          />
          <h2 className="chat-user-name">
            <Link style={{ color: "black" }} to={`/${room.user.username}`}>
              {room.user.name?.join(" ")}
            </Link>
          </h2>
        </div>
        <span onClick={onToggle}></span>
        <div className="chat-header-options">
          {/* {!room.minimized && (
            <IconButton onClick={() => makeCall('video')}>
              <Duo style={{ fontSize: 20 }} />
            </IconButton>
          )} */}
          {!room.minimized && (
            <IconButton onClick={() => makeCall("audio")}>
              <Call style={{ fontSize: 20 }} />
            </IconButton>
          )}
          <IconButton onClick={onClose}>
            <Close style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>

      {!room.minimized && (
        <>
          <div
            className="chat-list-container"
            style={{
              height: !!image
                ? 177
                : !!error
                ? 266
                : "calc(100% - 43px - 70px)",
            }}
          >
            <Scroll className="chats-list" style={{ wordBreak: "break-all" }}>
              {room.messages?.map((message) => (
                <div
                  key={`${message.id}`}
                  className={`chat-msg ${getPerson(message.user.username)}`}
                >
                  <HoverOver
                    // title={<When date={message.date} />}
                    placement={
                      getPerson(message.user.username) === "sender"
                        ? "left"
                        : "right"
                    }
                  >
                    <div className="msg">
                      {/* <InconWrapper left={getPerson(message.user.username) === 'sender'}>
                      <Reactions open={anchorEl} close={() => setAnchorEl(null)} onReact={(name) => onReact(message.id, name)} />
                      <i style={{ cursor: 'pointer' }} className='far fa-smile' onClick={(e) => setAnchorEl(e.currentTarget)} />
                    </InconWrapper> */}
                      {message?.deleted || false ? (
                        <span className="deleted">Message deleted.</span>
                      ) : (
                        <>
                          {message.type === "text" && (
                            <div>
                              <div
                              //new code
                                className={
                                  message.content.match(/.gif/g)
                                    ?.length >= 1
                                    ? "text-msg2"
                                    : "text-msg"
                                }
                              //old code 
                                // className={
                                //   message.content.match(/<img .+\/>|\w+/g)
                                //     ?.length > 1
                                //     ? "text-msg"
                                //     : "text-msg2"
                                // }
                                dangerouslySetInnerHTML={{
                                  __html: message.content,
                                }}
                              >
                                {/* <div id="root" dangerouslySetInnerHTML={{__html: input2.join() }}></div> */}
                              </div>
                              {message?.media && (
                                <img
                                  style={{ display: "block", maxWidth: "100%" }}
                                  alt="test image"
                                  src={getUrl(message.media, message.user.username)}
                                />
                              )}
                            </div>
                          )}
                          {message.type === "wave" && <img src={Wave} alt="" />}
                        </>
                      )}
                    </div>
                  </HoverOver>
                </div>
              ))}
            </Scroll>
          </div>

          <div className=" chat-input-container">
            {(!!error || !!image) && (
              <IconButton
                style={{ position: "absolute", right: 0 }}
                onClick={() => {
                  setError("");
                  setImage(null);
                }}
              >
                <CloseOutlined color="primary" />
              </IconButton>
            )}
            {!!error && (
              <small
                onClick={() => setError("")}
                style={{ color: "red", cursor: "pointer" }}
              >
                {error}, close
              </small>
            )}
            {!!image && (
              <img
                style={{
                  height: 100,
                  display: "block",
                  margin: "5px auto",
                  boxShadow: "0 0 2px #000",
                }}
                alt=""
                src={URL.createObjectURL(image)}
              />
            )}

            <div
              className="chat-inputs"
              onMouseLeave={() => setShowReacts(false)}
            >
              <input
                autoFocus
                autoComplete="on"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={onSendMsg}
              ></input>
              <input
                style={{ visibility: "hidden", height: 0, width: 0 }}
                id={`input${room.id}`}
                type="file"
                accept="image/*"
                onChange={selectImage}
              />
              <div
                className={showReacts ? " bottom-buttons" : " bottom-buttons2"}
              >
                {showReacts && (
                  <div className="rbems">
                    {Reaction.map(({ icon, name }, i) => (
                      // <button key={i} onClick={() => sendReaction(name)}>
                      <button
                        key={i}
                        onClick={() => setInput(input + `<img src="${icon}"/>`)}
                      >
                        <img src={icon} alt="img" />
                      </button>
                    ))}
                  </div>
                )}
                <div className="add">
                  <IconButton
                    onClick={() =>
                      document.getElementById(`input${room.id}`).click()
                    }
                  >
                    <PhotoLibrary />
                  </IconButton>
                  <IconButton onClick={() => setShowReacts(!showReacts)}>
                    <EmojiEmotions />
                  </IconButton>
                  <IconButton disabled>
                    <Attachment />
                  </IconButton>
                </div>
                <IconButton className="enter-thumb" onClick={sendWave}>
                  <img src={Wave} alt="" />
                </IconButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default connect((store) => ({ auth: store.auth }))(Chat);
