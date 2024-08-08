import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaRegUserCircle, FaImage } from "react-icons/fa";
import { TiAttachment } from "react-icons/ti";
import ChatBox from "../../../common/ChatBox";
import timeAgo from "../../../../../../../shared/functions/timeAgo";
import socket from "../../../../../../../sockets";
import { useSelector } from "react-redux";

const Index = ({
  userChat,
  openChat,
  setOpenChat,
  messages,
  setMessages,
  selectedConversation,
}) => {
  const user = useSelector((state) => state?.auth?.user);
  const messageBoxRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;

    if (message) {
      const data = {
        senderID: user.id,
        receiverID: userChat.id,
        createdBy: user.id,
        message: message,
      };
      setMessages((prevMessage) => [
        ...prevMessage,
        { ...data, createdAt: new Date() },
      ]);
      socket.emit("send-message", data);
    }
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
    e.target.reset();
  };

  useEffect(() => {
    socket.on("get-message", (data) => {
      setMessages((prevMessage) => [...prevMessage, data]);
    });
    return () => {
      socket.off("get-message");
    };
  }, []);

  useEffect(() => {
    const data = {
      senderID: user.id,
      receiverID: userChat.id,
    };
    socket.emit("get-all-message", data);
  }, []);

  useEffect(() => {
    socket.on("get-all-message", (messageData) => {
      setMessages(messageData);
    });
    return () => {
      socket.off("get-all-message");
    };
  }, []);
  // closing chat
  const handleCloseChat = (id) => {
    const filterChats = openChat.filter((chat) => chat.id !== id);
    setOpenChat(filterChats);
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-box-area">
      <div className="chat-header-single">
        <div className="user-info">
          <h4 className="opposite-user-name">{userChat.fullname}</h4>
          {userChat.isActive && <p className="user-active-text">Active now</p>}
          {userChat.lastActive && (
            <p className="user-not-active-text">
              {timeAgo(userChat.lastActive)}
            </p>
          )}
        </div>
        <button
          className="back-btn"
          onClick={() => handleCloseChat(userChat.id)}
        >
          <FaTimes />
        </button>
      </div>
      <div ref={messageBoxRef} className="chat-box">
        {messages?.map((message) => (
          <ChatBox
            key={message.id}
            message={message}
            oppositeUser={userChat.id}
          />
        ))}
      </div>
      <div className="send-message">
        <div className="attached-file">
          <label htmlFor="files">
            <TiAttachment className="icon" />
          </label>
          <input type="file" multiple className="file-input" name="files" />
        </div>
        <form
          onSubmit={(e) => handleSendMessage(e)}
          action="#"
          className="message-form"
        >
          <input
            className="message-input"
            type="text"
            placeholder="Type your text here.."
            name="message"
            autoComplete="off"
          />
          <button className="message-btn">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
