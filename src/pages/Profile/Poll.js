import React, { useState } from "react";
import OpenModal from "./Poll/OpenModal";
import { CreatePoll, PolledSection } from "./style";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// import { BsGlobe } from "react-icons/bs";

function PollComp() {
  const [isChecked, setIsChecked] = useState(true);
  const [randomLoading, setRandomLoading] = useState(
    Math.floor(50 + Math.random() * (100 - 50))
  );

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          margin: "9px 0px",
        }}
      >
        <>
          <OpenModal />
        </>
      </div>

      <br />

      <h3
        style={{
          backgroundColor: "#e4e4e4",
          padding: "10px 5px",
          margin: "10px 5px",
          textAlign: "center",
          fontFamily: "-moz-initial",
          borderRadius: "2px",
        }}
      >
        All Polls You have made.
      </h3>

      <PolledSection>
        <h5
          style={{
            fontWeight: "bold",
            backgroundColor: "#eef1ff",
            padding: "10px",
            borderRadius: "5px",
            color: "#4624af",
          }}
        >
          Total Polls: 5
        </h5>
        <br />
        <br />
      </PolledSection>
      <div
        style={{
          border: "1px solid #e4e4e4",
          padding: "5px 10px",
          margin: "5px",
          borderRadius: "5px",
          padding: "6px 11px",
        }}
      >
        <small> 31 min age</small>
        <hr />
        <b>Description</b>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <br />
        <br />
        {Array(4)
          .fill("")
          .map((single) => {
            return (
              <PollSingle
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                randomLoading={randomLoading}
              />
            );
          })}
        <br />
        <br />
      </div>
    </div>
  );
}

export default PollComp;

function PollSingle({ isChecked, setIsChecked, randomLoading }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            onClick={() => setIsChecked(!isChecked)}
            style={{
              height: "30px",
              border: "3px solid #e4e4e4",
              borderRadius: "5px",
              width: "30px",
              backgroundColor: isChecked ? "white" : "#0048ba",
            }}
          ></div>
          <div
            style={{
              border: "1px solid #e4e4e4",
              borderRadius: "10px",
              padding: "15px 10px",
              marginTop: "-10px",
              marginLeft: "20px",
            }}
          >
            <p>scrambled it to make a type specimen book.</p>
          </div>
          {!isChecked && (
            <div
              style={{
                border: "1px solid #e4e4e4",
                // borderRadius: "10px",
                padding: "0px 0px",
                marginTop: "-10px",
                marginLeft: "20px",
                width: "300px",
                height: "50px",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  width: `${randomLoading}%`,
                  backgroundColor: "#0048ba",
                  color: "white",
                  padding: "0px 5px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                {randomLoading}%
              </p>
            </div>
          )}
        </div>
        <div>
          <span>
            <BasicModal />
          </span>
        </div>
      </div>
    </div>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <span
        style={{
          border: "1px solid #e4e4e4",
          borderRadius: "50%",
          padding: "10px 15px",
        }}
        onClick={handleOpen}
      >
        X
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete This Poll ?
          </Typography>
          <div style={{ display: "flex" }}>
            <button onClick={() => handleClose()} className="btn btn-danger">
              Yes
            </button>
            <button onClick={() => handleClose()} className="btn btn-light">
              No
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
