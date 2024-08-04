import React, { useState, useEffect } from "react";
import TextEditorQuill from "./TextEditorQuill";
import CustomeButton from "../../../../Utils/CustomeButton";

import "../style.scss";
import { NoteContext } from "../../../../App";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import axios from "axios";
import { userHeader } from "../../../../shared/functions/Token";
import { TextField } from "@material-ui/core";
import { useParams } from "react-router";
import { getNotes } from "../../Hooks";
import { RiContactsBookUploadFill } from "react-icons/ri";
import "./style.scss";
import { checkWebaddresssRegex } from "../../../../shared/constants/RegEx";

let counter = 0;

function EditNote() {


  const [webLinkAddress, setWebLinkAddress] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [update, setUpdate] = useState({ title: null, note: null });
  const [singlenote, setSinglenote] = useState({});
  const [content, setContent] = useState();
  const [webLinkAddressColor, setWebLinkAddressColor] = useState(true);

  let { NoteUserName, EditedNoteId } = useParams();



  const { notes, setNotes, counts, working, setCounts } =
    getNotes(NoteUserName);




  const EditedContentHandler = (value) => {
    setContent(value);
  };


  useEffect(() => {

    axios
      .get(`${BACKEND_URL}/profile/notes/${NoteUserName}/${EditedNoteId}`, {
        headers: userHeader(),
      })
      .then(({ data }) => {
        setSinglenote(data);

        setTitle(data?.title)
        setWebLinkAddress(data?.webLinkAddress)
      })
      .catch((err) => {
      });

  }, [EditedNoteId, NoteUserName,]);







  const commingData = notes.filter((note) => note.id === EditedNoteId);



  // console.log("single data all  1 : >> ", commingData);

  // const [content, setContent] = useState(commingData);

  // console.log("content data  :>> ", commingData);
  // console.log("content data :>> ", commingData.note);

  // useEffect(() => {
  //   if (!!EditedNoteId && !!NoteUserName) {
  //     axios
  //       .get(`${BACKEND_URL}/profile/notes/${NoteUserName}/${EditedNoteId}`, {
  //         headers: userHeader(),
  //       })
  //       .then(({ data }) => {
  //         console.log("single note data into promise", data)
  //         setNote(data);
  //         // setWorking(false);
  //       })
  //       .catch((err) => {
  //         // setWorking(false);
  //         console.log("err", )
  //       });
  //   }
  // }, [EditedNoteId, NoteUserName]);


  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/profile/notes/${NoteUserName}/${EditedNoteId}`, {
  //       headers: userHeader(),
  //     })
  //     .then(({ data }) => {
  //       setNote(data);
  //       setWorking(false);
  //     })
  //     .catch((err) => {
  //       setWorking(false);
  //       setError("Something went wrong.");
  //     });

  // }, [EditedNoteId] )



  function handleWebLinkAddressChange(e) {
    if (checkWebaddresssRegex.test(e.target.value)) {
      setWebLinkAddress(e.target.value)
      setWebLinkAddressColor(true);
    } else {
      setWebLinkAddress(e.target.value)
      setWebLinkAddressColor(false)
    }

  }


  const isExistChecking = () => {

    if (webLinkAddress != singlenote?.webLinkAddress) {
      axios.post(`${BACKEND_URL}/notes/is-address-exist`,
        { webLinkAddress },
        { headers: userHeader() }
      ).then((res) => {

        if (checkWebaddresssRegex.test(webLinkAddress)) {
          setWebLinkAddressColor(true)
        }
        return
      }).catch((err) => {
        setWebLinkAddressColor(false)
        const errorMessage = JSON.parse(err.request.response);
      })
    }

  }




  function handleChange(_) {
    setTitle(_.target.value);
    // setError(false);
  }
  //  ****************
  function editNote() {
    // setEditing(true);




    const update = { privacy: null, title: title, webLinkAddress: webLinkAddress, note: content };

    const noteId = EditedNoteId;
    axios
      .put(`${BACKEND_URL}/profile/notes/${noteId}`, update, {
        headers: userHeader(),
      })
      .then(() => {
        const newNotes = notes.map((item) => {
          if (item.id === noteId) {
            item = {
              ...item,
              privacy: update.privacy || item.privacy,
              title: update.title || item.title,
              webLinkAddress: update.webLinkAddress || item.webLinkAddress,
              note: content || item.note,
            };
          }
          return item;
        });
        setNotes([...newNotes]);
        window.close();
      })
      .catch((err) => {
        throw err;
      });

    // setTimeout(function () {
    //   window.close();
    // }, 500);


  }
  //  ****************

  const submitHandler = () => {
    // axios.put(
    //   `${BACKEND_URL}/profile/notes/addNote`,
    //   { content, date: new Date().toISOString() },
    //   { headers: userHeader() }
    // );
    // axios
    //   .get(`${BACKEND_URL}/profile/notes/${NoteUserName}/${EditedNoteId}`, {
    //     headers: userHeader(),
    //   })
    //   .then(({ data }) => {
    //     // setNote(data);
    //     setName(data.title);
    //     // setNotes(data.note);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });

    const update = { title: null, note: null };
    axios
      .put(`${BACKEND_URL}/profile/notes/${EditedNoteId}`, update, {
        headers: userHeader(),
      })
      .then(() => {
        const newNotes = notes.map((item) => {
          if (item.id === EditedNoteId) {
            item = {
              ...item,
              privacy: update.privacy || item.privacy,
              title: title || item.title,
              note: update.note || item.note,
            };
          }
          return item;
        });
        // setNotes([...newNotes]);
        // setEditing(false);
        // setAnchorEl(null);
        // setEditModal(false);
      })
      .catch((err) => {
        throw err;
      });
    setTimeout(function () {
      window.close();
    }, 500);
  };
  //  useEffect(() => {
  //  if (!!id && !!username) {
  // axios
  //   .get(`${BACKEND_URL}/profile/notes/${username}/${id}`, {
  //     headers: userHeader(),
  //   })
  //   .then(({ data }) => {
  //     setNote(data);
  //     setName(data.title);
  //     setNotes(data.note);
  //     setWorking(false);
  //   })
  //   .catch((err) => {
  //     setWorking(false);
  //     setError("Something went wrong.");
  //     throw err;
  //   });
  //  }
  //  }, [id, username]);


  return (
    <div>
      <div>

        <div className="create-note-header-section">

          <input
            className="title-input-field"
            autoFocus
            autoComplete="off"
            onChange={handleChange}
            variant="filled"
            margin="normal"
            label="Note's Title"
            Value={title}
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

            <div className="editorSubmit" onClick={editNote}>

              <button
                className={(title.length > 0 && webLinkAddress.length > 0 && webLinkAddressColor) ? "create-note-save-btn-active" : "create-note-save-btn-deactive"}
                disabled={(title.length > 0 && webLinkAddress.length > 0 && webLinkAddressColor) ? false : true} >Save</button>
              {/* <CustomeButton title="Save" /> */}

            </div>

          </div>




        </div>



      </div>
      <div className="quillMainDiv">
        <div className="editor" style={{ width: "100%" }}>
          <TextEditorQuill
            content={singlenote?.note}
            EditedNoteId={EditedNoteId}
            NoteUserName={NoteUserName}
            oldContent={note}
            setContent={setContent}
            EditedContentHandler={EditedContentHandler}
          />
        </div>


        {/* <div className="editorSubmit" style={{ padding: "0px" }}>
          <span
            className="SubmitNote"
            // onClick={submitHandler}
            onClick={editNote}
            variant="contained"
            color="primary"
          >
            <CustomeButton title="Save" />
          </span>
        </div> */}


      </div>
    </div>
  );
}

export default EditNote;
