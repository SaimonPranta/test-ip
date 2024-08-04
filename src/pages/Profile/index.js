import React, { lazy, Suspense } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";

import { checkUsername, availability, authGuard } from "../../shared/HOC";
import { Spinner } from "../../shared";
import { getProfile } from "./Hooks";
import { UserError } from "./style";
import store from "../../store";
import Cover from "./Cover";
import "./style.scss";
import PollComp from "./Poll.js";

const Timeline = lazy(() => import("./Timeline"));
const About = lazy(() => import("./About"));
const Audios = lazy(() => import("./Audios"));
const Friends = lazy(() => import("./Friends"));
const Photos = lazy(() => import("./Photos"));
const Groups = lazy(() => import("./Groups"));
const Videos = lazy(() => import("./Videos"));
const Notes = lazy(() => import("./Notes"));
const Activity = lazy(() => import("./Activity"));
const Jobs = lazy(() => import("./Jobs"));

function Profile({
  match: {
    url,
    params: { username },
  },
}) {
  const { profile, working, error, setProfile } = getProfile(username);
  document.title = profile?.name?.join(" ") || "Profile";

  function isMe() {
    return store.getState().auth.user.username === username;
  }
  function redirection() {
    let red;
    if (Object.keys(profile).length > 1) {
      red = Object.keys(profile?.view).find((i) => profile?.view[i] === true);
    }
    return red;
  }
  function onChangePrivacy(n, p) {
    setProfile({
      ...profile,
      locker: {
        ...profile.locker,
        [n]: p,
      },
    });
  }
  if (!working && !error) {
    return (
      <div>
        <Cover profile={profile} setProfile={setProfile} isMe={isMe} />
        <div className="UserContent">
          <Route exact path={`${url}`}>
            <Redirect to={`${url}/${redirection()}`} />
          </Route>

          {profile.view["timeline"] && (
            <Route
              exact
              path={`${url}/timeline`}
              component={() => (
                // <Suspense fallback={<Spinner height={60} />}>
                <Suspense>
                  <Timeline
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.timeline}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}

          {profile.view["about"] && (
            <Route
              exact
              path={`${url}/about`}
              component={() => (
                // <Suspense fallback={<Spinner height={60} />}>
                <Suspense>
                  <About
                    isMe={isMe}
                    profile={profile}
                    username={username}
                    privacy={profile?.locker?.about}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {profile.view["friends"] && (
            <Route
              exact
              path={`${url}/friends`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Friends
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.friends}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {profile.view["photos"] && (
            <Route
              exact
              path={`${url}/photos`}
              component={() => (
                // <Suspense fallback={<Spinner height={60} />}>
                <Suspense>
                  <Photos
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.photos}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {profile.view["audios"] && (
            <Route
              exact
              path={`${url}/audios`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Audios
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.audios}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {profile.view["videos"] && (
            <Route
              path={`${url}/videos`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Videos
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.videos}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {profile.view["groups"] && (
            <Route
              path={`${url}/groups`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Groups
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.groups}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}

          {profile.view["notes"] && (
            <Route
              path={`${url}/notes`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Notes
                    isMe={isMe}
                    username={username}
                    privacy={profile?.locker?.notes}
                    changePrivacy={onChangePrivacy}
                  />
                </Suspense>
              )}
            />
          )}
          {isMe() && (
            <Route
              path={`${url}/activity`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <Activity isMe={isMe} />
                </Suspense>
              )}
            />
          )}
          {/* {isMe() && (
              <Route
                  path={`${url}/jobs`}
                  component={() => (
                      <Suspense fallback={<Spinner height={60} />}>
                        <Jobs isMe={isMe} />
                      </Suspense>
                  )}
              />
          )} */}
          {isMe() && (
            <Route
              path={`${url}/poll`}
              component={() => (
                <Suspense fallback={<Spinner height={60} />}>
                  <PollComp />
                </Suspense>
              )}
            />
          )}
        </div>
      </div>
    );
  } else {
    if (!!error) {
      return (
        <UserError>
          <Alert severity="error">
            <Typography color="error" variant="h5">
              {error}
            </Typography>
          </Alert>
        </UserError>
      );
    } else {
      return <Spinner height={100} />;
    }
  }
}

export default connect((store) => ({ auth: store.auth }))(
  authGuard(availability(withRouter(checkUsername(Profile))))
);
