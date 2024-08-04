// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { parse } from "query-string";
import axios from "axios";

import { getJobss, getSinglePost } from "../../../sockets/emit";
import { BACKEND_URL } from "../../../shared/constants/Variables";
import { userHeader } from "../../../shared/functions/Token";
import { Post, NewPost } from "../../../components";
import { NoItem } from "../style";
import { Grid } from "@material-ui/core";
import AdsComponent from "../AdsComponent/AdsComponent";

import PollComp from "../Poll.js";

import "./style.scss";
import store from "../../../store";
import PostSkeleton from "../../../skeleton/ProfileSearch/PostSkeleton";

function Jobs({
  match: { url },
  username,
  isMe,
  data: { posts, tloading, ttotal },
  dispatch,
  location: { search },
}) {
  const [progressValue, setProgressValue] = useState({});

  const [loggedusername, setLoggedusername] = useState(
    store.getState().auth.user.username
  );

  if (tloading) {
    // document.getElementsByClassName("mainContent")[0].style.overflow = "hidden";
  }

  document.title = "Jobs";
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const { post } = parse(search);
    if (post) {
      getSinglePost(post);
    } else {
      dispatch({ type: "Post Loading" });

      getJobss(username, offset);
    }
    dispatch({ type: "SET_POST_DEFAULT" });
  }, [username, offset]);

  function onPost(formData) {
    return axios.post(`${BACKEND_URL}/posts/post`, formData, {
      headers: { ...userHeader(), "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => {
        setProgressValue(p);
      },
    });
  }


  // Detecting users post
  const allUserPost = [];
  posts.filter((item) => allUserPost.push(item));


  // Scroll issue fix area start
  window.onscroll = function () {
    if (window.scrollY === 0 && offset !== 0 && posts[0]) {
      dispatch({ type: "Post Loading" });
      setOffset(offset - 25);
    }

    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight
    ) {
      if (posts.length < 25 || ttotal === offset + 25) {
        // added hidden with maincontent for stop scrolling
        // const mainContent = document.getElementsByClassName('mainContent')[0].style.overflow = "hidden";
      } else {
        //check if loading or not ,
        dispatch({ type: "Post Loading" });
        setOffset(offset + 25);

        // const mainContent = document.getElementsByClassName('mainContent')[0].style.overflow = "inherit";
      }
    }
  };
  // Scroll issue fix area end

  return (
    <div className="" style={{ padding: "7px" }}>
      <Route
        path={`${url}/poll`}
        component={() => (
          // <Suspense fallback={<Spinner height={60} />}>
          <Suspense>
            <PollComp />
          </Suspense>
        )}
      />

      <Grid container>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          {isMe() && <NewPost submitPost={onPost} progress={progressValue} />}

          {allUserPost.map((post) => (
            <>
              <Post loggedInUsername={loggedusername} key={post.id} {...post} />
            </>
          ))}

          {tloading && (
            <div>
              {Array.apply(null, new Array(10))?.map((item, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          )}

          {!tloading &&
            posts.filter((item) => item.user.username === username).length <
              1 && <NoItem>{/* <span>Post Loading...</span>   */}</NoItem>}
        </Grid>
        <Grid item lg={3} md={3} className="timeline-ads-compoments">
          {/* {isMe() && <AdsComponent />} */}
          <AdsComponent posts={posts} />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect((store) => ({ data: store.posts }))(
  withRouter(Jobs)
);
