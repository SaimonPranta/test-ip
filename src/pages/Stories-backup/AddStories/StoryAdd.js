/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useParams, withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import "../style.scss";
import "./style.scss";

import { IoCopyOutline } from "react-icons/io5";

import { BiFontColor } from "react-icons/bi";
import { VscAdd } from "react-icons/vsc";
import { HoverOver } from "../../../components/Tools";
import FontSlider from "../FontSlider";
import Preview from "./Preview";
import AddedStoriesPreview from "./AddedStoriesPreview";
import ColorPicker from "./ColorPicker";
import StorySettingAction from "../Poper/Poper";
import { connect } from "react-redux";
import { userHeader } from "../../../shared/functions/Token";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import axios from "axios";
import Upload from "./Uplaod";
import image1 from "../../../assets/storyDefaultPic/1.jpg";
import image2 from "../../../assets/storyDefaultPic/6.jpg";
import image3 from "../../../assets/storyDefaultPic/2.jpg";
import image4 from "../../../assets/storyDefaultPic/3.jpg";
import image5 from "../../../assets/storyDefaultPic/4.jpg";
import image6 from "../../../assets/storyDefaultPic/5.jpg";
import CancelModal from "./CancelModal";
import { Lock, People, Public } from "@material-ui/icons";
import CircularIndeterminate from "./Loader";

// var backgroundData = [image1, image2, image3, image4, image5, image6];
var backgroundData = [
  "https://images.unsplash.com/photo-1491378630646-3440efa57c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1593572547344-d8c3d0ff7d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1516617442634-75371039cb3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1500122497987-96abce325586?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1617746029822-3f36f2ba0f49?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
  "https://images.unsplash.com/photo-1487147264018-f937fba0c817?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
];

var colorData = ["Black", "Green", "violet", "Blue", "Yellow", "Red"];

function StoryAdd({ location: { pathname }, auth }) {
  console.log("auth", auth);
  console.log("auth", auth.user.username);
  // console.log("pathname", pathname);

  // console.log("username username -----", auth.user.username);

  let username = auth.user.username;

  console.log("auth username username ", username);

  let history = useHistory();
  const [AddText, setAddText] = useState("");
  const [CustomFont, setCustomFont] = useState("system-ui");
  const [CustomBackground, setCustomBackground] = useState(0);
  const [customeDuration, setCustomeDuration] = useState(24);

  const [responseData, setResponseData] = useState([]);
  const [BackgroundImage, setBackgroundImage] = useState(
    backgroundData[CustomBackground]
  );
  const [CustomColor, setCustomColor] = useState(0);
  const [CustomeFontSize, setCustomeFontSize] = useState(16);
  const [storyList, setStoryList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(0);
  const [storyImage, setStoryImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [edit, setEdit] = useState("story");
  const [privacy, setPrivacy] = useState("Public");
  const [editing, setEditing] = useState(false);
  const [customeBackgroundImage, setCustomeBackgroundImage] = useState(false);
  const [StoryUploadSucccessful, setStoryUploadSucccessful] = useState(false);
  const [responseDraftData, setResponseDraftData] = useState([]);
  const [BackgroundColor, setBackgroundColor] = useState({
    r: 105,
    g: 205,
    b: 205,
    a: 1,
  });
  const [backgroundColorBool, setBackgroundColorBool] = useState(false);
  const [resizeState, setResizeState] = useState({
    width: 200,
    height: 200,
  });

  // Selected Action
  const [colorAction, setColorAction] = useState("salmon");
  const [reducerColor, setReducer] = useState({ color: "  " });
  const [textPositionX, setTextPositionX] = useState(-20);
  const [textPositionY, setTextPositionY] = useState(-20);
  const [textPositiondelX, setTextPositiondelX] = useState(740);
  const [textPositiondelY, setTextPositiondelY] = useState(860);
  const [value, setValue] = useState(0);

  // Deleted Action

  // full state management are bind here
  const [singleStory, setSingleStory] = useState({
    color: colorData[CustomColor],
    backgroundImageBool: false,
    backgroundColorBool: true,
    BackgroundColor,
    BackgroundImage,
    // background: backgroundColorBool ? BackgroundColor : BackgroundImage,
    background: BackgroundImage,
    customeBackgroundImage,
    // textPosition: { X: -20, Y: -20, DelX: 740, DelY: 840 },
    fontSize: CustomeFontSize,
    fontFamily: CustomFont,
    text: AddText,
    numberIndex: 1,
  });

  let { storyId, storyImageId } = useParams();
  const goToPreviousPath = () => {
    setStoryUploadSucccessful(false);
    history.push("/newsfeed");
  };

  const CancelHandler = () => {
    goToPreviousPath();
  };

  const setAddTextHandler = (e) => {
    setAddText(e.target.value);
    setSingleStory({
      ...singleStory,
      text: e.target.value,
    });
  };

  const onResize = (event, { element, size, handle }) => {
    setResizeState({ width: size.width, height: size.height });
  };
  useEffect(() => {
    // console.log("from useEffect singleStory :>> ", singleStory);
    console.log(
      "from useEffect customeBackgroundImage :>> ",
      customeBackgroundImage
    );
    // setSingleStory({
    //   ...singleStory,
    //   background: BackgroundColor,
    // });

    // form data controller use effect
    const body = new FormData();
    body.append("file", storyImage);

    // console.log("storyList :>> ", storyList);
    setBackgroundColorBool(singleStory?.backgroundColorBool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storyList,
    singleStory,
    CustomColor,
    backgroundColorBool,
    BackgroundColor,
    CustomBackground,
    CustomeFontSize,
    AddText,
    customeBackgroundImage,
  ]);

  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0].name);
  };

  function loadNewImage(file, name) {
    setNewImage(file);
    setEdit(name);
    setCustomeBackgroundImage(true);
    setBackgroundImage(file.name);
  }
  console.log("setNewImage", newImage);

  function loadImgAvatar() {
    if (BackgroundImage) {
      return URL.createObjectURL(BackgroundImage);
    } else {
      return URL.createObjectURL(BackgroundImage);
    }
  }
  var totalData;
  // save full story
  function onSave() {
    //  collect all draft stories here first
    setStoryUploadSucccessful(true);
    const bodyData = {
      saved: "save",
    };

    axios
      .get(`${BACKEND_URL}/stories/${storyImageId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        // console.log("story data ", res.data.Story);
        setResponseDraftData(res.data.Story);
        // totalData = res.data.Story.length;
        console.log("total data ", totalData);
        console.log("total data ", typeof totalData);
        res.data.Story.map((singleStory) => {
          if (singleStory.saved === "draft") {
            console.log("drafted data", singleStory._id);
            axios
              .put(`${BACKEND_URL}/stories/${singleStory._id}`, bodyData, {
                headers: userHeader(),
              })
              .then(({ data }) => {
                console.log("responced data WITHOPUT CUSTOME IMAGE ", data);
              })
              .catch((err) => {
                setEditing(false);
                throw err;
              });
          }
        });
      })
      .catch((err) => console.error(err));

    // drafted data come and console herer
    setEditing(true);

    setTimeout(() => {
      goToPreviousPath();
    }, 500);
  }
  // console.log("responseDraftData1", responseDraftData);

  // save story as a draft
  const onNext = () => {
    setValue(value + 1);

    const body = new FormData();
    body.append(edit, newImage);
    body.append("date", new Date().toISOString());
    body.append("fontSize", singleStory.fontSize);
    body.append("text", singleStory.text);
    body.append("title", singleStory.text);
    body.append("color", singleStory.color);
    body.append("fontFamily", singleStory.fontFamily);
    body.append("textPositionX", textPositionX);
    body.append("textPositionY", textPositionY);
    body.append("textPositiondelX", textPositiondelX);
    body.append("textPositiondelY", textPositiondelY);
    body.append("privacy", privacy);
    body.append("saved", "draft");
    body.append("duration", customeDuration);
    body.append("background", singleStory.background);
    body.append("backgroundImageBool", singleStory.backgroundImageBool);
    body.append("backgroundColorBool", singleStory.backgroundColorBool);
    body.append("BackgroundColor", singleStory.BackgroundColor);
    body.append("BackgroundImage", singleStory.BackgroundImage);
    body.append("customeBackgroundImage", singleStory.customeBackgroundImage);
    body.append("username", auth.user.username);

    const bodyData = {
      title: singleStory.text,
      fontSize: singleStory.fontSize,
      privacy: privacy,
      color: singleStory.color,
      fontFamily: singleStory.fontFamily,
      isBackgroundImage: singleStory.backgroundImageBool,
      isBackgroundColor: singleStory.backgroundColorBool,
      background: singleStory.background,
      textPositionX: textPositionX,
      textPositionY: textPositionY,
      textPositiondelX: textPositiondelX,
      textPositiondelY: textPositiondelY,
      saved: "draft",
      duration: customeDuration,
    };

    setEditing(true);
    {
      newImage === null
        ? axios
            .post(`${BACKEND_URL}/stories/addStory/${storyImageId}`, bodyData, {
              headers: userHeader(),
            })
            .then(({ data }) => {
              console.log("responced data WITHOPUT CUSTOME IMAGE ", data);
            })
            .catch((err) => {
              setEditing(false);
              throw err;
            })
        : axios
            .post(`${BACKEND_URL}/profile/storyphoto/${edit}`, body, {
              headers: userHeader(),
            })
            .then(({ data }) => {
              console.log("responced data come form post return", data);
            })
            .catch((err) => {
              setEditing(false);
              throw err;
            });
    }
    setAddText("");
    setSingleStory({
      ...singleStory,
      text: "",
    });
    setCustomeFontSize(16);
  };

  useEffect(() => {
    console.log("customeDuration", customeDuration);
  }, [
    CustomColor,
    AddText,
    CustomFont,
    CustomBackground,
    responseData,
    value,
    storyList,
    responseData,
    singleStory,
    newImage,
    // onNext,
    customeDuration,
    CustomeFontSize,
  ]);
  return (
    <div>
      <Grid container>
        <Grid xs={3} className="storyAddDiv">
          {/* story header */}
          <div className="storyAddHeader">
            <CancelModal goToPreviousPath={goToPreviousPath} />

            <div className="privacy-option">
              <StorySettingAction
                privacy={privacy}
                setPrivacy={setPrivacy}
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
              />
            </div>
          </div>

          {/* //text area  */}
          <div className="text-area">
            <textarea
              onChange={(e) => {
                setAddTextHandler(e);
              }}
              placeholder=" Start Typing"
              className="customeInput"
              type="text"
              value={AddText}
            />
          </div>

          {/* font size component  */}
          <div className="font-size-section">
            <div className="font-size-container">
              {" "}
              <p className="font-txt">Font Size</p>
              <FontSlider
                CustomeFontSize={CustomeFontSize}
                setSingleStory={setSingleStory}
                singleStory={singleStory}
                setCustomBackground={setCustomBackground}
                setCustomeFontSize={setCustomeFontSize}
              />
            </div>
          </div>

          {/* font family  */}
          <div className="font-family-section">
            <div className="font-family--container">
              <select
                onChange={(e) => setCustomFont(e.target.value)}
                // style={{
                //   width: "100%",
                //   border: "none",
                //   padding: "10px",
                //   height: "10%",
                // }}
                className="font-family-select"
                id="Fonts">
                <option value="system-ui">System-UI</option>
                <option value="monospace">Monospace</option>
                <option value="Roboto">Roboto</option>
                <option value="Lato">Lato</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Oswald">Oswald</option>
                <option value="Raleway">Raleway</option>
                <option value="PT Sans">PT Sans</option>
                <option value="Merriweather">Merriweather</option>
                <option value="Nunito Sans">Nunito Sans</option>
                <option value="Prompt">Prompt</option>
                <option value="Abhaya Libre">Abhaya Libre</option>
                <option value="Alegreya">Alegreya</option>
                <option value="Aleo">Aleo</option>
                <option value="Arapey">Arapey</option>
                <option value="Asap Condensed">Asap Condensed</option>
                <option value="Assistant">Assistant</option>
                <option value="Barlow">Barlow</option>
                <option value="Bitter">Bitter</option>
                <option value="Poppins">Poppins</option>
                <option value="Caladea">Caladea</option>
                <option value="Rokkitt">Rokkitt</option>
                <option value="Enriqueta">Enriqueta</option>
                <option value="Bebas Neue">Bebas Neue</option>
                <option value="inherit">Inherit</option>
              </select>
            </div>
          </div>

          {/* background  */}
          <div className="customebackground-section">
            <p className="bg-txt">Background Image</p>
            <div style={{ marginTop: "5px" }}>
              <Grid container>
                {backgroundData.map((singleBackground, index) => (
                  <p
                    style={{
                      cursor: "pointer",
                      margin: "4px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundImage: `url(${singleBackground} )`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      border:
                        !customeBackgroundImage &&
                        CustomBackground === index &&
                        "1px dashed #0048ba",
                    }}
                    onClick={() => {
                      setCustomeBackgroundImage(false);
                      setCustomBackground(index);
                      setNewImage(null);
                      setSingleStory({
                        ...singleStory,
                        backgroundImageBool: true,
                        backgroundColorBool: false,
                        background: backgroundData[index],
                      });
                    }}></p>
                ))}

                {/* <img src={BackgroundImage.file} alt={BackgroundImage} /> */}

                {/* here add/upload image from your pc   */}

                {/* <Upload
                  setSingleStory={setSingleStory}
                  singleStory={singleStory}
                  loadNewImage={loadNewImage}
                  fileInput={fileInput}
                /> */}

                {/* <Grid>
                  <div
                    onClick={() =>
                      setSingleStory({
                        ...singleStory,
                        background: BackgroundColor,
                        backgroundColorBool: true,
                      })
                    }
                  >
                    <BackgroundPicker
                      setSingleStory={setSingleStory}
                      BackgroundColor={BackgroundColor}
                      singleStory={singleStory}
                      setCustomBackground={setCustomBackground}
                      color={BackgroundColor}
                      setColor={setBackgroundColor}
                    />
                  </div>
                </Grid> */}

                <Grid>
                  {!customeBackgroundImage ? (
                    <HoverOver title="Photo">
                      <div
                        className="AddImage "
                        style={{
                          border:
                            customeBackgroundImage && "1px dashed #0048ba",
                        }}>
                        <VscAdd onClick={() => handleClick()} />
                        <div style={{ display: "none" }}>
                          <input type="file" />
                        </div>
                      </div>
                    </HoverOver>
                  ) : (
                    <HoverOver title="Replace Photo">
                      <div
                        className="AddImage "
                        style={{
                          border:
                            customeBackgroundImage && "1px dashed #0048ba",
                        }}>
                        <IoCopyOutline onClick={() => handleClick()} />
                        <div
                          className="borderR "
                          style={{
                            border:
                              customeBackgroundImage && "1px dashed #0048ba",
                            display: "none",
                          }}>
                          <input type="file" />
                        </div>
                      </div>
                    </HoverOver>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>

          {/* text color  */}
          <div className="text-color-section">
            <p style={{ textAlign: "center", fontSize: "18px" }}>Text Color </p>

            <div className="text-color-container">
              <div className="default-text-color">
                {colorData.map((singleColor, index) => (
                  <div className="single-text-color-box">
                    <p
                      className="txt-color-svg4"
                      style={{
                        color: singleColor,
                      }}
                      onClick={() => {
                        setCustomColor(index);
                        setSingleStory({
                          ...singleStory,
                          color: colorData[index],
                        });
                        // console.log( "CustomColor from color change handler", index);
                      }}>
                      {" "}
                      <BiFontColor />{" "}
                    </p>

                    <p
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                      }}>
                      {singleColor}
                    </p>
                  </div>
                ))}

                <span className="text-color-picker">
                  <ColorPicker
                    setCustomColor={setCustomColor}
                    setSingleStory={setSingleStory}
                    BackgroundColor={BackgroundColor}
                    singleStory={singleStory}
                    setCustomBackground={setCustomBackground}
                    color={BackgroundColor}
                    setColor={setBackgroundColor}
                  />
                  <p
                    style={{
                      // marginTop: "3px",
                      fontSize: "15px",
                      textAlign: "center",
                    }}>
                    Choice
                  </p>
                </span>
              </div>
            </div>
          </div>

          {/* story stay duration  */}
          <div
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   display: "flex",
            //   padding: "0px 20px",
            //   maxwidth: "150px",
            // }}
            className="story-duration-section ">
            <div className="Selection">
              <select
                onChange={(e) => setCustomeDuration(e.target.value)}
                name="duration"
                id="duration">
                {/* <option value="">Section Duration</option> */}
                <option value="24">24 Hour</option>
                <option value="48">48 Hour</option>
                <option value="72">72 Hour</option>
              </select>
              <br />
            </div>
          </div>

          <div
            className="stroy-preview-section"
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   padding: "0px 20px",
            //   overflow: "hidden",
            //   marginTop: "5px",
            //   width: "100%",
            // }}
          >
            <div
              className="story-preview-container"
              // style={{
              //   overflowX: "scroll",
              //   marginTop: "20px",
              //   width: "100%",
              // }}
            >
              <AddedStoriesPreview
                value={value}
                setValue={setValue}
                responseData={responseData}
                setResponseData={setResponseData}
                storyImageId={storyImageId}
                storyList={storyList}
                username={username}
              />
            </div>
          </div>

          {/* share button */}
          <div
            style={{ backgroundColor: "#e4e4e4" }}
            className="customebackground">
            <button
              type="button"
              disabled={!AddText || storyList.length === 0}
              className="customebackground submitButton"
              style={{
                width: "100%",
                backgroundColor: AddText !== "" ? "#0048ba " : "#888",
                color: "white",
                margin: "5px auto 0px",
                padding: "0px 20px",
              }}>
              <p
                onClick={onSave}
                // onClick={onNext}
                disabled
                style={{
                  textAlign: "center",
                  display: StoryUploadSucccessful ? "flex" : "inline-block",
                  justifyContent: "center",
                  padding: "20px 0px",
                }}>
                <span style={{ padding: "0px 20px" }}> Share to story</span>

                {StoryUploadSucccessful ? (
                  <CircularIndeterminate style={{ marginLeft: "20px" }} />
                ) : (
                  ""
                )}
              </p>
            </button>
            {/* <button
              type="button"
              disabled={!AddText || storyList.length === 0}
              className="customebackground submitButton"
              style={{
                width: "100%",
                backgroundColor:
                  AddText || storyList.length > 0 ? "#0048ba " : "#888",
                color: "white",
                margin: "5px auto 0px",
                padding: "0px 20px",
              }}
            >
              <p
                onClick={onSave}
                disabled
                style={{ textAlign: "center", padding: "20px 0px" }}
              >
                Share to story
              </p>
            </button> */}
          </div>
        </Grid>

        <Grid xs={9} className="storyPreviewDiv">
          <Preview
            setTextPositionX={setTextPositionX}
            setTextPositionY={setTextPositionY}
            setTextPositiondelX={setTextPositiondelX}
            setTextPositiondelY={setTextPositiondelY}
            textPositionX={textPositionX}
            textPositionY={textPositionY}
            textPositiondelX={textPositiondelX}
            textPositiondelY={textPositiondelY}
            onNext={onNext}
            image5={image5}
            singleStory={singleStory}
            setSingleStory={setSingleStory}
            color={BackgroundColor}
            setStoryList={setStoryList}
            storyList={storyList}
            backgroundData={backgroundData}
            CustomBackground={CustomBackground}
            CustomFont={CustomFont}
            CustomeFontSize={CustomeFontSize}
            colorData={colorData}
            CustomColor={CustomColor}
            setCustomColor={setCustomColor}
            AddText={AddText}
            setAddText={setAddText}
            setCustomeFontSize={setCustomeFontSize}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect((store) => ({ auth: store.auth }))(withRouter(StoryAdd));

// const ImageLayer = () => {
//   const datas = [
//     {
//       imageId: "asdasdasdasdaosdjkoajsd",
//       imageType: "image/jpeg",
//       date: new Date().toISOString(),
//       name: "xps/jpeg",
//       type: "story",
//     },
//     {
//       imageId: "asdasdasdasdaosdjkoajsd",
//       imageType: "image/jpeg",
//       date: new Date().toISOString(),
//       name: "xps/jpeg",
//       type: "story",
//     },
//     {
//       imageId: "asdasdasdasdaosdjkoajsd",
//       imageType: "image/jpeg",
//       date: new Date().toISOString(),
//       name: "xps/jpeg",
//       type: "story",
//     },
//     {
//       imageId: "asdasdasdasdaosdjkoajsd",
//       imageType: "image/jpeg",
//       date: new Date().toISOString(),
//       name: "xps/jpeg",
//       type: "story",
//     },
//     {
//       imageId: "asdasdasdasdaosdjkoajsd",
//       imageType: "image/jpeg",
//       date: new Date().toISOString(),
//       name: "xps/jpeg",
//       type: "story",
//     },
//   ];

//   const [customeData, setCustomeData] = useState();

//   return (
//     <div>
//       <p>This is a dummy section for make app simple as faster as it was </p>
//       {customeData.map((singleSection) => (
//         <div>{singleSection}</div>
//       ))}

//       {datas.forEach(() => {})}
//       {datas.forEach((data) => {
//         console.log("Entered");
//         return <p>{data} </p>;
//       })}
//     </div>
//   );
// };
