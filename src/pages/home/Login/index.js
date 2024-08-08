import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";

import {
  SignInDiv,
  CustomButton,
  SingInModalUI,
  UserIdSearch,
  PassIcon,
} from "../styles";
import { getUserAvatar } from "../../../shared/functions";
import { HoverOver } from "../../../components/Tools";
import {
  automateLoginAfterResetPassword,
  login as onLogin,
} from "../../../store/auth/action";
import { Profile } from "./styled";
import { Spinner } from "../../../shared";
import axios from "axios";
import { BACKEND_URL } from "../../../shared/constants/Variables";

function Login({
  login,
  auth: { loginErrorType, loggedIn, loggingIn, loginError, user },
  dispatch,
}) {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [face, setFace] = useState(login ? 1 : 0);
  const [passReset, setpassReset] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [notMove, setnotMove] = useState(true);
  const [successfull, setsuccessfull] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loginErrorType === "nouser") {
      setFace(1);
    } else if (loginErrorType === "password") {
      setFace(2);
    } else if (loginErrorType === "captcha") {
      setFace(3);
    }
  }, [loginErrorType]);

  function checkIsPasswordResetAvailable(username) {
    const body = {
      username,
    };

    setloading(true);
    axios
      .post(`${BACKEND_URL}/user/auth/is-passreset-available`, body)
      .then((res) => {
        if (res.data.user.passwordResetStatus) {
          setloading(false);
          setpassReset(true);
          setFace(10);
        } else {
          setloading(false);
          setFace(2);
        }
      })
      .catch((err) => {
        setpassReset(false);
        setFace(2);
        setloading(false);
      });
  }

  function passwordReset(e) {
    e.preventDefault();
    setShow(false);
    setFace(11);
  }

  function confirmPasswordReset(e) {
    e.preventDefault();
    const body = {
      username: id,
      password: newPassword,
      passwordConfirm: confirmPassword,
    };

    setloading(true);
    axios
      .post(`${BACKEND_URL}/user/auth/resetpassword`, body)
      .then((res) => {
        // dispatch here for login automatically
        dispatch(automateLoginAfterResetPassword(res));

        if (res.data.status === "success") {
          setloading(false);
          setsuccessfull(true);
          setFace(12);
        }
      })
      .catch((err) => {
        setError(true);
        setFace(12);
        setloading(false);
      });
  }

  function userSubmit(_) {
    _.preventDefault();
    checkIsPasswordResetAvailable(id);
  }
  function passwordSubmit(_) {
    _.preventDefault();
      dispatch(onLogin(id, password));
      setFace(4);
  }
  

  return (
    <SignInDiv>
      {loggedIn ? (
        <HoverOver title={user.name.join(" ")} placement="right">
          <Link
            to={user.username}
            style={{
              border: "2px solid #e4e4e4",
              padding: "0",
              margin: "0",
              display: "flex",
              borderRadius: "50%",
            }}>
            <img
              style={{
                padding: "0",
                margin: "0",
                height: "60px",
                width: "60px",
                borderRadius: "50%",
              }}
              alt={user.username}
              src={getUserAvatar(user.avatar, user?.gender, user.username)}
            />
          </Link>
        </HoverOver>
      ) : (
        <>
          {face === 0 && (
            <>
              <CustomButton onClick={() => setFace(1)}>Sign in</CustomButton>
              {/* <CreateAccount to="/signup">
                <p className="text-success">Create an account</p>
              </CreateAccount> */}
            </>
          )}
          {face !== 0 && (
            <SingInModalUI>
              <div className="flex">
                {face === 1 && (
                  <form onSubmit={userSubmit}>
                    <UserIdSearch
                      type="text"
                      placeholder="User ID"
                      value={id}
                      onChange={(e) => {
                        setId(e.target.value);
                      }}
                      autoFocus
                    />
                    <CustomButton
                      type="submit"
                      disabled={
                        !id.includes("_")
                      }>
                      Next
                    </CustomButton>
                  </form>
                )}

                {/* password reset area start */}
                {face === 10 && (
                  <form onSubmit={passwordReset}>
                    <UserIdSearch
                      type={show ? "text" : "password"}
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => {
                        setnewPassword(e.target.value);
                      }}
                      autoFocus
                    />
                    <PassIcon onClick={() => setShow(!show)}>
                      {!show ? <VisibilityOff /> : <Visibility />}
                    </PassIcon>
                    <CustomButton type="submit">Reset</CustomButton>
                  </form>
                )}
                {face === 11 && (
                  <form onSubmit={confirmPasswordReset}>
                    <UserIdSearch
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      required
                      value={confirmPassword}
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                        if (e.target.value === newPassword) {
                          setnotMove(false);
                        } else {
                          setnotMove(true);
                        }
                      }}
                      autoFocus
                    />
                    <PassIcon onClick={() => setShow(!show)}>
                      {!show ? <VisibilityOff /> : <Visibility />}
                    </PassIcon>
                    <CustomButton type="submit" disabled={notMove}>
                      Confirm
                    </CustomButton>
                  </form>
                )}

                {successfull && face === 12 && (
                  <p>
                    Password Reset successfull. Please{" "}
                    <a style={{ color: "blue" }} onClick={() => setFace(0)}>
                      Sign In
                    </a>{" "}
                    again
                  </p>
                )}
                {error && face === 12 && (
                  <p>Something went rong, Please contact with our support</p>
                )}
                {/* password reset area end */}

                {face === 2 && (
                  <form onSubmit={passwordSubmit}>
                    <UserIdSearch
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                    />
                    <PassIcon onClick={() => setShow(!show)}>
                      {!show ? <VisibilityOff /> : <Visibility />}
                    </PassIcon>
                    <CustomButton
                      type="submit"
                      // disabled={!PASSWORD_REGEX.test(password)}
                    >
                      Sign in
                    </CustomButton>
                  </form>
                )}
              </div>
        
              {loading && <Spinner height={5} />}
              {face === 4 && loggingIn && <Spinner height={5} />}
              {!!loginError && (
                <span style={{ marginLeft: "10px" }}>{loginError}</span>
              )}
              {/* <a className="home-signup-btn" href="/signup"> */}
              <Link className="home-signup-btn" to="/signup">
                <p style={{ color: "#0048ba" }}>Create an account</p>
                </Link>
              {/* </a> */}
            </SingInModalUI>
          )}
        </>
      )}
    </SignInDiv>
  );
}

export default connect((store) => ({ auth: store.auth }))(withRouter(Login));
