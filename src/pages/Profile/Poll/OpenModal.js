import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { HoverOver } from "../../../components/Tools";


import { AddBtn, CreatePoll, CreatrDes, PollInput } from "../style";
import "./openmodal.css";

import pollIcon from "../../../assets/media/Poll.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: "4px",
  boxShadow: 14,
  borderColor: "white",
  p: 4,
};

export default function OpenModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputNumber, setInputNumber] = React.useState(3);

  var rows = [];
  for (var i = 0; i < inputNumber; i++) {
    rows.push(<PollInput></PollInput>);
  }

  React.useEffect(() => { }, [inputNumber]);

  return (
    <span>
      <HoverOver title="Poll is not Available.">
        <span className="poll-modal-popup">
          <img src={pollIcon} onClick={handleOpen} />
        </span>

      </HoverOver>


      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ backgroundColor: "light", padding: "10px 0px" }}
          >
            Create You Poll
          </Typography>
          <CreatrDes></CreatrDes>
          {rows?.map((singleInput) => (
            <PollInput></PollInput>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <AddBtn onClick={() => setInputNumber(inputNumber + 1)}>+</AddBtn>
            <AddBtn onClick={handleClose}>Submit To Create</AddBtn>
          </div>
        </Box>
      </Modal> */}


    </span>
  );
}
