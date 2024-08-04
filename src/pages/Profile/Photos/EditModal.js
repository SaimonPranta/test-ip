import React, { useState } from "react";
import "./style.scss";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { FaSave } from "react-icons/fa";
import {  Modal } from "react-bootstrap";




function EditModal({
  hyperLink,
  selectedWordTag,
  sethyperLink,
  setselectedWordTag,
  openEdit,
  handleClose,
  pictitle,
  show,
  onHide,
  saveHandler,
  photo,
  setPicTitle,
  inputEditId,
  setInputEditId,
  linkId,
  setLinkId
}) {

  function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
    } else if (
      typeof document.selection != "undefined" &&
      document.selection.type == "Text"
    ) {
      text = document.selection.createRange().text;
    }
    return text;
  }


  function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    if (selectedText) {
      setselectedWordTag(selectedText);
    }
  }


  return (


    <Modal
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Body>

        <div className="modal-main-section">

          <div>
            <label className="id-label">ID</label>
            <input
              // maxLength="66"
              type="text"
              className="id-input-field"
              value={linkId}
              onChange={(e) => {
                setLinkId(e.target.value)
              }}
            />

          </div>


          <div>

            <label className="title-label">Title</label>

            <input
              // maxLength="66"
              type="text"
              className="title-input-field"
              // Value={inputEditId}
              value={pictitle}
              onMouseUp={doSomethingWithSelectedText}
              onMouseDown={doSomethingWithSelectedText}
              onMouseMoveCapture={doSomethingWithSelectedText}
              onClick={(e) => {
                if (pictitle === "Untitled") {
                  setPicTitle('');
                }
              }}
              onChange={(e) => {
                setPicTitle(e.target.value);
              }}
            />

          </div>



          {
            selectedWordTag ?
              <div>
                <label className="url-label">URL</label>

                <input
                  // maxLength="66"
                  type="text"
                  className="hyperlink-input-field"
                  value={hyperLink}
                  placeholder='Add your link'
                  onChange={(e) => {
                    sethyperLink(e.target.value);
                  }}
                />
              </div>
              :
              ''
          }

          <div className="modal-button-section">
            <button onClick={onHide} className="custom-button">Close</button>
            <button onClick={saveHandler} className="custom-button" >save</button>
          </div>

        </div>

      </Modal.Body>

    </Modal>




    // old modal 

    // <Modal
    //   aria-labelledby="transition-modal-title"
    //   aria-describedby="transition-modal-description"
    //   className={classes.modal}
    //   open={openEdit}
    //   onClose={handleClose}
    //   closeAfterTransition
    //   BackdropComponent={Backdrop}
    //   BackdropProps={{
    //     timeout: 500,
    //   }}
    // >
    //   <Fade in={openEdit}>
    //     <div className={classes.paper}>
    //       <div className="modalMaindiv">
    //         <input
    //           // maxLength="66"
    //           type="text"
    //           style={{
    //             width: "90%",
    //             paddingLeft: "10px",
    //             border: "1px solid #e4e4e4",
    //             height: "45px",
    //             borderRadius: "4px",
    //           }}

    //           Value={inputEditId}
    //           onMouseUp={doSomethingWithSelectedText}
    //           onMouseDown={doSomethingWithSelectedText}
    //           onMouseMoveCapture={doSomethingWithSelectedText}
    //           onClick={ (e) =>{
    //             if(inputEditId === "Untitled"){
    //               setInputEditId('');
    //             }
    //           }}
    //           onChange={(e) => {
    //             setPicTitle(e.target.value);
    //           }}
    //         />
    //         {
    //           selectedWordTag ?
    //             <input
    //               // maxLength="66"
    //               type="text"
    //               style={{
    //                 marginTop: "15px",
    //                 paddingLeft: "10px",
    //                 width: "90%",
    //                 border: "1px solid #e4e4e4",
    //                 height: "45px",
    //                 borderRadius: "4px",
    //               }}
    //               Value={hyperLink}
    //               placeholder='Add your link'
    //               onChange={(e) => {
    //                 sethyperLink(e.target.value);
    //               }}
    //             />
    //             :
    //             ''
    //         }

    //         <FaSave
    //           style={{
    //             cursor: "pointer",
    //             fontSize: "25px",
    //             marginLeft: "4px",
    //           }}
    //           onClick={saveHandler}
    //         />
    //       </div>
    //     </div>
    //   </Fade>
    // </Modal>



  );
}

export default EditModal;
