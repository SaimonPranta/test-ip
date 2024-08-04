import React from "react";
import "./style.scss";
import { Modal } from "react-bootstrap";

function EditModal({
  hyperLink,
  selectedWordTag,
  sethyperLink,
  setselectedWordTag,
  setInputEditId,
  openEdit,
  handleClose,
  title,
  setTitle,
  name,
  setName,
  pictitle,
  saveHandler,
  setPicTitle,
  inputEditId,
  show,
  onHide,
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

  const clearTitleHandler = () => {
    if (name === "Untitled") {
      setName('');
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

        <div className="note-modal-main-section">

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
            <label className="title-label">Name</label>
            <input
              // maxLength="66"
              type="text"
              className="title-input-field"
              value={name}
              onMouseUp={doSomethingWithSelectedText}
              onMouseDown={doSomethingWithSelectedText}
              onMouseMoveCapture={doSomethingWithSelectedText}
              onClick={clearTitleHandler}
              onChange={(e) => {
                setName(e.target.value)
              } }
            />
          </div>

          {
            selectedWordTag ?
              <div>
                <label className="url-label">URL</label>
                <input
                  type="text"
                  className="hyperlink-input-field"
                  value={hyperLink}
                  placeholder="Add your link here.."
                  onChange={(e) => {
                    sethyperLink(e.target.value);
                  }}
                />
              </div>
              :
              ""
          }

          <div className="modal-button-section">
            <button onClick={onHide} className="custom-button">Close</button>
            <button onClick={saveHandler} className="custom-button" >save</button>
          </div>

        </div>

      </Modal.Body>

    </Modal>
  );
}

export default EditModal;
