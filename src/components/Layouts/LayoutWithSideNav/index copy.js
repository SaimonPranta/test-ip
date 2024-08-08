import React, {useEffect, useState} from "react";
import "./styles.scss";
import SideNavigation from "../../SideNavigation/index";
import SideNavToggleButton from "./SideNavToggleButton/index";
import { getIntigators, setPeerId } from "../../../sockets/emit";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { peer } from "../../../shared"; 
// import AddBeneficiaryForm from "./modals/AddBeneficiaryForm/index";
import RightSideNavToggleButton from "./RightSideNavToggleButton/index" 
import AddBeneficiaryForm from "./modals/AddBeneficiaryForm/index";
import LocalChat from "../components/ChatLayout/LocalChat";
import GlobalChat from "../components/ChatLayout/GlobalChat";
import socket from "../../../sockets"; 

const Index = ({ children }) => {
  const {
    site: { alerm },
    auth: {
      user: { username, name },
    },
  } = useSelector((state) => state);

  let receivedAudio = useRef();
  let sentAudio = useRef();
  const [activeUserList, setActiveUserList] = useState([]);

  useEffect(() => {
    getIntigators();
    peer.on("open", (id) => {
      setPeerId(id);
    });
  }, []);
  useEffect(() => {
    if (!!alerm.sent) {
      sentAudio.play();
    }
  }, [alerm.sent]);
  useEffect(() => {
    if (!!alerm.received) {
      receivedAudio.play();
    }
  }, [alerm.received]);

    // useEffect(() => {
    //     socket.emit("local-active-user");
    // }, [])

  useEffect(() => {
    socket.emit('get-active-user', '');
  }, []);
  useEffect(() => {
    socket.on('get-active-user', (activeUser) => {
      setActiveUserList(activeUser)
    });
  }, []);
    return (
    <main className="page-container">
      <section className="side-navigation">
        <SideNavigation /> 
      </section>
      <section className="main-page">{children}</section>
      <section className="chat-section"> 
          <LocalChat activeUserList={activeUserList} />
          <GlobalChat/> 
      </section>

      <section id='main-page' className="main-page">
       <div className="main-content">
        {children}
       </div>
      </section>

      <section className="chat-section">
        {/* this section will be use form chat */}
        <RightSideNavToggleButton />
      </section>

      {/* <AddBeneficiaryForm /> */}
    </main>
  );
};

export default Index;
