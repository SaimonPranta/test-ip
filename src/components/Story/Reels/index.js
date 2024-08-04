import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import PreviewSlider from "../common/PreviewSlider";
import Modal from "../common/Modal";
import { useHistory } from "react-router-dom";
import ReelSlider from "./PreviewReel/ReelSlider/index";
import { set } from "date-fns";
const Reels = ({ data }) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [reelsData, setReelsData] = useState([]);

  const OWN = "own";
  const OTHER = "other";

  const handleOpenReels = (type) => {
    if (type === OWN) {
      setOpenModal(true);
      setReelsData(data.myReels);
    }
    if (type === OTHER) {
      setOpenModal(true);
      setReelsData(data?.friendsReels);
    }
    if (data?.friendsReels?.length === 0 && type === OTHER) {
      setOpenModal(false);
      setReelsData([]);
    }
    if (data?.myReels?.length === 0 && type === OWN) {
      setOpenModal(false);
      setReelsData([]);
    }
  };

  const handleAddReels = () => {
    history.push("/reels/create");
  };

  return (
    <>
      <div className="story-item">
        <div className="inside-item">
          <div className="add-item add-new-reel" onClick={handleAddReels}>
            <IoAddCircle className="icon" />
            <p>Create Reel</p>
          </div>
          <div
            onClick={() => handleOpenReels("own")}
            className="added-items added-reel own-item"
          >
            <PreviewSlider data={data?.myReels} type="reels" />
          </div>
          <div
            onClick={() => handleOpenReels("other")}
            className="added-items added-reel other-item"
          >
            <PreviewSlider data={data?.friendsReels} type="reels" />
          </div>
        </div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          data={reelsData}
        >
          {openModal && (
            <div className="modal-children">
              <ReelSlider
                data={reelsData}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Reels;
