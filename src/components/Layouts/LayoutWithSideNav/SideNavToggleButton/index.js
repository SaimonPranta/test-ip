import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FaAngleDoubleRight } from "react-icons/fa";


const Index = () => {

  const [navigationStatus, setNavigationStatus] = useState("Unhide");

  const handleSideNavToggle = () => {
    const webBody = document.querySelector("body");
    const classList = [...webBody.classList]
    if (classList.includes('modal-open')) {
      return
    }
    webBody.classList.toggle("disable-left-side-nav");
    setNavigationStatus((pre) => {
      return pre === "Hide" ? "Unhide" : "Hide";
    });
  };



  const autoSideNavToggle = (type) => { //type value is open/close

    const webBody = document.querySelector("body");
    const classList = [...webBody.classList]

    if (type === 'close') {
      if (!classList?.includes('disable-left-side-nav')) {
        webBody.classList.toggle("disable-left-side-nav");
      }
      if (!classList?.includes('disable-right-side-nav')) {
        webBody.classList.toggle("disable-right-side-nav");
      }
    }
    if (type === 'open') {
      if (classList?.includes('disable-left-side-nav')) {
        webBody.classList.toggle("disable-left-side-nav");
      }
      if (classList?.includes('disable-right-side-nav')) {
        webBody.classList.toggle("disable-right-side-nav");
      }
    }
      webBody.classList.toggle('modal-open')
  }

  window.handleLeftSideNavToggle = handleSideNavToggle
  window.autoSideNavToggle = autoSideNavToggle

  return (
    <button
      className="side-nav-toggle"
      onClick={handleSideNavToggle}
      title={navigationStatus}>
      <div>
        <FaAngleDoubleRight />
      </div>
    </button>
  );
};

export default Index;
