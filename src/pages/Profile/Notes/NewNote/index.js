import React, { useState, useEffect } from "react";
import TextEditorQuill from "./TextEditorQuill";
import CustomeButton from "../../../../Utils/CustomeButton";

import "../style.scss";
import { NoteContext } from "../../../../App";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import axios from "axios";
import { userHeader } from "../../../../shared/functions/Token";
import { checkWebaddresssRegex } from "../../../../shared/constants/RegEx";

function NewNote() {
  const [content, setContent] = useState("No Content");
  const [title, setTitle] = useState("Untitled");
  const [webLinkAddress, setWebLinkAddress] = useState('');
  const [webLinkAddressColor, setWebLinkAddressColor] = useState(true);
  const [buttonActive, setButtonActive] = useState(false);

  const EditedContentHandler = (value) => {
    // console.log(value);
    setContent(value);
  };
  // console.log(content);

  function handleChange(_) {
    setTitle(_.target.value);
  }
  function handleWebLinkAddressChange(e) {
    if (checkWebaddresssRegex.test(e.target.value)) {
      setWebLinkAddress(e.target.value)
      setWebLinkAddressColor(true);
      setButtonActive(true)
    } else {
      setButtonActive(false)
      setWebLinkAddress(e.target.value)
      setWebLinkAddressColor(false)
    }

  }

  function closeTab() {
    window.close();
    localStorage.setItem("dummtData", content);
  }
  const submitHandler = () => {

    setButtonActive(false)
    // console.log("closer ", content);
    localStorage.setItem("dummtData", content);
    axios.post(
      `${BACKEND_URL}/profile/notes/addNote`,
      { content, title, webLinkAddress, date: new Date().toISOString() },
      { headers: userHeader() }
    ).then((res) => {
      window.close();
    }).catch((err) => {
      const errorMessage = JSON.parse(err.request.response);
      if (errorMessage.message.includes("Duplicate")) {
        setWebLinkAddressColor(false)
      }
    });
  };

  const isExistChecking = () => {

    if (webLinkAddress) {
      axios.post(`${BACKEND_URL}/notes/is-address-exist`,
        { webLinkAddress },
        { headers: userHeader() }
      ).then((res) => {
        if (checkWebaddresssRegex.test(webLinkAddress)) {
          setWebLinkAddressColor(true)
          setButtonActive(true)
        }
        return
      }).catch((err) => {
        setWebLinkAddressColor(false)
        setButtonActive(false)
        const errorMessage = JSON.parse(err.request.response);
      })
    }

  }

  return (
    <div>


      <div className="create-note-header-section">


        <input
          className="title-input-field"
          placeholder="Title"
          autoFocus
          autoComplete="off"
          onChange={handleChange}
          variant="filled"
          margin="normal"
          label="Note's Title"
        />

        <div className="webAddress-provider-section">

          <input
            className={webLinkAddressColor ? "webAddress-active-link-color" : "webAddress-deactive-link-color"}
            placeholder="Custom "
            autoComplete="off"
            onChange={handleWebLinkAddressChange}
            onBlur={isExistChecking}
            variant="filled"
            margin="normal"
            label="Note's Title"
            value={webLinkAddress}
          />

          <div
            className="editorSubmit"
            onClick={submitHandler}
          >

            <button
              className={(title.length > 0 && webLinkAddress.length > 0 && buttonActive) ? "create-note-save-btn-active" : "create-note-save-btn-deactive"}
              disabled={(title.length > 0 && webLinkAddress.length > 0 && buttonActive) ? false : true} >Save</button>

          </div>

        </div>


      </div>


      <div className="quillMainDiv" style={{}}>
        <div className="editor" style={{ width: "100%" }}>
          <TextEditorQuill
            setContent={setContent}
            // EditedContentHandler={EditedContentHandler}
          />
        </div>

      </div>
    </div>
  );
}

export default NewNote;
