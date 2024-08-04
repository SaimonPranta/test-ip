import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
// import queryString from "querystring";
// fix one
import queryString from "query-string";

import axios from "axios";
import { Grid } from "@material-ui/core";

import { BACKEND_URL } from "../../shared/constants/Variables";
import { getFeeds, getSinglePost } from "../../sockets/emit";
import { authGuard, availability } from "../../shared/HOC";
import { userHeader } from "../../shared/functions/Token";
// import HotNews from "../../components/HotNews";
import { NoItem } from "../Profile/style";
import { Post } from "../../components";
import { Spinner } from "../../shared";
import Story from "../../components/Story-backup";
import AdsComponent from "../Profile/AdsComponent/AdsComponent";
// import store from "../../store";
import PostSkeleton from "../../skeleton/ProfileSearch/PostSkeleton";

function Feed({
  posts: { posts, floading, ttotal },
  location: { search },
  dispatch,
}) {
  document.title = "Newsfeed";
  const postId = queryString.parse(search)?.post;
  const [offset, setOffset] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [working, setWorking] = useState(true);
  // const [username, setUsername] = useState(store.getState().auth.user.username);
const username = useSelector(state => state?.auth?.user?.username)


  // console.log("logged in newsFeed user user name -----", store.getState().auth.user.username);
  // console.log("logged in newsFeed user user name -----", username);

  // useEffect(() => {
  //   if (!!postId) {
  //     getSinglePost(postId);
  //   } else {
  //     getFeeds(offset);
  //   }
  //   return () => {
  //     dispatch({ type: "SET_POST_DEFAULT" });
  //   };
  // }, [offset, postId]);
  // useEffect(() => {
  //   setWorking(true);
  //   axios
  //     .get(`${BACKEND_URL}/posts/news`, { headers: userHeader() })
  //     .then(({ data }) => {
  //       setUpdates(data);
  //       setWorking(false);
  //     })
  //     .catch((err) => {
  //       setWorking(false);
  //       throw err;
  //     });
  //   return () => {
  //     dispatch({ type: "SET_POST_DEFAULT" });
  //   };
  // }, []);

  // useEffect(() => {}, [window.scrollY]);

  // if (floading) {
  //   document.getElementsByClassName("mainContent")[0].style.overflow = "hidden";
  // }

  // useEffect(() => {
  //   let mount = true;

  //   if(mount) {
  //     floading ? document.getElementsByClassName('mainContent')[0].style.overflow = "hidden" : document.getElementsByClassName('mainContent')[0].style.overflow = "inherit";
  //   }
  //   return () => {
  //     mount = false;
  //   };
  // }, [floading]);

  //mount code START
  useEffect(() => {
    let mount = false;
    if (!mount) {
      if (!!postId) {
        getSinglePost(postId);
      } else {
        // const mainContent = (document.getElementsByClassName(
        //   "mainContent"
        // )[0].style.overflow = "inherit");
        dispatch({ type: "Post Loading" });
        getFeeds(offset);
      }
      dispatch({ type: "SET_POST_DEFAULT" });
    }
    return () => {
      mount = true;
    };
  }, [offset, postId]);
console.log("state ===============>", posts)
  
  // useEffect(() => {
  //   let mount = false;
  //   setWorking(true);
  //   if(!mount) {
  //     axios
  //     .get(`${BACKEND_URL}/posts/news`, { headers: userHeader() })
  //     .then(({ data }) => {
  //       setUpdates(data);
  //       setWorking(false);
  //     })
  //     .catch((err) => {
  //       setWorking(false);
  //       throw err;
  //     });
  //     dispatch({ type: "SET_POST_DEFAULT" });
  //   }
  //     return () => {
  //       mount = true
  //     }
  // }, []);
  //mount code END

  const showWhereClicked = (e) => {
    // // console.log(`you have clicked X:${e.screenX} Y:${e.screenY}`);
    // if (e.screenY <= 120) {
    //   alert("ok");
    // }
    // do stuff
  };
  console.log("state ===============>", posts)

  // Scroll issue fix area start
  window.onscroll = function () {
    // console.log(window.innerHeight + document.documentElement.scrollTop);

    if (window.scrollY === 0 && offset !== 0 && posts[0]) {
      dispatch({ type: "Post Loading" });
      setOffset(offset - 25);
      // const mainContent = (document.getElementsByClassName(
      //   "mainContent"
      // )[0].style.overflow = "inherit");
    }

    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight
    ) {
      if (posts.length < 25 || ttotal === offset + 25) {
        // added hidden with maincontent for stop scrolling
        // const mainContent = (document.getElementsByClassName(
        //   "mainContent"
        // )[0].style.overflow = "hidden");
      } else {
        dispatch({ type: "Post Loading" });
        setOffset(offset + 25);

        // const mainContent = (document.getElementsByClassName(
        //   "mainContent"
        // )[0].style.overflow = "inherit");
      }
    }
  };
  // Scroll issue fix area end

  console.log("state ===============>", posts)

  return (
    <div>
      <Grid style={{}} container>
        <Grid xs={9}>
          {/* {updates.length > 0 && !working ? (
            <HotNews updates={updates} />
            ) : (
              <>{working && <Spinner height={10} />}</>
            )} */}

          <Story></Story>

          <div className="hello">
            {posts.map((post) => (
              <Post loggedInUsername={username} key={post.id} {...post} />
            ))}
          </div>

          {/* {
            floading && (
              <div>
                {Array.apply(null, new Array(10))?.map((item, index) => (
                  <PostSkeleton key={index} />
                ))}
              </div>
            )
            // <Spinner height={30} />
          } */}

          {!floading && posts.length < 1 && (
            <NoItem>{/* <span>Post Loading...</span> */}</NoItem>
          )}
        </Grid>
        <Grid
          // style={{ position: "relative" }}
          onMouseOut={(e) => showWhereClicked(e)}
          style={{ display: "flex", justifyContent: "center" }}
          xs={3}>
          <AdsComponent posts={posts} />
        </Grid>
      </Grid>

      {/* Newsfeed ads section and news section */}
      {/* <Grid container>
        <Grid xs={9}>
          {updates.length > 0 && !working ? (
            <HotNews updated={updates} />
          ) : (
            <>{working && <Spinner height={10} />} </>
          )}
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
          )
        </Grid>
      </Grid> */}
      {/* Newsfeed ads section and news section */}

      {/* {floading && <Spinner height={30} />}
      {!floading && posts.length < 1 && (
        <NoItem>
          <span>No posts.</span>
        </NoItem>
      )}
      {false && setOffset(0)} */}
    </div>
  );
}

export default connect((store) => ({ posts: store.posts, auth: store.auth }))(
  availability(withRouter(Feed))
);
