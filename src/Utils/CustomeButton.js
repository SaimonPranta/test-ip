import React from "react";
import "./style.scss";

function CustomeButton({
  activeState,
  setActiveState = null,
  icon = "",
  title = "",
}) {
  return (
    // note: button e alada kono onClick thakle span er modhe diye onClick add kora lagbe; cancel button e eita use kora jabe onClick function er ref diye
    <button
      onClick={() =>
        setActiveState !== null ? setActiveState(!activeState) : ""
      }
      className="customebutton"
      style={{
        display: activeState ? "none" : "inline-block",
      }}
    >
      {icon}
      {title}
    </button>
  );
}

export default CustomeButton;
