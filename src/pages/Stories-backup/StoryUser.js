import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import angry from "../../../src/assets/reactions/gif/Angry.gif";
import confussed from "../../../src/assets/reactions/gif/confused.gif";
import cool from "../../../src/assets/reactions/gif/cool.gif";
import Like from "../../../src/assets/reactions/gif/Like.gif";
import hearteyes from "../../../src/assets/reactions/gif/hearteyes.gif";
import Sad from "../../../src/assets/reactions/gif/Sad.gif";
import { BACKEND_URL, CLOUD_URL } from "../../shared/constants/Variables";
import { userHeader } from "../../shared/functions/Token";
import axios from "axios";
import { Link } from "react-router-dom";
import CustomeButton from "../../Utils/CustomeButton";
import { getUserAvatar } from "../../shared/functions";
import { connect } from "react-redux";

// reaction data set
const reactionArray = [Like, confussed, hearteyes, angry, Sad, cool];

const StoryUser = ({
  auth: {
    user: { avatar, gender, approved, banned, rejected, username },
    counts,
  },
}) => {
  let history = useHistory();
  let { userId } = useParams();
  console.log("userId single user section", userId);

  const [allStoryByUser, setAllStoryByUser] = useState();
  const [StoryDuration, setStoryDuration] = useState(20);
  const [allStoryUser, setAllStoryUser] = useState([]);
  const [existedUser, setExistedUser] = useState(userId);
  const [value, setValue] = useState(1);
  const [userInfo, setUserInfo] = useState([]);
  const [userIndex, setUserIndex] = useState(0);
  const [comment, setComment] = useState("");

  // cunstome function
  const goToPreviousPath = () => {
    history.push(`/newsfeed`);
  };

  // BeforeStoryHandler;
  const BeforeStoryHandler = (e) => {
    history.push(`/newsfeed`);
  };
  console.log("userInfo", userInfo.avatar);

  // console.log("Story user id", userId);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/userinfo/${userId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("User  data", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/stories/allstory/${userId}`, {
        headers: userHeader(),
      })
      .then((res) => {
        console.log("UniqueUser", res.data.UniqueUser);
        setAllStoryUser(res.data.UniqueUser);
      })
      .catch((err) => console.error(err));
  }, []);

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
        }}></div>
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
        }}>
        <ClearIcon
          style={{
            color: "black",
            fontSize: "30px",
            alignSelf: "center",
          }}
        />
      </div>
      <Grid container>
        <Grid xs={2}>
          <p></p>
        </Grid>
        <Grid style={{ border: "1px solid white" }} xs={8}>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid
              className="userStory"
              style={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                border: "1px solid #e4e4e4",
                borderRadius: "10px",
              }}
              xs={8}>
              <div style={{ textAlignLast: "center" }}>
                <img
                  style={{
                    borderRadius: "10px",
                    height: "60vh",
                    width: "60%",
                    border: "1px solid #e4e4e4",
                  }}
                  src={getUserAvatar(avatar, gender, username)}
                />
              </div>
              <div style={{ textAlignLast: "center" }}>
                <Link to={`/StoryAdd/${userId}`}>
                  <CustomeButton title="Create Story" />
                </Link>
              </div>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid xs={2}>
          <p></p>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect((store) => ({
  user: store.auth.user,
  auth: store.auth,
}))(StoryUser);

// export default StoryUser;
