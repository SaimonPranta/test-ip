import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import CustomeSkeleton from "../../pages/Profile/Notes/Skleton/CustomSkleton";
import dataStories from "./data";
import { HoverOver } from "../Tools";
import { connect } from "react-redux";
import { getProfile } from "../../pages/Profile/Hooks";
import { BACKEND_URL, CLOUD_URL } from "../../shared/constants/Variables";
import axios from "axios";
import { userHeader } from "../../shared/functions/Token";
import { getUserAvatar } from "../../shared/functions";

const Story = ({
  user,
  auth: {
    user: { avatar, gender, approved, banned, rejected },
    counts,
  },
}) => {
  let username = user.username;
  const { profile, working, error, setProfile } = getProfile(username);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [startPoint, setStartPoint] = useState(0);
  const [LoginInUser, setLoginInUser] = useState(profile?.id);
  const [endPoint, setEndPoint] = useState(5);
  const [getAllUser, setGetAllUser] = useState([]);
  const [getAllUserStory, setGetAllUserStory] = useState([]);

  const ThisTime = new Date();

  // Load Avatar from backend
  const LoadUserAvatar = function (userId = "61600b1e352c91dd21492b47") {
    let avatarURL;
    axios
      .get(`${BACKEND_URL}/stories/profile/${userId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        avatarURL = `http://127.0.0.1:2300${res.data.avatar}`;
      })
      .catch((err) => console.error(err));

    return avatarURL;
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/allstory/${profile?.id}`, {
        headers: userHeader(),
      })
      .then((res) => {
        setGetAllUser(res.data.allStoriesByUserID);
      })
      .catch((err) => console.error(err));
  }, [startPoint, endPoint, LoginInUser, profile]);

  return (
    <div className={styles.items}>
      <Link style={{ color: "black" }} to={`/StoryAdd/${profile?.id}`}>
        <div className={styles.addStory}>
          <div
            className={styles.addStoryIcon}
            style={{
              position: "relative",
              height: "100%",
              backgroundImage:
                "url(" + getUserAvatar(avatar, gender, username) + ")",
              // backgroundImage:
              //   "url(" +
              //   "https://images.unsplash.com/photo-1629824230786-1c212b964863?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" +
              //   ")",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              borderRadius: "10px",
            }}>
            <div
              className={styles.circle}
              style={{
                backgroundColor: "#fff",
                position: "absolute",
                borderBottomRightRadius: "9.5px",
                borderBottomLeftRadius: "9.5px",
                width: "100%",
                bottom: "0%",
                height: "30%",
                alignContent: "center",
                display: "inline-grid",
                textAlign: "center",
                color: "#00000",
                textAlign: "center",
              }}>
              <b className={styles.play}>
                <IoMdAdd
                  // className={styles.circleWrapper}
                  style={{
                    position: "absolute",
                    top: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#e4e4e4",
                    border: "1px dashed #0048ba",
                    transform: " translate(-50%, -81%)",
                    fontWeight: "100px",
                    fontSize: "30px",
                    color: "#0048ba",
                  }}
                />
              </b>
            </div>
          </div>
        </div>
      </Link>

      {/* story er main showcase section  */}
      <div className={styles.StoryMainDiv}>
        {/* {dataStories.slice(startPoint, endPoint).map(function (item, i) { */}
        {getAllUser.length ? (
          getAllUser.slice(startPoint, endPoint).map(function (item, i) {
            return item.uploadedImage[0]?.background?.length ||
              item.uploadedImage[0]?.image?.length ? (
              <Link key={i} to={`/story/${item.uploadedImage[0].userID}`}>
                <div className={styles.singleStori}>
                  <div
                    className={styles.addStory}
                    style={{
                      backgroundImage: `url( ${
                        item.uploadedImage[0]?.background
                          ? item.uploadedImage[0]?.background
                          : `http://127.0.0.1:2300${item.uploadedImage[0]?.image}&userName=${item.uploadedImage[0]?.user}`
                      })`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}>
                    {/* <p>{item.uploadedImage[0]?.background}</p> */}
                    {/* <p>
                      Text:
                      <span style={{ fontSize: "6px" }}>
                        {LoadUserAvatar()}
                      </span>
                    </p> */}
                    {/* <div>
                      <img
                        className={styles.storyProfile}
                        src={LoadUserAvatar(item.uploadedImage[0]?.userID)}
                        // alt={LoadUserAvatarData(item.uploadedImage[0]?.userID)}
                      />
                    </div> */}
                    <div className={styles.storyUsername}>
                      <small>
                        {item.uploadedImage[0]?.userName.map((name) => (
                          <span>{name} </span>
                        ))}
                      </small>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                style={{ width: "100%", height: "100%" }}
                className={styles.addStory}>
                <CustomeSkeleton />
              </div>
            );
          })
        ) : (
          <div
            style={{ width: "100%", height: "100%" }}
            className={styles.addStory}>
            <CustomeSkeleton />
          </div>
        )}
      </div>
      {/* These all are for story  */}

      <div>
        {/* <div
          style={{ width: "100%", height: "100%" }}
          className={styles.addStory}
        >
          <CustomeSkeleton />
        </div> */}
      </div>

      <div className={styles.seeMore}>
        {endPoint >= getAllUser.length && (
          <div
            onClick={() => {
              setEndPoint(endPoint + 1);
              setStartPoint(startPoint + 1);
            }}
            className={styles.icon}>
            <FiArrowRight />
          </div>
        )}
      </div>

      <div className={styles.seeMorePrevious}>
        {startPoint !== 0 && (
          <div
            onClick={() => {
              // setEndPoint(endPoint - 1);
              startPoint === 0
                ? setStartPoint(0)
                : setStartPoint(startPoint - 1);
              endPoint === 5 ? setEndPoint(5) : setEndPoint(endPoint - 1);
            }}
            className={styles.icon}>
            <FiArrowLeft />
          </div>
        )}
      </div>
    </div>
  );
};

export default connect((store) => ({
  user: store.auth.user,
  auth: store.auth,
}))(Story);
