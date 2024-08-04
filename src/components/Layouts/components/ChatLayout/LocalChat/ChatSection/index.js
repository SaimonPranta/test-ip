import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import ChatBoxArea from "./chat-box-area";

const Index = ({
  setSectionShow,
  openChat,
  setOpenChat,
  messages,
  setMessages,
  setUserInfo,
  selectedConversation,
}) => {
  return (
    <div className="local-chat-section">
      {openChat.map((userChat) => (
        <ChatBoxArea
          key={userChat.id}
          userChat={userChat}
          setSectionShow={setSectionShow}
          openChat={openChat}
          setOpenChat={setOpenChat}
          messages={messages}
          setMessages={setMessages}
          setUserInfo={setUserInfo}
          selectedConversation={selectedConversation}
        />
      ))}
    </div>
  );
};

export default Index;
