import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { getRatioBasedValue } from "../../../shared/functions/getRatioBasedValue";
import { background } from "./../../../pages/Stories/AddStory/utils/background";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Index = ({
  selectedStory,
  xAxis,
  setXAxis,
  yAxis,
  setYAxis,
  setActiveText,
  activeText,
  setStoryText,
  totalStories,
  setTotalStories,
  activeStory,
}) => {
  const previewStoryRef = useRef();

  const textRefs = useRef({});

  const [isDrag, setIsDrag] = useState(false);
  const videoRef = useRef();
  const [isPlay, setIsPlay] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const [showControlBtn, setShowControlBtn] = useState(false);
  const [render, setRender] = useState(false);

  useLayoutEffect(() => {
    const divHeightInPixels = previewStoryRef?.current?.clientHeight;

    const parentHeightInPixels =
      previewStoryRef?.current?.parentElement?.offsetHeight;

    const divHeightPercentage =
      (divHeightInPixels / parentHeightInPixels) * 100;
    setContainerHeight(Math.floor(divHeightPercentage));
  }, [previewStoryRef]);

  const handleMouseDown = (e, index, storyIndex) => {
    if (activeText === index && activeStory === storyIndex) {
      console.log(activeText, index, activeStory);
      e.preventDefault();
      setActiveText(index);
      setIsDrag(true);
      setXAxis(e.pageX);
      setYAxis(e.pageY);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {
    totalStories[activeStory]?.texts?.forEach((text, textId) => {
      textRefs.current[textId].style.top = `${text?.textPositionY}%`;
      textRefs.current[textId].style.left = `${text?.textPositionX}%`;
    });
  }, [activeStory]);

  const handleMouseMove = debounce((e, textId, currentStory) => {
    if (!isDrag) return false;
    e.preventDefault();
    const parentWidth = previewStoryRef?.current?.offsetWidth;
    const parentHeight = previewStoryRef?.current?.offsetHeight;

    if (currentStory === activeStory) {
      const dx = e.pageX - xAxis;
      const dy = e.pageY - yAxis;

      let updatedValue = [...totalStories];

      updatedValue = updatedValue.map((story, storyIndex) => {
        if (storyIndex === activeStory) {
          let updateText = [...story.texts];

          updateText = updateText.map((text, textIndex) => {
            if (activeText === textIndex) {
              const totalMoveX =
                ((textRefs.current[textId].offsetLeft + dx) / parentWidth) *
                100;
              const totalMoveY =
                ((textRefs.current[textId].offsetTop + dy) / parentHeight) *
                100;

              text.textPositionX = Math.floor(totalMoveX);
              text.textPositionY = Math.floor(totalMoveY);
            }
            return text;
          });

          story.texts = updateText;
        }
        return story;
      });

      setTotalStories(updatedValue);

      if (isDrag && textRefs.current[textId]) {
        textRefs.current[textId].style.top = `${
          ((textRefs.current[textId].offsetTop + dy) / parentHeight) * 100
        }%`;
        textRefs.current[textId].style.left = `${
          ((textRefs.current[textId].offsetLeft + dx) / parentWidth) * 100
        }%`;

        if (textRefs.current[textId].offsetLeft < 50) {
          textRefs.current[textId].style.left = `10%`;
        }
        if (textRefs.current[textId].offsetTop < 50) {
          textRefs.current[textId].style.top = `10%`;
        }
        if (
          textRefs.current[textId].offsetLeft >
          parentWidth - textRefs.current[textId].offsetWidth
        ) {
          textRefs.current[textId].style.left = `${
            ((parentWidth - textRefs.current[textId].offsetWidth) /
              parentWidth) *
            100
          }%`;
        }
        if (
          textRefs.current[textId].offsetTop >
          parentHeight - textRefs.current[textId].offsetHeight
        ) {
          textRefs.current[textId].style.top = `${
            ((parentHeight - textRefs.current[textId].offsetHeight) /
              parentHeight) *
            100
          }%`;
        }
        setXAxis(e.pageX);
        setYAxis(e.pageY);
      }

      console.log(activeStory);
    }
  });

  const handleMouseUp = (e) => {
    setIsDrag(false);
  };

  const handleVideoControl = (type) => {
    if (type === "play") {
      videoRef?.current.pause();
      setIsPlay(false);
    }
    if (type === "pause") {
      videoRef?.current.play();
      setIsPlay(true);
    }
  };

  const handleSelectedText = (index) => {
    setActiveText(index);
  };

  const handleDeleteSelectedText = (index) => {
    console.log(activeText, activeStory);
    let updatedValue = [...totalStories];

    updatedValue = updatedValue.map((story, storyIdx) => {
      const filterStoryText = story.texts.filter(
        (text, textIdx) => index !== textIdx
      );

      if (activeStory === storyIdx) {
        story.texts = filterStoryText;
      }
      return story;
    });

    setTotalStories(updatedValue);

    if (activeText === index) {
      setRender(!render);
      setStoryText("");
    }
  };

  useEffect(() => {
    setActiveText(-1);
  }, [render]);

  return (
    <div className="preview-story-wrapper">
      <div
        className="preview-area"
        ref={previewStoryRef}
        style={{
          width: `${containerHeight && getRatioBasedValue(containerHeight)}%`,
        }}
      >
        <div className="background-area">
          {selectedStory?.background?.type === "video/mp4" ? (
            <div
              className="video"
              onMouseOver={() => setShowControlBtn(true)}
              onMouseLeave={() => setShowControlBtn(false)}
            >
              <video
                ref={videoRef}
                width="320"
                height="240"
                controls={false}
                autoPlay
              >
                <source
                  src={selectedStory?.background.value}
                  type="video/mp4"
                />
              </video>
              <div className={`control ${showControlBtn ? "show" : ""}`}>
                {isPlay ? (
                  <button
                    className="play btn"
                    onClick={() => handleVideoControl("play")}
                  >
                    <FaPauseCircle />
                  </button>
                ) : (
                  <button
                    className="pause btn"
                    onClick={() => handleVideoControl("pause")}
                  >
                    <FaPlayCircle />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <img src={selectedStory?.background.value} alt="" />
          )}

          {selectedStory.texts.map((text, index) => {
            return (
              <p
                className={`story-text ${
                  activeText === index ? "active-text" : ""
                }`}
                ref={(element) => {
                  textRefs.current[index] = element;
                }}
                onMouseDown={(e) => handleMouseDown(e, index, activeStory)}
                onMouseMove={(e) => handleMouseMove(e, index, activeStory)}
                onMouseUp={handleMouseUp}
                onClick={() => handleSelectedText(index)}
                style={{
                  fontSize: `${text?.fontSize}px`,
                  color: text?.textColor,
                  fontFamily: text?.font,
                }}
              >
                {text?.storyText}
                <span
                  onClick={() => handleDeleteSelectedText(activeText)}
                  className="delete-text"
                >
                  <MdDelete className="icon" />
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
