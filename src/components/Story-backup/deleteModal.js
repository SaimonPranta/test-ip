import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import { MdDeleteSweep } from "react-icons/md";
import CustomeButton from "../../Utils/CustomeButton";
import axios from "axios";
import { BACKEND_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory, updateStory } from "../../store/Story/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #059862",
  boxShadow: "5 10 8 10 #888888",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const title = {
  fontSize: "18px",
  fontWeight: 500,
  color: "#6a6a6a",
};

export default function DeleteModal({ storyId, deletedStory }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const storyData = useSelector((state) => state.storyReducer);
  const dispatch = useDispatch();
  const CancelHandler = () => {
    handleOpen();
  };
  //   goToPreviousPath();

  const updateRedux = (id) => {
    const storyArray = [];
    const uploadImageArray = [];
    storyData.Story?.map((item) => {
      if (item._id != id) {
        storyArray.push(item);
      }
    });
    storyData.uploadedImage?.map((item) => {
      if (item.id != id) {
        uploadImageArray.push(item);
      }
    });
    dispatch(updateStory(storyArray, uploadImageArray));
  };
  const deleteHandler = (id) => {
    axios
      .delete(`${BACKEND_URL}/stories/story/${storyId._id}`, {
        headers: userHeader(),
      })
      .then((res) => {
        dispatch(deleteStory(storyId._id));
      })
      .catch((err) => console.error(err));
    handleClose();
    updateRedux(id);
  };
  React.useEffect(() => {}, [open, storyId, deletedStory]);

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
        <MdDeleteSweep
          className="settingHover"
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: "50px",
            alignSelf: "center",
          }}
        />
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
            <span
              onClick={() => {
                deleteHandler(storyId._id);
              }}
            >
              <CustomeButton title="Yes" /* deletedStory={storyId} */ />
            </span>
            {/* <button onClick={() => goToPreviousPath()} variant="contained">
              Yes
            </button> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
