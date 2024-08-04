import React, { useState } from "react";
import "./modal.style.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ openModal, setOpenModal, children }) => {
  return (
    <div className={`${openModal ? "open" : ""} story-modal`}>
      <div>
        <button onClick={() => setOpenModal(false)} className="close-modal">
          <IoIosCloseCircleOutline />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
