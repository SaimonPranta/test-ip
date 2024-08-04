import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import store from "../../../../store";
import "./style.scss";

const views = [
  "timeline",
  "about",
  "friends",
  "photos",
  "audios",
  "videos",
  "groups",
  "others",
  "Jobs"
];



const UserTabs = ({ match: { url }, view, username, requests }) => {
  function isMe() {
   

    return store.getState().auth.user.username === username;
  }
  return (
    <div className="UserTabs">
      <ul>
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/timeline`}>Timeline </NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/about`}>About</NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/friends`}>Friends</NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/photos`}>Photos</NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/audios`}>Audios</NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/videos`}>Videos</NavLink>
          </li>
        {/* )} */}
        {isMe() && (
          <li>
            <NavLink to={`${url}/groups`}>Groups</NavLink>
          </li>
        )} 

        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/notes`}>Notes</NavLink>
          </li>
        {/* )} */}
        {/* {isMe() && ( */}
          <li>
            <NavLink to={`${url}/others`}>Othersssss</NavLink>
          </li>
        {/* )} */}

        {isMe() && (
          <li>
            <NavLink to={`${url}/activity`}>Activities</NavLink>
          </li>
        )}
          {/*{isMe() && (*/}
          <li>
            <NavLink to={`${url}/jobs`}>Jobs</NavLink>
          </li>
        {/*)}*/}
        {/* {isMe() && (
          <li>
            <NavLink to={`${url}/poll`}>Poll</NavLink>
          </li>
        )} */}
      </ul>
    </div>
  );
};

export default connect((store) => ({ requests: store.auth.friendrequests }))(
  withRouter(UserTabs)
);
