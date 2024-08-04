import React from "react";
import "./discard-modal.style.scss";
import { useHistory } from "react-router-dom";

const DiscardModal = ({ showDiscardModal, setShowDiscardModal, title }) => {
  const history = useHistory();
  return (
    <div className={`${showDiscardModal ? "show" : ""} discard-modal`}>
      <div className={`modal-area`}>
        <p>{title}</p>

        <div className="action-btn">
          <button onClick={() => setShowDiscardModal(false)}>No</button>
          <button className="yes" onClick={() => history.goBack()}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscardModal;
