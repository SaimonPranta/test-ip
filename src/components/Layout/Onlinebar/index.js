import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { toggleChat, closeChat, openChat } from "../../../store/chat/action";
import { sendMessage, getLiveRooms } from "../../../sockets/emit";
import { getUserAvatar } from "../../../shared/functions";
import Wave from "../../../assets/messages/Wave.png";
import { HoverOver } from "../../Tools";
import { MoreChat } from "./style";
import Calling from "./Calling";
import { When } from "../..";
import Chat from "./Chat";
import "./style.scss";
const OnlineBar = ({
  chat = [],
  dispatch,
  site: { isMessanger },
  history,
  auth: {
    user: { approved, banned, rejected },
  },
}) => {
  const [call, setCall] = useState(false);
  const [Newchat, setNewchat] = useState([]);
  function sendWave(id) {
    sendMessage(id, "wave");
  }
  function onOpenChat(id, username) {
    if (isMessanger) {
      history.push(`/messanger/${username}`);
    } else {
      dispatch(openChat(id));
    }
  }

  useEffect(() => {
    getLiveRooms();
    setNewchat(chat);
  }, [Newchat]);
  if (!approved || banned || rejected) {
    return <div />;
  }
  return (
    <>
      <div
        style={{ textAlign: "center", width: "17%" }}
        className="user-card-wrapper">
        <p className="chat-header-title" style={{ align: "center" }}>
          Online ({chat.filter((c) => c.status === "active").length})
        </p>
        {chat
          .filter((item) => item.bar)
          .map(({ id, user, status }) => (
            <div
              className="user-card"
              onClick={() => onOpenChat(id, user.username)}
              key={id}>
              <img
                className="img"
                src={getUserAvatar(user.avatar, user.gender, user.username)}
                alt=""
              />
              <div className="name">{user.name?.join(" ")}</div>
              <span style={{ flex: "1 1 auto" }}></span>
              <img
                className="wave"
                src={Wave}
                alt=""
                onClick={() => sendWave(id)}
              />
              <div className="status">
                {status === "active" ? (
                  <span className="active"></span>
                ) : (
                  <When date={status} />
                )}
              </div>
            </div>
          ))}
      </div>

      {!isMessanger &&
        chat
          .filter((i) => i.active)
          .slice(0, 3)
          .map((room, index) => (
            <Chat
              key={room.id}
              index={index}
              room={room}
              minimized={room.minimized}
              onToggle={() => dispatch(toggleChat(room.id))}
              onClose={() => dispatch(closeChat(room.id))}
              sendWave={() => sendWave(room.id)}
            />
          ))}
      {chat.filter((i) => i.active).length > 3 && (
        <HoverOver title="More Chats">
          <MoreChat>
            {chat.filter((i) => i.active).length - 3} More Chat
          </MoreChat>
        </HoverOver>
      )}
      <Calling
        open={call}
        close={() => setCall(false)}
        type="video"
        action={() => setCall(false)}
        user={chat[0] ? chat[0].user : {}}
      />
    </>
  );
};

export default connect((store) => ({
  chat: store.chat,
  site: store.site,
  auth: store.auth,
}))(withRouter(OnlineBar));
