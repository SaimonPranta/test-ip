import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getNotes } from "../../Hooks";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./style.scss";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import axios from "axios";
import { userHeader } from "../../../../shared/functions/Token";
import { Spinner } from "react-bootstrap";

import logo from "../../../../assets/logo.png"

function NotePreview({ }) {
  let { noteLink } = useParams();

  const [working, setWorking] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState({});

  // const { notes, setNotes, counts, setCounts } = getNotes(usernameNote);
  // // console.log(notes);
  // const selectedNote = notes.filter((note) => note.id === noteId);
  // // console.log(selectedNote);

  // data come from the server with component mount
  useEffect(() => {

    axios
      .get(`${BACKEND_URL}/notes-public/${noteLink}`, {
      })
      .then(({ data }) => {
        console.log("data  coming", data)
        setNote(data);
        setWorking(false);
      })
      .catch((err) => {
        setWorking(false);
        setError("Something went wrong.");
      });

  }, [noteLink]);

  return (
    <div>

      <Helmet>
        {/* <title>{note.name}</title> */}
        <meta property="og:title" content={note.name} />
      </Helmet>

      <div className="CopyDiv">

        {

          (!working && !!error) ?
            <>

              <div style={{ textAlign: "center" }}>{error}</div>

              <a href="https://micple.com" style={{ position: "fixed", left: 25, bottom: 15, paddingLeft: "5px", backgroundColor: "#f1efef", borderRadius: "50%" }}>
                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={logo} alt="micple" />
              </a>
            </>

            :
            <div className="CopyContent">

              {working && !error ? (
                <Spinner height={30} />
              ) : (
                <>
                  <div
                    className="NotePreviewDescriptionDiv"
                    style={{
                      height: "auto",
                      wordWrap: "break-word"
                    }}
                  >



                    <a href="https://micple.com" style={{ position: "fixed", left: 25, bottom: 15, paddingLeft: "5px", backgroundColor: "#f1efef", borderRadius: "50%" }}>
                      <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={logo} alt="micple" />
                    </a>


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
        }
      </div>

    </div>
  );
}

export default NotePreview;
