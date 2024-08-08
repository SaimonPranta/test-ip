import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./slider.style.scss";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { getRatioBasedValue } from "../../../../shared/functions/getRatioBasedValue";
import { getUrl } from "../../../../shared/functions";
import userPlaceholder from "../../../../assets/profile/Male.png";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import ListDropdown from "../ListDropdown";
import { actionOption } from "../../../../pages/Stories/AddStory/utils/actionOption";
import { classNames } from "classnames";

const StorySlider = ({ data, openModal, setOpenModal, render, setRender }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const PREV = "prev";
  const NEXT = "next";
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [showListDropdown, setShowListDropdown] = useState({
    actionOption: false,
  });

  const [layerOneImage, setLayerOneImage] = useState();
  const [layerTwoImage, setLayerTwoImage] = useState();

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
    //  change current index 1 to 0
    // next it may change like campaign
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

        if (data[currentIndex] === "video/mp4") {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }
      if (type === PREV) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === data.length - 1) {
            sliderRef.current.style.transition = `none`;
            return 0;
          } else {
            sliderRef.current.style.transition = `100ms ease-out`;
            return prevIndex + 1;
          }
        });

        if (data[currentIndex] === "video/mp4") {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
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

  useEffect(() => {
    if (data.length === 1) {
      if (data[0].mediaType !== "video/mp4") {
        setLayerOneImage(data[0]);
        setLayerTwoImage(data[0]);
      }
    }
    if (data.length === 2) {
      setLayerOneImage(data[1]);
      setLayerTwoImage(data[0]);
    }
    if (data.length === 3) {
      setLayerOneImage(data[1]);
      setLayerTwoImage(data[2]);
    }
    if (data.length > 3) {
      setLayerOneImage(data[2]);
      setLayerTwoImage(data[3]);
    }
  }, [data]);

  useEffect(() => {
    if (data[currentIndex]?.mediaType === "video/mp4") {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [currentIndex, data]);

  useEffect(() => {
    if (!openModal) {
      videoRef?.current?.pause();
    }
  }, [openModal]);

  return (
    <div className="story-slider-wrapper">
      <div className="layer-1">
        {layerOneImage?.mediaType !== "video/mp4" ? (
          <img
            src={getUrl(
              layerOneImage?.imageLink,
              layerOneImage?.user?.username
            )}
            alt=""
          />
        ) : (
          <video width="320" height="240" controls={false} muted>
            <source
              src={getUrl(
                layerOneImage?.imageLink,
                layerOneImage?.user?.username
              )}
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div className="layer-2">
        {layerTwoImage?.mediaType !== "video/mp4" ? (
          <img
            src={getUrl(
              layerTwoImage?.imageLink,
              layerTwoImage?.user?.username
            )}
            alt=""
          />
        ) : (
          <video width="320" height="240" controls={false} muted>
            <source
              src={getUrl(
                layerTwoImage?.imageLink,
                layerTwoImage?.user?.username
              )}
              type="video/mp4"
            />
          </video>
        )}
      </div>
      <div
        className="story-slider-container"
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
            {data.map((item, index) => (
              <div className="slide" key={index}>
                {item?.mediaType !== "video/mp4" ? (
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
                      {item?.user?.username === authUser?.username && (
                        <div className="action">
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
                              <ListDropdown
                                data={actionOption}
                                type="actionOption"
                                showListDropdown={showListDropdown}
                                setShowListDropdown={setShowListDropdown}
                                deletedId={item._id}
                                setOpenModal={setOpenModal}
                                openModal={openModal}
                                render={render}
                                setRender={setRender}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <img
                      src={getUrl(item?.imageLink, item?.user?.username)}
                      alt=""
                    />
                    {item?.texts?.map((text) => (
                      <p
                        className="story-text"
                        style={{
                          top: `${text?.textPositionY}%`,
                          left: `${text?.textPositionX}%`,
                          color: `${text?.textColor}`,
                          fontSize: `${text?.fontSize}px`,
                          fontFamily: `${text?.font}`,
                        }}
                      >
                        {text?.storyText}
                      </p>
                    ))}
                  </div>
                ) : (
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
                      {item?.user?.username === authUser?.username && (
                        <div className="action">
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
                              <ListDropdown
                                data={actionOption}
                                type="actionOption"
                                showListDropdown={showListDropdown}
                                setShowListDropdown={setShowListDropdown}
                                deletedId={item._id}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <video controls={false} autoPlay ref={videoRef}>
                      <source
                        src={getUrl(item?.imageLink, item?.user?.username)}
                        type="video/mp4"
                        muted={index !== currentIndex}
                      />
                    </video>
                    {item?.texts?.map((text) => (
                      <p
                        className="story-text"
                        style={{
                          top: `${text?.textPositionY}%`,
                          left: `${text?.textPositionX}%`,
                          color: `${text?.textColor}`,
                          fontSize: `${text?.fontSize}px`,
                          fontFamily: `${text?.font}`,
                        }}
                      >
                        {text?.storyText}
                      </p>
                    ))}
                  </div>
                )}
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

export default StorySlider;
