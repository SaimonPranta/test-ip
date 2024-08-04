import React, { useEffect, useState } from "react";
import './style.scss'
import { FaAngleDoubleRight } from "react-icons/fa";

const Index = () => {


  const [navigationStatus, setNavigationStatus] = useState("Unhide");

  const handleSideNavToggle = () => {
    const webBody = document.querySelector("body");
    const classList = [...webBody.classList]
    if (classList.includes('modal-open')) {
      return
    }
    webBody.classList.toggle("disable-right-side-nav");
    setNavigationStatus((pre) => {
      return pre === "Hide" ? "Unhide" : "Hide";
    });
  };

  window.handleLeftSideNavToggle = handleSideNavToggle

  return (
    <button
      className="right-side-nav-toggle"
      onClick={handleSideNavToggle}
      title={navigationStatus}>
      <div>
        <FaAngleDoubleRight />
      </div>
    </button>
  );
};

export default Index;
