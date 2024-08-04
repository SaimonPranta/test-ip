import React, { useState, useEffect, useRef } from "react";

import "./style.scss";

import CustomeButton from "../../../../Utils/CustomeButton";


function AddNotesModal() {




  //create
  var myWindow = (url) => {
    //  `http://localhost:3000/${url}`,
    // `${BACKEND_URL}/${url}`;
    window.open(`/${url}`, "Data", "height=1000,width=2000");
  };
  const [buttonCustom, setButtonCustom] = useState(false);
  useEffect(() => { }, [buttonCustom]);
  return (
    <div className="addNoteMainDiv" style={{ padding: "7px" }}>


      <div className="buttonSection">
        <span onClick={() => myWindow("new-note")}>
          <CustomeButton
            title="Create"
          />
        </span>
      </div>


    </div>
  );
}

export default AddNotesModal;
