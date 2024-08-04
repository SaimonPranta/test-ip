import React, { useEffect, useState } from "react";
import "./styles.scss";
import SideNavigation from "../../SideNavigation/index";
import SideNavToggleButton from "./SideNavToggleButton/index";
import { getIntigators, setPeerId } from "../../../sockets/emit";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { peer } from "../../../shared";
import RightSideNavToggleButton from "./RightSideNavToggleButton/index";
import ChatContainer from "../components/ChatLayout/index";
import { NavLink } from "react-router-dom";
// import AddBeneficiaryForm from "./modals/AddBeneficiaryForm/index";

const Index = ({ children }) => {
  const {
    site: { alerm },
  } = useSelector((state) => state);

  let receivedAudio = useRef();
  let sentAudio = useRef();

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
  return (
    <main className="page-container">
      <section className="side-navigation">
        <SideNavigation />
        <SideNavToggleButton />
      </section>
 
      <section id='main-page' className="main-page">
        <div className="main-content">
          {children}
        </div>
      </section>

      <section className="chat-section">
        {/* this section will be use form chat */}
        <div className="top-content">
           <ChatContainer />
          <RightSideNavToggleButton />
        </div>

        <div className="improve-feature-section navigator-section big-gap text-style">
          <div>
            <p>
              <NavLink to="/improvefutures">
                <span>Improve Futures</span>
              </NavLink>
            </p>
            <p>
              <NavLink to="/support">
                <span>Live Chat</span>
              </NavLink>
            </p>
          </div>
        </div> 
      </section>
    </main>
  );
};

export default Index;



