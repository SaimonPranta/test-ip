import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { userHeader } from "../../../../shared/functions/Token";
import AdsUpload from "./AdsUpload.js";
import { Button } from "@material-ui/core";

const Add = () => {
  const [newImage, setNewImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [fullData, setFullData] = useState();

  const handleFileChange = (e) => {
    e.preventDefault();
    setNewImage(e.target.files[0].name);
  };

  // custome functions
  const submitHandler = () => {};

  // re-render the UI
  useEffect(() => {
    const adsBodyData = new FormData();
    adsBodyData.append("image", newImage);

    // extra data that would have comed here
    // N.E: store newly added data property to the useState (create new state and add it there)
    //useState stored data will be added on body.append section and make it toLocaleDateString formate and trim it by (" ")

    axios
      .post(`${BACKEND_URL}/profile/ads`, adsBodyData, {
        headers: userHeader(),
      })
      .then(({ data }) => {
        console.log("responced data WITHOPUT CUSTOME IMAGE ", data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    // console.log("fullData", fullData);
  }, [fullData]);

  return (
    <div style={{ padding: "30px" }}>
      <p>Add ads</p>
      <input
        type="text"
        placeholder="Add Country Name"
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Link"
        onChange={(e) => setLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <input onChange={handleFileChange} type="file" />
      <AdsUpload />

      <button
        style={{
          color: "white",
          backgroundColor: "black",
          padding: "10px 20px",
          // border: "none",
        }}
        onClick={submitHandler}
      >
        Submit
      </button>

      <div
        style={{
          // width: "90%",
          height: "100%",
          backgroundColor: "#ffff",
          padding: "20px",
          margin: "20px",
          border: "1px solid red",
          borderRadius: "5px",
        }}
      >
        <p>g String</p>
        {fullData}
      </div>
    </div>
  );
};

export default Add;
