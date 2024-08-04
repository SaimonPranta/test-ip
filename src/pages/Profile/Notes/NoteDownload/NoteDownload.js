import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getNotes } from "../../Hooks";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CustomeButton from "../../../../Utils/CustomeButton";

import "./style.scss";

function NoteDownload({}) {
  let { usernameNote, noteId } = useParams();
  const { notes, setNotes, counts, working, setCounts } =
    getNotes(usernameNote);
  const selectedNote = notes.filter((note) => note.id === noteId);

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("Download.pdf");
    });
  };
  return (
    <div style={{ padding: "10px" }}>
      {/* <button>
        <Link
          to={`http://localhost:3000/${usernameNote}/notePreview/${noteId}`}
          target="_blank"
          download
        >
          Download
        </Link>
      </button> */}
      <span onClick={printDocument}>
        <CustomeButton title="Download" />
      </span>
      <br />
      <br />

      <div className="downloadDiv">
        <div className="downloadContent" id="divToPrint">
          <p>Note Preview</p>
          <p>Name: {usernameNote}</p>
          <p>Note Id: {noteId}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteDownload;
