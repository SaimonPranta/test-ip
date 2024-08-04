import React, { useState, useRef, useEffect } from "react";
import { getUrl } from "./../../../../shared/functions/index";

const PreviewSlider = ({ data, type }) => {
  console.log(data);
  const timeoutRef = React.useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const sliderRef = useRef();
  const [sliderItem, setSliderItem] = useState([]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) => {
          sliderRef.current.style.transition = `500ms ease-out`;
          return prevIndex ===
            sliderItem?.length - Math.ceil((sliderItem?.length - 1) / 2) ||
            prevIndex === sliderItem?.length - 1
            ? 1
            : prevIndex + 1;
        }),
      3000
    );

    return () => {
      resetTimeout();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    };
  }, [currentIndex, sliderItem?.length]);

  useEffect(() => {
    if (data) {
      console.log(data?.length);
      setSliderItem([data[parseInt(data?.length - 1)], ...data, ...data]);
    }
  }, [data]);

  return (
    <div
      onTransitionEnd={(callback) => {
        if (
          currentIndex ===
          sliderItem.length - Math.ceil((sliderItem.length - 2) / 2)
        ) {
          sliderRef.current.style.transition = `none`;
          setCurrentIndex(1);

          sliderRef.current.style.left = `-${1 * 100}%`;
        }
      }}
      className="slideshowSlider"
      ref={sliderRef}
      style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
    >
      {sliderItem?.length &&
        sliderItem?.map((item, index) => (
          <>
            {type === "story" ? (
              <>
                {item?.mediaType !== "video/mp4" ? (
                  <div className="slide">
                    <p>{item?.description}</p>

                    <div className="wrapper">
                      <img
                        src={getUrl(item?.imageLink, item?.user?.username)}
                        alt=""
                      />
                      <div className="info">
                        <h4>{item?.user?.fullname}</h4>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="slide">
                    <div className="wrapper">
                      <video
                        controls={false}
                        // autoPlay={index === currentIndex}
                        muted
                      >
                        <source
                          src={getUrl(item?.imageLink, item?.user?.username)}
                          type="video/mp4"
                        />
                      </video>
                      <div className="info">
                        <h4>{item?.user?.fullname}</h4>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="slide">
                  <div className="wrapper">
                    <video controls={false} autoPlay={false} muted>
                      <source
                        src={getUrl(item?.imageLink, item?.user?.username)}
                        type="video/mp4"
                      />
                    </video>
                    <div className="info">
                      <h4>{item?.user?.fullname}</h4>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ))}
    </div>
  );
};

export default PreviewSlider;
