import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatSection from "./ChatSection";
import socket from "../../../../../sockets";
// import socket from "../../../../../sockets";

const Index = ({ activeUserList, messages, setMessages , selectedConversation}) => {
  const [sectionShow, setSectionShow] = useState(false);
  const [openChat, setOpenChat] = useState([]);

  const [userInfo, setUserInfo] = useState({});
  return (
    <div className="local-chat">
      {sectionShow && (
        <ChatSection
          setSectionShow={setSectionShow}
          openChat={openChat}
          setOpenChat={setOpenChat}
          messages={messages}
          setMessages={setMessages}
          setUserInfo={setUserInfo}
          selectedConversation={selectedConversation}
        />
      )}
      <ChatList
        setSectionShow={setSectionShow}
        setOpenChat={setOpenChat}
        openChat={openChat}
        activeUserList={activeUserList}
        
      />
    </div>
  );
};

export default Index;
