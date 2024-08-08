import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import StoryPreview from "../StoryPreview/StoryPreview";
import { HoverOver } from "../../../components/Tools";

import moreStoryAddIcon from "../../../assets/moreStoryAddIcon.png";

function Preview({
  storyList,
  backgroundData,
  CustomBackground,
  CustomFont,
  colorData,
  CustomColor,
  AddText,
  setStoryList,
  color,
  singleStory,
  setSingleStory,
  setCustomColor,
  setAddText,
  setCustomeFontSize,
  CustomeFontSize,
  onNext,
  setTextPositionX,
  setTextPositionY,
  setTextPositiondelX,
  setTextPositiondelY,
  textPositionX,
  textPositionY,
  textPositiondelX,
  textPositiondelY,
}) {
  const [addStory, setAddStory] = useState([]);
  const [StoryBackgound, setStoryBackgound] = useState(
    backgroundData[CustomBackground]
  );
  const [StoryTextPosition, setStoryTextPosition] = useState("");
  const [StoryColor, setStoryColor] = useState(colorData[CustomColor]);
  const [StoryFont, setStoryFont] = useState(CustomFont);
  const [StoryText, setStoryText] = useState(AddText);

  const addStoryHandler = () => {
    setAddStory([""]);
    // setSingleStory;


    setTimeout(function () {
      setStoryList([...storyList, singleStory]);
    }, 300);

    // setTimeout(function () {
    //   setCustomColor(0);
    //   setSingleStory();
    //   setAddText("Add Some Quotes");
    //   setCustomeFontSize(22);
    // }, 350);
  };

  if (singleStory?.backgroundColorBool) {
  } else {
  }
 
  return (
    <div>
      <Grid container>
        <Grid xs={2}>
          {/* {storyList.length > 0 && (
            <div className="ActionButton">
              <IoIosArrowBack />
            </div>
          )} */}
        </Grid>
        <Grid xs={8}>
          <div
            style={{
              height: "100vh",
              width: "100%",

              //   backgroundColor: `rgba(${color?.color.r}, ${color?.color.g}, ${color?.color.b}, ${color?.color.a})!important`,
              // backgroundColor: `rgba(${singleStory.background.color?.r}, ${singleStory.background.color?.g}, ${singleStory.background.color?.b}, ${singleStory.background.color?.a})!important`,

              // backgroundImage: `url(${singleStory.background})`,
              backgroundImage: `url(${singleStory.background})`,
              backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "5px",
              display: "flex",
            }}>
            {/* <Grid container> */}

            {/* <Grid xs={4} style={{width:'100%', border:'1px solid green'}}></Grid> */}
            {/* <div style={{width:'25%', border:'1px solid red'}}></div>
                      <div style={{width:'25%', border:'1px solid red'}}></div> */}
            {/* <Grid xs={4}> */}
            <div
              style={{
                height: "100vh",
                borderRadius: "5px",
                display: "flex",
                width: "100%",
                backgroundColor: "#58555557",
              }}>
              <div
                className="imagePreviewDiv"
                style={
                  // (singleStory?.backgroundColorBool
                  //   ? { backgroundColor: singleStory.background.color?.r }
                  //   : {
                  // },
                  {
                    // backgroundColor: singleStory.background.color?.r,
                    backgroundImage: `url(${singleStory.background})`,
                    float: "left",
                    height: "100%",
                    width: "50%",
                    padding: "20px",

                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    position: "absolute",
                    display: "inline-block",
                    overflow: "hidden",
                    // margin: "73px auto",
                  }
                }>
                {/* <h5
                  className="showTextStory"
                  style={{
                    textTransform: "capitalize",
                    fontFamily: CustomFont,
                    color: colorData[CustomColor],
                    fontSize: "25px",
                    margin: "auto",
                  }}
                >
                  {AddText}
                </h5> */}
                <StoryPreview
                  setTextPositionX={setTextPositionX}
                  setTextPositionY={setTextPositionY}
                  setTextPositiondelX={setTextPositiondelX}
                  setTextPositiondelY={setTextPositiondelY}
                  setSingleStory={setSingleStory}
                  textPositionX={textPositionX}
                  textPositionY={textPositionY}
                  textPositiondelX={textPositiondelX}
                  textPositiondelY={textPositiondelY}
                  // deltaX={-20}
                  // lastX={-20}
                  // deltaY={740}
                  // lastY={880}
                  CustomeFontSize={CustomeFontSize}
                  singleStory={singleStory}
                  AddText={AddText}
                  CustomFont={CustomFont}
                  colorData={colorData[CustomColor]}
                />
              </div>
              {/* ---- */}
            </div>
          </div>
        </Grid>
        <Grid xs={2}>
          {" "}
          <div
            // className=""

            className="ActionButton ">
            <HoverOver title="Create new">
              <p onClick={() => onNext()}>
                {/* <IoIosArrowForward className="closeBtn" /> */}
                <img
                  style={{ height: "50px", width: "50px" }}
                  className="closeBtn"
                  src={moreStoryAddIcon}
                  alt="more-btn"
                />
              </p>
            </HoverOver>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Preview;
