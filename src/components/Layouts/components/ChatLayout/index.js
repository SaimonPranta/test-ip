import React, { useEffect, useState } from "react";
import "./style.scss";
import LocalChat from "./LocalChat";
import GlobalChat from "./GlobalChat";
import socket from "../../../../sockets";

const Index = () => {
  const [activeUserList, setActiveUserList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});
  useEffect(() => {
    socket.emit("get-active-user", "");
  }, []);

  useEffect(() => {
    socket.on("get-active-user", (activeUser) => {
      setActiveUserList(activeUser);
    });
  }, []);

  useEffect(() => {
 
    return () => {
      socket.off("get-message");
    };
  }, []);

  return (
    <>
      <section className="chat-wrapper">
        <LocalChat
          activeUserList={activeUserList}
          messages={messages}
          setMessages={setMessages}
          selectedConversation={selectedConversation}
        />
        <GlobalChat />
      </section>
    </>
  );
};

export default Index;
