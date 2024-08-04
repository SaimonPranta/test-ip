import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getNotes } from "../../Hooks";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

import "./style.scss";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import axios from "axios";
import { userHeader } from "../../../../shared/functions/Token";
import { Spinner } from "react-bootstrap";

import "./style.scss";



function ViewNote() {
  let { readI, userNameFromNote } = useParams();

  const [working, setWorking] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState({});

  const { notes, setNotes, counts, setCounts } = getNotes(userNameFromNote);

  
  const selectedNote = notes.filter((note) => note.id === readI);

  // data come from the server with component mount
  useEffect(() => {
    if (!!readI && !!userNameFromNote) {
      axios
        .get(`${BACKEND_URL}/profile/notes/${userNameFromNote}/${readI}`, {
          headers: userHeader(),
        })
        .then(({ data }) => {
          setNote(data);
          setWorking(false);
        })
        .catch((err) => {
          setWorking(false);
          setError("Something went wrong.");
        });
    }
  }, [readI, userNameFromNote]);
  return (
    <div>
      <div className="CopyDiv">
        <div className="CopyContent">
          {!working && !!error && (
            <div style={{ textAlign: "center" }}>{error}</div>
          )}

          {working && !error ? (
            <Spinner height={30} />
          ) : (
            <>
              <div
                className="NotePreviewDescriptionDiv"
                style={{
                  height: "auto",
                  wordWrap: "break-word",
                }}
              >
                <label
                  style={{
                    width: "100%",
                    fontSize: "37px",
                    fontFamily: "math",
                  }}
                >
                  <h4
                    style={{
                      padding: "10px",
                      backgroundColor: "#e4e4e4",
                      width: "100%",
                    }}
                  >
                    <span> </span>
                    {note.title}
                  </h4>
                </label>
              </div>

              <div style={{ height: "auto", wordWrap: "break-word" }}>
                {/* <label style={{ width: "100%", marginBottom: "10px" }}>
                <h4
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "#e4e4e4",
                    width: "100%",
                  }}
                ></h4>
              </label> */}
                {/* <p>{note.note}</p> */}
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: note.note }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
