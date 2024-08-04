import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import timeAgo from "../../../../../../shared/functions/timeAgo";
import { useHistory } from "react-router-dom";
import Tooltips from "../../../../../Tooltips";
import socket from "../../../../../../sockets";
import { useSelector } from "react-redux";
const Index = ({ setSectionShow, setOpenChat, openChat, activeUserList }) => {
  const [showToolTip, setToolTips] = useState({});

  const history = useHistory();
  const loggedUser = useSelector((state) => state?.auth?.user);

  const handleChatUserOpen = (user) => {
    setSectionShow(true);

    if (openChat.length >= 0) {
      setOpenChat([...openChat, user]);
    }
    const exists = openChat.some((chat) => chat.id === user.id);

    if (exists) {
      const updateConversation = openChat.filter((chat) => chat.id !== user.id);
      setOpenChat(updateConversation);
      setOpenChat([...updateConversation, user]);
    }
    socket.emit("send-request-for-all-message", {
      senderID: loggedUser.id,
      receiverID: user?.id,
    });
  };

  useEffect(() => {
    socket.on("get-all-message", (data) => {
      console.log("data", data);
      // setMessages(data);
    });
  }, [openChat]);

  const handleTooltipToggle = (userId) => {
    setToolTips((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <div className="local-chat-users">
      <div className="chat-header local">
        <h4 className="active-user">
          Friends ({activeUserList.map((obj) => obj.isActive === true).length})
        </h4>
      </div>
      <ul className="user-list">
        {activeUserList.map((user, index) => (
          <li key={index} className="list-item">
            <div
              className="avatar-wrapper"
              onMouseEnter={() => handleTooltipToggle(user.id)}
              onMouseLeave={() => handleTooltipToggle(user.id)}
            >
              <div
                className="user-avatar"
                onClick={() => history.push(`/${user?.username}/timeline`)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <FaRegUserCircle className="avatar" />
                )}
                {showToolTip[user.id] && <Tooltips data={user?.username} />}
              </div>
            </div>
            <div className="user-info" onClick={() => handleChatUserOpen(user)}>
              <h4 className="name">
                {user?.fullname?.slice(0, 10) ?? "no name"}
              </h4>

              {user.lastActive && (
                <p className="chat-time">{timeAgo(user?.lastActive)}</p>
              )}
              {user.isActive && <div className="active-icon"></div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
