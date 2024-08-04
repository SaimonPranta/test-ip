import React, { useState } from "react";
import story from "../../../assets/story/story.png";
import { IoAddCircle } from "react-icons/io5";
import Modal from "../common/Modal";
import PreviewSlider from "../common/PreviewSlider";
import { useHistory } from "react-router-dom";
import { reactionData } from "../../../pages/Stories/AddStory/utils/reactionData";
import StorySlider from "../common/StorySlider/index";
const Stories = ({ data, render, setRender }) => {
  const [openModal, setOpenModal] = useState(false);
  const [storyData, setStoryData] = useState([]);
  const history = useHistory();
  const OWN = "own";
  const OTHER = "other";

  const handleOpenStory = (type) => {
    if (type === OWN) {
      if (data?.myStories) {
        setOpenModal(true);
        setStoryData(data?.myStories);
      }
    }
    if (type === OTHER) {
      if (data?.friendsStories) {
        setOpenModal(true);
        setStoryData(data?.friendsStories);
      }
    }
    if (data?.friendsStories?.length === 0 && type === OTHER) {
      setOpenModal(false);
      setStoryData([]);
    }
    if (data?.myStories?.length === 0 && type === OWN) {
      setOpenModal(false);
      setStoryData([]);
    }
  };

  const handleAddStory = () => {
    history.push("/stories/create");
  };

  return (
    <>
      <div className="story-item">
        <div className="inside-item">
          <div className="add-item add-new-story" onClick={handleAddStory}>
            <IoAddCircle className="icon" />
            <p>Create Story</p>
          </div>

          <div
            onClick={() => handleOpenStory("own")}
            className="added-items added-story own-item"
          >
            <PreviewSlider data={data?.myStories} type="story" />
          </div>
          <div
            onClick={() => handleOpenStory("other")}
            className="added-items added-story other-item"
          >
            <PreviewSlider data={data?.friendsStories} type="story" />
          </div>
        </div>
        <Modal openModal={openModal} setOpenModal={setOpenModal}>
          {openModal && (
            <>
              <StorySlider
                data={storyData}
                setOpenModal={setOpenModal}
                openModal={openModal}
                render={render}
                setRender={setRender}
              />
              {/* reaction part */}
              <div className="reaction-reply">
                <form action="#">
                  <div className="form-input">
                    <input type="text" placeholder="send reply" />
                  </div>
                </form>
                <div className="reaction">
                  {reactionData?.map((reaction) => {
                    return <img key={reaction.id} src={reaction.icon} alt="" />;
                  })}
                </div>
              </div>
            </>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Stories;
