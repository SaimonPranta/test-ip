import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { AttachFile, MoreHoriz, Archive, Close } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "axios";

import { BACKEND_URL } from "../../shared/constants/Variables";
import { closeMailCompose } from "../../store/site/action";
import { generateId } from "../../shared/functions/String";
import { userHeader } from "../../shared/functions/Token";
import { MAIL_REGEX } from "../../shared/constants/RegEx";
import { Spinner } from "../../shared";
import "./style.scss";

function Compose({
  data: {
    mail: { compose, address },
  },
  dispatch,
  auth
}) {
  const [mailI, setMailI] = useState("");
  const [formMail, setFormMail] = useState('');
  const [subjectI, setSubjectI] = useState("");
  const [messageI, setMessageI] = useState("");
  const [working, setWorking] = useState(false);
  const [selected, setSelected] = useState([]);
  const [response, setResponse] = useState("");
  useEffect(() => {
    if (!!address) {
      setMailI(`${address}@micple.com`);
      setFormMail(`${auth.user.username}@micple.com`)
    }else {
      setFormMail(`${auth.user.username}@micple.com`)
    }
  }, [address]);
  function onSend() {
    setWorking(true);
    const subject = subjectI.trim();
    const mail = mailI.trim();
    const message = messageI.trim();
    if (!subject || !mail || (!message && selected.length < 0)) {
      setResponse("Invalid inputs.");
      return;
    }
    const formData = new FormData();
    for (const file of selected) {
      formData.append(generateId(8), file);
    }
    formData.append("to", mail);
    formData.append('formMail', formMail)
    formData.append("subject", subject);
    formData.append("message", message);
    formData.append("date", new Date().toISOString());
    axios
      .post(`${BACKEND_URL}/mails/send`, formData, {
        headers: { ...userHeader(), "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setResponse('Mail sent successfully')
        setWorking(false)
        setMessageI('')
        setMailI('')
        setSubjectI('')
        close()
        setTimeout(()=>{
          closeDialog()
        }, 2000)
      })
      .catch(err=>{
        setResponse('Something wrong!')
        setWorking(false)
        setMessageI('')
        setMailI('')
        setSubjectI('')
        close()
        setTimeout(()=>{
          closeDialog()
        }, 2000)
      });
  }
  function onSelect({ target }) {
    const { files } = target;
    for (const file of files) {
      if (file.size > 10240000) {
        setResponse("File is too large.");
        break;
      }
    }
    setSelected([...selected, ...files]);
  }
  function close() {
    dispatch(closeMailCompose());
  }
  function closeDialog() {
    setResponse("");
  }
  if (!compose) {
    return <span>
       {
        !!response && (
          <div style={{position: 'fixed', bottom:'30px'}}>
            <div style={{
              border:'1px solid lightgray',
              padding:'10px',
              borderRadius:'5px',
              marginLeft:'5px',
            }}>
            
              {response}
            </div>
          </div>
          )
      }
    </span>;
  }else{
    return (
     <>
      <Card className="cmpsb">
        <div className="iptb">
          <input
            type="email"
            placeholder="To"
            value={mailI}
            autoComplete="off"
            onChange={(e) => setMailI(e.target.value)}
          />
          <input
            placeholder="Subject"
            type="text"
            value={subjectI}
            autoComplete="off"
            onChange={(e) => setSubjectI(e.target.value)}
          />
          <textarea
            value={messageI}
            placeholder="Write..."
            onChange={(e) => setMessageI(e.target.value)}
            rows={5}
          />
        </div>
        {selected.length > 0 && (
          <div className="archs">
            <Archive />
            <span style={{ flex: "1 1 auto" }}>{selected.length}</span>
            <IconButton onClick={() => setSelected([])}>
              <Close />
            </IconButton>
          </div>
        )}
        <div className="mbtns">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={onSend}
              disabled={
                working ||
                !MAIL_REGEX.test(mailI) ||
                !subjectI ||
                (!messageI && selected.length < 0)
              }
              style={{textTransform: "capitalize"}}
            >
              {working ? <Spinner height="auto" /> : "Send"}
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={close}
              disabled={working}
              style={{textTransform: "capitalize"}}
            >
              Discard
            </Button>
          </div>
          <input
            id="mailFileInput"
            type="file"
            style={{ visibility: "hidden", height: 0, width: 0 }}
            onChange={onSelect}
            multiple
          />
          <span style={{ flex: "1 1 auto" }}></span>
          <IconButton
            onClick={() => document.getElementById("mailFileInput").click()}
          >
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
        {/* <Dialog open={!!response} onClose={closeDialog} fullWidth maxWidth="sm">
          <DialogTitle>Mail Status</DialogTitle>
          <DialogContent dividers>{response}</DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={closeDialog}>
              Ok
            </Button>
          </DialogActions>
        </Dialog> */}
        
      </Card>
     
     </>
      
    );
  }
}

export default connect((store) => ({ data: store.site, auth: store.auth }))(Compose);
