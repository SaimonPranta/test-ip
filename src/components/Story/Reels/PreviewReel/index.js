import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { getRatioBasedValue } from "../../../../shared/functions/getRatioBasedValue";

const Index = ({ selectedReels, activeReel }) => {
  const previewStoryRef = useRef();
  const videoRef = useRef();
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    const divHeightInPixels = previewStoryRef?.current?.clientHeight;

    const parentHeightInPixels =
      previewStoryRef?.current?.parentElement?.offsetHeight;

    const divHeightPercentage =
      (divHeightInPixels / parentHeightInPixels) * 100;
    setContainerHeight(Math.floor(divHeightPercentage));
  }, [previewStoryRef]);

  return (
    <div className="preview-reel-wrapper">
      <div
        className="preview-area"
        ref={previewStoryRef}
        style={{
          width: `${containerHeight && getRatioBasedValue(containerHeight)}%`,
        }}
      >
        {selectedReels?.video?.type === "video/mp4" && (
          <div className="video-area">
            <div className="video">
              <video
                ref={videoRef}
                controls={false}
                autoPlay
                key={activeReel}
                loop
              >
                <source src={selectedReels?.video?.value} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
