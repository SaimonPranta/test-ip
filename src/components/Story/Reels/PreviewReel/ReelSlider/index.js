import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./slider.style.scss";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { getRatioBasedValue } from "../../../../../shared/functions/getRatioBasedValue";
import { getUrl } from "../../../../../shared/functions";
import userPlaceholder from "../../../../../assets/profile/Male.png";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ReelListDropdown } from "../../../common/ListDropdown/ReelListDrop";
import Interaction from "../Interaction";
import CommentSection from "../CommentSection";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { actionOption } from "../../../../../pages/Reels/AddReels/utils/actionOption";

const ReelSlider = ({ data, openModal, setOpenModal, render, setRender }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const PREV = "prev";
  const NEXT = "next";
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [singleCommentData, setSingleCommentData] = useState({});
  const videoRef = useRef([]);
  const [dropdownItemActive, setDropdownItemActive] = useState({
    edit: false,
  });

  const [showListDropdown, setShowListDropdown] = useState({
    actionOption: false,
  });
  const [openCommentSection, setOpenCommentSection] = useState(false);
  const authUser = useSelector((state) => state?.auth?.user);

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSlider = debounce((type) => {
    if (data?.length > 1) {
      if (type === NEXT) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === 0) {
            sliderRef.current.style.transition = `none`;
            return data.length - 1;
          } else {
            sliderRef.current.style.transition = `100ms ease-out`;
            return prevIndex - 1;
          }
        });

        if (openCommentSection) {
          setOpenCommentSection(false);
        }
      }
      if (type === PREV) {
        videoRef?.current[currentIndex + 1]?.pause();
        setCurrentIndex((prevIndex) => {
          if (prevIndex === data?.length - 1) {
            sliderRef.current.style.transition = `none`;
            return 0;
          } else {
            sliderRef.current.style.transition = `100ms ease-out`;
            return prevIndex + 1;
          }
        });

        if (openCommentSection) {
          setOpenCommentSection(false);
        }
      }
    }
  });

  useLayoutEffect(() => {
    const divHeightInPixels = sliderContainerRef.current.clientHeight;

    const parentHeightInPixels =
      sliderContainerRef.current.parentElement.offsetHeight;

    const divHeightPercentage =
      (divHeightInPixels / parentHeightInPixels) * 100;
    setContainerHeight(Math.floor(divHeightPercentage));
  }, [sliderContainerRef]);

  const handleVideoPlaying = (type) => {
    console.log(videoRef);
    if (type === "play") {
      setIsPlaying(true);
      videoRef?.current[currentIndex]?.play();
    }
    if (type === "pause") {
      setIsPlaying(false);
      videoRef?.current[currentIndex]?.pause();
    }
  };

  useEffect(() => {
    if (openModal) {
      videoRef?.current[currentIndex]?.play();
      videoRef?.current[currentIndex - 1]?.pause();
      videoRef?.current[currentIndex + 1]?.pause();
    } else {
      videoRef?.current[currentIndex]?.pause();
    }
  }, [openModal, currentIndex]);

  return (
    <div className="reel-slider-wrapper">
      <div
        className="reel-slider-container"
        ref={sliderContainerRef}
        style={{
          width: `${containerHeight && getRatioBasedValue(containerHeight)}%`,
        }}
      >
        <div className="slideshow">
          <div
            className="slideshowSlider"
            ref={sliderRef}
            style={{
              transform: `translate3d(${-currentIndex * 100}%, 0, 0)`,
            }}
          >
            {data?.map((item, index) => (
              <div className="slide" key={index}>
                {item?.mediaType === "video/mp4" && (
                  <div className="wrapper">
                    <div className="user-info">
                      <div className="info">
                        <div className="img">
                          <img src={userPlaceholder} alt="" />
                        </div>
                        <div className="name">
                          <h4>{item?.user?.fullname}</h4>
                        </div>
                      </div>
                      <div className="action">
                        <div className="pause-play">
                          {isPlaying ? (
                            <button onClick={() => handleVideoPlaying("pause")}>
                              <FaPause />
                            </button>
                          ) : (
                            <button onClick={() => handleVideoPlaying("play")}>
                              <FaPlay />
                            </button>
                          )}
                        </div>
                        {item?.user?.username === authUser?.username && (
                          <>
                            <div
                              className="option"
                              onClick={() =>
                                setShowListDropdown((prevState) => {
                                  return {
                                    ...prevState,
                                    actionOption: !prevState.actionOption,
                                  };
                                })
                              }
                            >
                              <button>
                                <BsThreeDots />
                              </button>
                            </div>

                            <div className="dropdown-area">
                              {showListDropdown.actionOption && (
                                <ReelListDropdown
                                  data={actionOption}
                                  setShowListDropdown={setShowListDropdown}
                                  setDropdownItemActive={setDropdownItemActive}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <video
                      controls={false}
                      autoPlay={currentIndex === index ? true : false}
                      ref={(element) => (videoRef.current[index] = element)} // it may need array type ref for multiple video
                      loop
                      // muted={openModal === false}
                    >
                      <source
                        src={getUrl(item?.imageLink, item?.user?.username)}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}

                <Interaction
                  openCommentSection={openCommentSection}
                  setOpenCommentSection={setOpenCommentSection}
                  reelId={item._id}
                  index={currentIndex}
                  singleCommentData={singleCommentData}
                  setSingleCommentData={setSingleCommentData}
                />
                <div className="bottom-area">
                  <CommentSection
                    index={currentIndex}
                    openCommentSection={openCommentSection}
                    setOpenCommentSection={setOpenCommentSection}
                    description={item?.description}
                    reelId={item._id}
                    singleCommentData={singleCommentData}
                    setSingleCommentData={setSingleCommentData}
                    setDropdownItemActive={setDropdownItemActive}
                    dropdownItemActive={dropdownItemActive}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="slider-control">
        <div className="btn prev-btn" onClick={() => handleSlider("next")}>
          <IoChevronBackSharp />
        </div>
        <div className="btn next-btn" onClick={() => handleSlider("prev")}>
          <IoChevronForwardSharp />
        </div>
      </div>
    </div>
  );
};

export default ReelSlider;
