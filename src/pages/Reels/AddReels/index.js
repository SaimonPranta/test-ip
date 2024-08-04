import React, { useEffect, useState } from "react";
import "./style.scss";
import { IoEarthSharp } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import ListDropdown from "../../../components/Story/common/ListDropdown";
import { privacyData } from "../../Stories/AddStory/utils/privacy";
import DiscardModal from "../../../components/Story/common/DiscardModal";
import { userHeader } from "./../../../shared/functions/Token";
import axios from "axios";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { useHistory } from "react-router-dom";
import PreviewReel from "../../../components/Story/Reels/PreviewReel/index";
import { FaUsersCog } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const Index = () => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [showListDropdown, setShowListDropdown] = useState({
    privacy: false,
  });
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [privacy, setPrivacy] = useState({ name: "Public" });
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeReel, setActiveReel] = useState(0);
  const [activeText, setActiveText] = useState(-1);
  const [totalReels, setTotalReels] = useState([]);
  const [selectedReels, setSelectedReels] = useState(totalReels[0]);

  const handleSelectedReel = (item, index) => {
    console.log(item);
    setSelectedReels(item);
    setActiveReel(index);
    setDescription("");
    setActiveText(-1);
  };

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }

    let updatedValue = [...totalReels];

    updatedValue = updatedValue.map((reel, index) => {
      if (index === activeReel) {
        reel[e.target.name] = e.target.value;
      }
      return reel;
    });

    setTotalReels(updatedValue);
  };

  const handleReelDelete = (index) => {
    const afterDelete = totalReels.filter((item, idx) => index !== idx);
    setTotalReels(afterDelete);
    setSelectedReels(afterDelete[0]);
    setActiveReel(0);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const convert = URL.createObjectURL(e.target.files[0]);
    setTotalReels((prevState) => [
      ...prevState,
      {
        video: {
          type: file.type,
          value: convert,
          original: file,
        },
        description: "",
        privacy: "Public",
      },
    ]);
    setSelectedReels({
      video: {
        type: file.type,
        value: convert,
        original: file,
      },
      description: "",
      privacy: "Public",
    });
  };

  const handleListDropdown = (type) => {
    if (type === "privacy") {
      setShowListDropdown({
        ...showListDropdown,
        privacy: !showListDropdown.privacy,
        duration: false,
      });
    }
    if (type === "duration") {
      setShowListDropdown({
        ...showListDropdown,
        duration: !showListDropdown.duration,
        privacy: false,
      });
    }
  };

  useEffect(() => {
    if (activeText === -1) {
      setDescription("");
    }
  }, [activeText]);

  const handleShareToReel = async () => {
    const data = await Promise.all(
      totalReels.map(async (reel) => {
        try {
          if (reel?.video?.type === "video/mp4") {
            return {
              ...reel,
              media: reel?.video?.original,
              mediaType: reel?.video?.type,
            };
          }
        } catch (error) {
          console.error("Error processing reel:", error);
          return reel;
        }
      })
    );

    const formData = new FormData();
    data.forEach((item, index) => {
      delete item.video;
      formData.append(`media[${index}]`, item.media);
    });

    formData.append("data", JSON.stringify(data));

    console.log(data);
    axios
      .post(`${BACKEND_URL}/profile/reel/create`, formData, {
        headers: userHeader(),
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          history.goBack();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="create-reel">
      <div className="add-content">
        <div className="header-section">
          <h3>Your Reel</h3>
          <div className="option-tools">
            <div className="privacy wrapper">
              <button
                onClick={() => handleListDropdown("privacy")}
                disabled={totalReels?.length === 0}
              >
                {privacy?.name === ("Public" || "") && <IoEarthSharp />}
                {privacy?.name === "Friends" && <FaUsersCog />}
                {privacy?.name === "Only me" && <FaLock />}
              </button>
              {showListDropdown.privacy && (
                <div className="dropdown-wrapper">
                  <ListDropdown
                    data={privacyData}
                    dropdownData={privacy}
                    setDropdownData={setPrivacy}
                    showListDropdown={showListDropdown}
                    setShowListDropdown={setShowListDropdown}
                    totalDataItem={totalReels}
                    setTotalDataItem={setTotalReels}
                    activeItem={activeReel}
                    type="privacy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="writing-section">
          <textarea
            className="story-text"
            name="description"
            placeholder="Start typing"
            cols="30"
            rows="6"
            value={totalReels[activeReel]?.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="total-reel">
          <p>Preview</p>
          <div className="created-reels">
            {totalReels?.length > 0 &&
              totalReels?.map((reel, index) => {
                return (
                  <div className={`reel`} key={index}>
                    {reel?.video.type === "video/mp4" && (
                      <video
                        key={activeVideo}
                        preload="metadata"
                        onClick={() => handleSelectedReel(reel, index)}
                        className={`${activeReel === index ? "active" : ""}`}
                        controls={false}
                      >
                        <source src={reel?.video?.value} type="video/mp4" />
                      </video>
                    )}

                    <button
                      className={`delete-reel`}
                      onClick={() => handleReelDelete(index)}
                    >
                      <FiTrash />
                    </button>
                  </div>
                );
              })}
            <label htmlFor="addImage" className="image-label">
              <FaPlus className="icon" />
              <input
                onChange={(e) => handleFileSelect(e)}
                type="file"
                className="add-image"
                name="addImage"
              />
            </label>
          </div>
        </div>

        <div className="action-btn">
          <button className="discard" onClick={() => setShowDiscardModal(true)}>
            Discard
          </button>
          <button
            className="share"
            onClick={handleShareToReel}
            disabled={totalReels.length === 0}
          >
            Publish reels
          </button>
        </div>
        <DiscardModal
          setShowDiscardModal={setShowDiscardModal}
          showDiscardModal={showDiscardModal}
          title="Do you want to discard your reels?"
        />
      </div>
      <div className="preview-reel">
        <PreviewReel
          activeText={activeText}
          setStoryText={setDescription}
          activeReel={activeReel}
          setTotalReels={setTotalReels}
          selectedReels={selectedReels}
          setActiveText={setActiveText}
          totalReels={totalReels}
        />
      </div>
    </div>
  );
};

export default Index;
