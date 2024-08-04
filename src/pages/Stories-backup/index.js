import React, { useEffect, useState } from "react";
// import React, { useEffect, useState, createRef } from "react";
import { connect } from "react-redux";

// import { useScreenshot } from "use-react-screenshot";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import { AiOutlineSend } from "react-icons/ai";
import angry from "../../../src/assets/reactions/gif/Angry.gif";
import confussed from "../../../src/assets/reactions/gif/confused.gif";
import cool from "../../../src/assets/reactions/gif/cool.gif";
import Like from "../../../src/assets/reactions/gif/Like.gif";
import hearteyes from "../../../src/assets/reactions/gif/hearteyes.gif";
import Sad from "../../../src/assets/reactions/gif/Sad.gif";
import { BACKEND_URL, CLOUD_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";
import UserStoryPreview from "./StoryPreview/UserStoryPreview";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getAllStory } from "../../store/Story/action";

import DeleteModal from "../../components/Story-backup/deleteModal";

// reaction data set
const reactionArray = [Like, confussed, hearteyes, angry, Sad, cool];

const StoryDetails = ({
  auth: {
    loggingIn,
    user: { username, id },
    loggedIn,
  },
}) => {
  let history = useHistory();
  let { storyId } = useParams();

  // const ref = createRef(null);
  // const [width, setWidth] = useState(1000);
  // const [image, takeScreenShot] = useScreenshot();

  // const getImage = () => takeScreenShot(ref.current);

  const [allStoryByUser, setAllStoryByUser] = useState(null);
  const [StoryDuration, setStoryDuration] = useState(20);
  const [allStoryUser, setAllStoryUser] = useState([]);
  const [existedUser, setExistedUser] = useState(storyId);
  const [value, setValue] = useState(1);
  const [userInfo, setUserInfo] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [comment, setComment] = useState("");

  // get data from redux storyReducer
  const storyData = useSelector((state) => state.storyReducer);

  useEffect(() => {
    setAllStoryByUser(storyData);
  }, [storyData]);

  const dispatch = useDispatch();

  // cunstome function
  const goToPreviousPath = () => {
    history.push(`/newsfeed`);
  };

  // ChangeStoryHandler;
  const ChangeStoryHandler = (e) => {
    e.preventDefault();
    value === allStoryUser.length
      ? history.push(`/me/${storyId}`)
      : setValue(value + 1);
    setExistedUser(allStoryUser[value]);
    value === allStoryUser.length
      ? history.push(`/me/${storyId}`)
      : history.push(`/story/${existedUser}`);

    axios
      .get(`${BACKEND_URL}/stories/userinfo/${existedUser}`, {
        headers: userHeader(),
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  };

  // BeforeStoryHandler;
  const BeforeStoryHandler = (e) => {
    e.preventDefault();
    // alert("clicke");
    value === allStoryUser.length
      ? history.push(`/me/${storyId}`)
      : setValue(value - 1);
    setExistedUser(allStoryUser[value]);
    value === -1
      ? history.push(`/me/${storyId}`)
      : history.push(`/story/${existedUser}`);
    axios
      .get(`${BACKEND_URL}/stories/userinfo/${existedUser}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("User  data", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  };
  console.log("userInfo", userInfo.avatar);

  // deleteHandler;
  const deleteHandler = (id) => {
    // alert("deleteHandler", id);
  };

  const commentHandler = (id) => {
    // eikhane backend add kora hobe
    setComment("");
  };

  const reactionHandler = (reaction) => {
    console.log("Reaction selected", reaction);
  };

  const setSelectedPage = (index) => {
    setUserIndex(index.index);
  };
  console.log("setSelectedPage", userIndex);

  // console.log("Story user id", storyId);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/${storyId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("Rersponses data", res.data);
        // setAllStoryByUser(res.data);
        dispatch(getAllStory(res.data));
      })
      .catch((err) => console.error(err));
  }, [storyId, existedUser]);

  // console.log("Story user id", storyId);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/userinfo/${storyId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("User  data", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));

    // Delete Story
    // socket.emit("delete_story", () => {
    //   console.log("called Socket");
    //   // store.dispatch(deleteStorySocket());
    // });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/allstory/${storyId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("UniqueUser", res.data.UniqueUser);
        setAllStoryUser(res.data.UniqueUser);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (StoryDuration !== 100) {
      setInterval(() => {
        setStoryDuration(StoryDuration + 10);
      }, 1000 * 60 * 60);
    } else {
      setStoryDuration(0);
    }
  }, [StoryDuration]);

  console.log("comment", comment);
  useEffect(() => {}, [comment]);

  return (
    <div className="StoryDetrails">
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "4.6%",
          justifyContent: "center",
          height: "50px",
          borderRadius: "50%",
        }}
      >
        {/* <div style={{ position: "relative", width: 60, height: 60 }}>
          <CircularProgressbar
            styles={buildStyles({
              textColor: "#0048ba",
              trailColor: "#d6d6d6",
              backgroundColor: "#0048ba",
              background: {
                fill: "#0048ba",
              },
            })}
            value={StoryDuration}
          />
          <img
            style={{
              position: "absolute",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "1px solid #e4e4e4",
              transform: "translate(-110%, 10%)",
            }}
            src={`${CLOUD_URL}${userInfo.avatar}`}
          />
        </div> */}
        {/* <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "3px solid red",
                    }}
                    src="https://images.unsplash.com/photo-1633766306924-90e6eccb8cde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80"
                  /> */}

        {/* <div className="userInfo">
          <p>
            <span style={{ letterSpacing: "2px" }}>{userInfo?.name}</span>
          </p>
          <p>Follower(232)</p>
          <p>
            Work as a {userInfo.employer}({userInfo.working})
          </p>
        </div> */}
      </div>
      <div
        className="CrossBtn"
        onClick={goToPreviousPath}
        style={{
          padding: "20px",
          width: "30px",
          height: "30px",
          // marginLeft: "5%",
          // marginTop: "5%",
          border: "none",
          borderRadius: "50%",
          backgroundColor: "white",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ClearIcon
          style={{
            color: "black",
            fontSize: "30px",
            alignSelf: "center",
          }}
        />
      </div>
      <Grid container>
        {/* <Grid xs={3}></Grid> */}
        <Grid xs={12}>
          <div
            // ref={ref}
            style={{
              marginTop: "3%",
              height: "80vh",
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "5px",
              display: "flex",
              // position: "relative",
            }}
          >
            <Grid container>
              <Grid xs={2} style={{ alignSelf: "center" }}>
                {/* important note don't remove it */}
                {/* <div
                  className="beforeIcon"
                  style={{
                    width: "50px",
                    height: "50px",
                    // marginLeft: "5%",
                    // marginTop: "5%",
                    border: "1px solid #0048ba",
                    borderRadius: "50%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 9999999,
                  }}
                >


                  <NavigateBeforeIcon
                    onClick={(e) => BeforeStoryHandler(e)}
                    style={{
                      fontSize: "30px",
                      alignSelf: "center",
                    }}
                  />



                </div> */}
              </Grid>
              <Grid xs={8}>
                {/* <Grid xs={2} style={{ alignSelf: "center" }}> */}
                <div
                  className="beforeIcon"
                  style={{
                    padding: "20px",
                    width: "50px",
                    height: "50px",
                    // marginLeft: "5%",
                    // marginTop: "5%",
                    border: "none",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* <NavigateBeforeIcon
                    style={{
                      color: "black",
                      fontSize: "60px",
                      alignSelf: "center",
                    }}
                  /> */}
                </div>
                {/* </Grid> */}

                <Carousel onChange={setSelectedPage} itemsToShow={1}>
                  {/* {allStoryByUser?.Story.map((singleStory, index) => ( */}

                  {
                    allStoryByUser?.Story?.map((singleStory, index) => (
                      <Grid
                        xs={8}
                        style={{
                          color: singleStory.color,
                          fontSize: singleStory.fontSize,
                          width: "600px!important",
                          // marginTop: "30px",
                        }}
                      >
                        {/* <div className="StoryFall">
                          <img
                            style={{
                              width: "80px",
                              position: "absolute",
                              top: "10%",
                              left: "10%",
                              zIndex: "9999999999",
                            }}
                            src={confussed}
                          />
                        </div> */}
                        <div
                          style={{
                            height: "75vh",
                            width: "600px!important",
                            // marginTop: "20px",

                            //   backgroundColor: `rgba(${color?.color.r}, ${color?.color.g}, ${color?.color.b}, ${color?.color.a})!important`,
                            // backgroundColor: `rgba(${singleStory.background.color?.r}, ${singleStory.background.color?.g}, ${singleStory.background.color?.b}, ${singleStory.background.color?.a})!important`,

                            // backgroundImage: `url(${singleStory.background})`,

                            backgroundImage: allStoryByUser?.uploadedImage[index]
                              ?.image
                              ? "url(" +
                                `http://127.0.0.1:2300${allStoryByUser?.uploadedImage[index]?.image}&userName=${allStoryByUser?.uploadedImage[index]?.username}` +
                                ")"
                              : "url(" +
                                `${allStoryByUser?.uploadedImage[index]?.background}` +
                                ")",

                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "5px",
                            display: "flex",
                          }}
                        >
                          {/* <Grid container> */}

                          {/* <Grid xs={4} style={{width:'100%', border:'1px solid green'}}></Grid> */}
                          {/* <div style={{width:'25%', border:'1px solid red'}}></div>
                        <div style={{width:'25%', border:'1px solid red'}}></div> */}
                          {/* <Grid xs={4}> */}
                          <div className="setting">
                            <p>
                              {singleStory.user._id === id ? (
                                <DeleteModal storyId={singleStory} />
                              ) : (
                                ""
                              )}

                              <span
                                style={{
                                  position: "absolute",
                                  transform: `translate(${singleStory.textPositiondelX}px, ${singleStory.textPositiondelY}px)`,
                                }}
                              >
                                {singleStory.title}
                              </span>

                              {/* <MdDeleteSweep
                                onClick={() => deleteHandler()}
                                style={{ color: "white" }}
                                className="settingHover"
                              /> */}
                            </p>
                          </div>
                          {/* <div className="Privacy">
                            <p>
                              <RiDownload2Fill style={{ color: "white" }} />
                            </p>
                          </div> */}

                          <div
                            style={{
                              height: "100vh",
                              borderRadius: "5px",
                              display: "flex",
                              width: "100%",
                              backgroundColor: "#58555557",
                              justifyContent: "center",
                              alignSelf: "center",
                            }}
                          >
                            <div
                              className="imagePreviewDiv"
                              style={{
                                backgroundImage: allStoryByUser?.uploadedImage[
                                  index
                                ]?.image
                                  ? "url(" +
                                    `http://127.0.0.1:2300${allStoryByUser?.uploadedImage[index]?.image}&userName=${allStoryByUser?.uploadedImage[index]?.username}` +
                                    ")"
                                  : "url(" +
                                    `${allStoryByUser?.uploadedImage[index]?.background}` +
                                    ")",

                                height: "100%",
                                width: "600px!important",
                                padding: "20px",

                                backgroundPosition: "center",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",

                                display: "inline-block",
                                overflow: "hidden",
                                width: "100%",
                              }}
                            >
                              <UserStoryPreview
                                textPositionX={singleStory?.textPositionX}
                                textPositionY={singleStory?.textPositionY}
                                textPositiondelX={singleStory?.textPositiondelX}
                                textPositiondelY={singleStory?.textPositiondelY}
                                singleStory={singleStory}
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="Privacy">
                          <p>
                            <RiDownload2Fill style={{ color: "white" }} />
                          </p>
                        </div>
                        <div className="setting">
                          <p>
                            <MdDeleteSweep
                              onClick={() => deleteHandler()}
                              style={{ color: "white" }}
                              className="settingHover"
                            />
                          </p>
                        </div> */}
                      </Grid>
                  ))}
                </Carousel>

                <div style={{ display: "none" }} className="commentingSection">
                  {/* user er details name id content about details will get from{" "}
                  {allStoryByUser?.Story[userIndex].user._id} this one  */}
                  {/* <p>Story info{allStoryByUser?.Story[userIndex]._id}</p>
                  <p>User info{allStoryByUser?.Story[userIndex].user._id}</p> */}
                  {/* <div className="CommentInput"> */}

                  {/* </div> */}
                  <div
                    style={{
                      width: comment !== "" ? "0%" : "54%",
                      display: comment !== "" ? "none" : "inline",
                      alignSelf: "center",
                    }}
                    className="ReactionInput"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Grid container>
                        {reactionArray.map((reaction) => (
                          <Grid
                            onClick={() => {
                              reactionHandler(reaction);
                            }}
                            className="reactionCol"
                            lg={2}
                          >
                            <img src={reaction} />
                          </Grid>
                        ))}

                        {/* <Grid className="reactionCol" lg={2}>
                          <img src={confussed} />
                        </Grid>
                        <Grid className="reactionCol" lg={2}>
                          <img src={hearteyes} />
                        </Grid>
                        <Grid className="reactionCol" lg={2}>
                          <img src={angry} />
                        </Grid>
                        <Grid className="reactionCol" lg={2}>
                          <img src={Sad} />
                        </Grid>
                        <Grid className="reactionCol" lg={2}>
                          <img src={cool} />
                        </Grid> */}
                      </Grid>
                    </div>
                  </div>
                  <div
                    className="CommentInput"
                    style={{
                      width: comment !== "" ? "100%" : "100%",
                      display: "flex",
                      // transition: comment !== "" ? "none" : "0.1s ease-in-out",
                    }}
                  >
                    <input
                      style={
                        {
                          // transition: "0.9s ease-in-out",
                        }
                      }
                      placeholder="Add Comment"
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      value={comment}
                      type="text"
                    />
                    <p style={{ marginRight: "10px" }} className="CommentReply">
                      <AiOutlineSend onClick={commentHandler} />
                    </p>
                  </div>
                </div>
              </Grid>

              <Grid xs={2} style={{ alignSelf: "center" }}>
                {/* <Link to={`/story/${setExistedUser}`}> */}

                {/* <div
                  onClick={(e) => ChangeStoryHandler(e)}
                  className="afterIcon "
                  style={{
                    padding: "10px",
                    width: "50px",
                    height: "50px",
                    border: "1px solid #0048ba",
                    borderRadius: "50%",

                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ChevronRightIcon
                    style={{
                      fontSize: "30px",
                      alignSelf: "center",
                    }}
                  />
                </div> */}

                {/* </Link> */}
              </Grid>
            </Grid>
            {/* comment and reacrion seciton */}
          </div>
          {/* </div> */}
        </Grid>
        <Grid xs={3}>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};
export default connect((store) => ({ auth: store.auth }))(StoryDetails);
