import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import CustomeButton from "../../../Utils/CustomeButton";
import { RiDeleteBin2Line } from "react-icons/ri";

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
const title = {
  fontSize: "18px",
  fontWeight: 500,
  color: "#6a6a6a",
};

export default function DeleteModal({ deleteProps }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CancelHandler = () => {
    handleOpen();
  };
  //   goToPreviousPath();

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <div
        className="closeBtn"
        onClick={CancelHandler}
        style={{
          width: "30px",
          height: "30px",
          border: "1px solid #80808000",
          borderRadius: "50%",
          backgroundColor: "transparent",
          textAlign: "center",
          display: "flex",
          color: "black",
          justifyContent: "center",
        }}
      >
        <RiDeleteBin2Line />
        {/* <ClearIcon
          style={{
            fontSize: "30px",
            alignSelf: "center",
          }}
        /> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p style={title}>Do you want to discard your story?</p>
          <br />
          <br />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <button
              onClick={() => setOpen(false)}
              variant="outlined"
              color="error"
            >
              No
            </button> */}

            <span onClick={() => setOpen(false)}>
              <CustomeButton title="No" />
            </span>
            <span onClick={() => deleteProps()}>
              <CustomeButton title="Yes" />
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
