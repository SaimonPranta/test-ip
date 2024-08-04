import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";

import { BACKEND_URL } from "../../../../shared/constants/Variables";
import { USERNAME_REGEX } from "../../../../shared/constants/RegEx";
import { PhotoIcon } from "../../../../assets/media";
import { Spinner } from "../../../../shared";
import { SideModalUI } from "../../styles";

function Mail({ close }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);
  const [response, setResponse] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  let supportMailImage = useRef();
  let supportMailFile = useRef();
  function emailusOnSubmit() {
    setWorking(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("date", new Date().toISOString());
    formData.append("message", message);
    formData.append("image", image);
    formData.append("file", file);
    axios
      .post(`${BACKEND_URL}/user/support/mail`, formData, {
        "Content-Type": "multipart/form-data",
      })
      .then(() => {
        setUsername("");
        setMessage("");
        setWorking(false);
        setImage(null);
        setFile(null);
        setResponse("Mail has been sent.");
        setTimeout(close, 1000);
      })
      .catch((e) => {
        setWorking(false);
        setResponse(e.response?.data?.message || "Something went wrong.");
        throw e;
      });
  }
  function validateMailbox() {
    return !!username && !!message && USERNAME_REGEX.test(username);
  }
  function onSelectImage({ target }) {
    const file = target.files[0];
    if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1])) {
      setResponse("Invalid image type.");
    } else if (file.size > 1048576) {
      setResponse("Image is too large");
    } else {
      setImage(file);
    }
  }
  function onSelectFile({ target }) {
    const file = target.files[0];
    if (file.size > 1048576) {
      setResponse("Image is too large");
    } else {
      setFile(file);
    }
  }
  useEffect(() => {
    clearTimeout(window.mailrestime);
    if (!!response) {
      window.mailrestime = setTimeout(() => {
        setResponse("");
      }, 4000);
    }
  }, [response]);
  return (
    <div className="bpcxc">
      <SideModalUI align="right" borderColor="mintcream">
        <div className="each_cn email_outer">
          <div className="email_head">Contact us</div>
          <div style={{ padding: 3 }}>
            <div className="form_out">
              <input
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Name"
                className="email_ip"
              />
            </div>
            <div className="form_out">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                name="user"
                placeholder="Username"
                className="email_ip"
                value={username}
              />
            </div>
            <div className="form_out">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                placeholder="Type your text.."
                autoComplete="off"
                className="text_bg"
                value={message}
                rows={8}
              />
            </div>
          </div>
          {!!response && (
            <Typography
              component="p"
              variant="subtitle1"
              color="primary"
              align="center"
            >
              {response}
            </Typography>
          )}
          <div className="post_email_ot">
            <div>
              <img
                style={{ height: 30, width: 30, cursor: "pointer" }}
                onClick={() => supportMailImage.click()}
                src={PhotoIcon}
                alt=""
              />
            </div>
            {validateMailbox() ? (
              <button className="submit_txt bg_green" onClick={emailusOnSubmit}>
                {working ? <Spinner height={"25px"} /> : "Submit"}
              </button>
            ) : (
              <button className="submit_txt" disabled>
                Submit
              </button>
            )}
            <div
              onClick={() => supportMailFile.click()}
              className={!!file ? "add_more active" : "add_more"}
            >
              &#10010;
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="fileInput"
            ref={(ref) => (supportMailImage = ref)}
            onChange={onSelectImage}
          />
          <input
            type="file"
            className="fileInput"
            ref={(ref) => (supportMailFile = ref)}
            onChange={onSelectFile}
          />
        </div>
        {/* Email - Ends */}
        <div onClick={close} className="close_support_chat">
          &#10006;
        </div>
      </SideModalUI>
    </div>
  );
}

export default connect((store) => ({ site: store.site }))(Mail);
