/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import firebase from "firebase";
// import * as firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import { BACKEND_URL } from "../../shared/constants/Variables";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { withRouter, Redirect, useHistory, Link } from "react-router-dom";
import { auth as Auth } from "firebase";
import { connect } from "react-redux";
import {
  USERNAME_REGEX,
  checkSymbol,
  checkAnyNumber,
  checkForAddress,
  checkForZip,
} from "../../shared/constants/RegEx";
import { getSiteInfo } from "../../store/site/action";
import { signup } from "../../store/auth/action";
import PasswordChecker from "./PasswordChecker";
import { PassIcon } from "../home/styles";
import { Spinner } from "../../shared";
import Rlogo from "../../assets/REG-logo.png";

import "./style.scss";
import FilterCuc from "../../components/FilterCuc";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyANBm-q4S44MpDkaRWiVeew8tppovFwD_g",
  authDomain: "micple.firebaseapp.com",
  databaseURL: "https://micple.firebaseio.com",
  projectId: "micple",
  storageBucket: "micple.appspot.com",
  messagingSenderId: "307802765852",
  appId: "1:307802765852:web:d6901d7a7c33222d2b7dd9",
  measurementId: "G-ST8X042RJ8",
};

function Registration({
  site: {
    dialCode,
    location: { country },
  },
  auth: { registerError, loggedIn },
  dispatch,
}) {
  document.title = "Registration form";

  const history = useHistory();

  const [termsModel, setTermsModel] = useState(false);
  const [readTerms, setReadTerms] = useState(false);
  const [first, setFirst] = useState("");
  //regex restriction helper for field
  const [passed, setPassed] = useState(false);
  const [passedtype, setPassedType] = useState("");
  //regex restriction helper end

  const [last, setLast] = useState("");
  const [father, setFather] = useState("");

  // DOB
  const [year, setSelectedYear] = React.useState("");
  const [month, setSelectedMonth] = React.useState("");
  const [selectedDay, setselectedDay] = React.useState("");
  // DOB
  const [mother, setMother] = useState("");
  // const [dob, setDob] = useState();
  const [dob, setDob] = useState(selectedDay / month / year);

  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nicNum, setNicNum] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifier, setVerifier] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [userClicked, setUserClicked] = useState(true);
  const [slelctedyear, setYear] = useState(null);
  const [selectedDayForDeactive, setSelectedDayForDeactive] = useState("");
  const [second, setSecond] = useState("");

  const [genderClicked, setGenderClicked] = useState(true);

  //for phone and user restriction
  const [restricted, setrestricted] = useState(false);
  const [restricted2, setrestricted2] = useState(false);

  useEffect(() => {
    if (!firebase?.apps?.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // store.dispatch(auto());

  }, []);

  /* to get access resend verification button after a certain amount of time */
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      clearInterval(interval);

      // after 60 second need to initial value
      second === 60 || second === null
        ? (setSecond(0), clearInterval(interval))
        : setSecond(second);
    }

    return () => {
      unmounted = true;
    };
  }, [second]);
  /* to get access resend verification button after a certain amount of time */

  // new disable method for mother gender

  const [motherFlag, setMotherFlag] = useState(true);

  const [dobYearFlag, setDobYearFlag] = useState(true);
  const [dobMonthFlag, setDobMonthFlag] = useState(true);
  const [dobDateFlag, setDobDateFlag] = useState(true);
  const [genderFlag, setGenderFlag] = useState(true);
  const [zipFlag, setZipFlag] = useState(true);
  const [userNameFlag, setUserNameFlag] = useState(false);
  const [codeFlag, setCodeFlag] = useState(true);
  const [resendcodeFlag, setResendCodeFlag] = useState(true);

  let interval = 0;

  const resendFunction = async () => {
    let timesRun = 60;
    interval = setInterval(async function () {
      timesRun -= 1;
      if (timesRun === 0) {
        clearInterval(interval);
      }
      //do whatever here..
      setSecond(timesRun);
    }, 1000);
  };

  useEffect(() => {
    if (!country.name || !country.label || !dialCode) {
      //Sending ip with dispatch
      dispatch(getSiteInfo());
    }
    // eslint-disable-next-line
  }, [country, dialCode]);
  useEffect(() => {
    clearTimeout(window.errorTimer);
    if (!!error) {
      window.errorTimer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);
  useEffect(() => {
    //check

    const veriryRecaptcha = new Auth.RecaptchaVerifier("CaptchaContainer", {
      size: "invisible",
    });
    setRecaptcha(veriryRecaptcha);

    if (!!registerError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setError(registerError);
      setSubmitting(false);
    }
  }, [registerError]);

  function sendCode() {
    if (!!Math.floor(phone)) {
      const phoneNumber = dialCode + phone;
      setSending(true);
      resendFunction();
      Auth()
        .signInWithPhoneNumber(phoneNumber, recaptcha)
        .then((v) => {
          setVerifier(v);
          setSending(false);
          setCodeFlag(!codeFlag);
        })
        .catch((err) => {
          setError("Re-captcha validation failed.");
          setVerified(null);
          setSending(false);
          setVerifying(false);
          setVerifier(null);
          throw err;
        });
    } else {
      setError("Invalid phone number.");
    }
  }

  // Regex restriction start
  function checkPermission(text, type) {

    if (type === "address" || type === "zip") {
      if (type === "zip") {
        if (
          checkForAddress.test(text) ||
          text[0] === " " ||
          !checkForZip.test(text)
        ) {
          setPassed(true);
        } else {
          setPassed(false);
        }
      } else {
        if (checkForAddress.test(text) || text[0] === " ") {
          setPassed(true);
        } else {
          setPassed(false);
        }
      }
    } else {
      if (
        checkSymbol.test(text) ||
        text[0] === " " ||
        checkAnyNumber.test(text)
      ) {
        setPassed(true);
      } else {
        setPassed(false);
      }
    }
    setPassedType(type);
  }

  //User name checking into DB and  Regex
  const checkUsername = (username) => {
    const body = {
      username,
    };
    axios
      .post(`${BACKEND_URL}/user/auth/signup/check-user-name`, body)
      .then((res) => {
        setrestricted2(false);
      })
      .catch((err) => {
        setrestricted2(true);
      });
  };

  function checkValidityOfUsername(text, type) {

    if (!USERNAME_REGEX.test(text)) {
      setPassed(true);
    } else {
      checkUsername(text);
      setPassed(false);
    }
    setPassedType(type);
  }

  const checkPhoneNumber = (text) => {
    const dail = "+880";
    const phoneNo = {
      phone: dail + text,
    };
    text.length >= 10
      ? axios
          .post(`${BACKEND_URL}/user/auth/signup/check-phone-number`, phoneNo)
          .then((res) => {
            setrestricted(false);
          })
          .catch((err) => {
            setrestricted(true);
          })
      : null;
  };

  const mobileOnchangeText = (text) => {
    if (text[0] === "0") {
      setPhone(text.slice(1));
      checkPhoneNumber(text.slice(1));
    } else {
      setPhone(text);
      checkPhoneNumber(text);
    }
  };

  function resendCode() {
    if (!!Math.floor(phone)) {
      const phoneNumber = dialCode + phone;
      setSending(true);
      resendFunction();
      Auth()
        .signInWithPhoneNumber(phoneNumber, recaptcha)
        .then((v) => {
          setVerifier(v);
          setSending(false);
        })
        .catch((err) => {
          setError("Re-captcha validation failed.");
          setVerified(null);
          setSending(false);
          setVerifying(false);
          setVerifier(null);
          throw err;
        });
    } else {
      setError("Invalid phone number.");
    }
  }

  function verifyCode() {
    if (!!Math.floor(code)) {
      setVerifying(true);
      verifier
        .confirm(code)
        .then((result) => {
          setVerified(result.user.phoneNumber);
          setVerifying(false);
          // ? dialCode
          if (second) {
            clearInterval(interval);
          }

          setResendCodeFlag(!resendcodeFlag);
          setVerifier(null);
        })
        .catch((er) => {
          setError(er.message);
          setVerified(null);
          setSending(false);
          setVerifying(false);

          if (second) {
            clearInterval(interval);
          }
        });
    } else {
      setError("Invalid confirm code.");
    }
  }
  function generateUsername() {
    const ranNum = Math.floor(100 + Math.random() * 9000);
    let userName;
    let splitedName = first.split(" ");
    if (splitedName.length > 1) {
      splitedName = `${splitedName[0]}${splitedName[1]}`;
    } else {
      splitedName = first;
    }
    if (splitedName.length > 4) {
      userName = splitedName.toLowerCase();
    } else {
      userName = (splitedName + last).toLowerCase();
    }
    const randUsername = userName + "_" + ranNum;
    setUsername(randUsername);
    setEmail(randUsername);
  }
  function submitForm() {
    const body = {
      address: address.trim(),
      city: city.trim(),
      confirmPassword: cPassword.trim(),
      country: country.name,
      // date: dob,
      date: new Date().toISOString(),
      // dateOfBirth: dob,
      dateOfBirth: year + "-" + month.trim() + "-" + selectedDay,
      fatherName: father.trim(),
      firstName: first.trim(),
      gender: gender.trim(),
      // nicOrNipNumber: nicNum.trim(),
      // taxIdNumber: taxId.trim(),
      lastName: last.trim(),
      motherName: mother.trim(),
      password: password.trim(),
      phone: verified.trim(),
      state: state.trim(),
      username: username.trim(),
      email: `${email.trim()}@micple.com`,
      zipCode: zip.trim(),
    };

    for (const key in body) {
      if (body.hasOwnProperty(key) && body[key].length > 50) {
        setError(
          "Some of your input(s) has/have greater than 50 characters. Try to keep it short."
        );
        return false;
      }
    }
    if (false) {
      setError(
        "Pick a username containing lowercase letters, an underscore and numbers in between 6 to 16. i.g. john_123."
      );
    } else if (false) {
      setError(
        "Your password may contain letters, numbers and @#.* characters. But it must be in between 8 to 12."
      );
    } else if (body.password !== body.confirmPassword) {
      setError("Please confirm a matching password.");
    } else {
      setSubmitting(true);
      //Sending ip with dispatch signup
      dispatch(signup(body));
    }
  }
  function validate() {
    return (
      submitting ||
      !first ||
      !last ||
      !father ||
      !mother ||
      !dob ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !username ||
      !email ||
      !password ||
      !cPassword ||
      !agreed ||
      !verified
    );
  }

  const changeGender = (e) => {
    setGender(e.target.value);
    setGenderClicked(false);
    setDobYearFlag(true);
    setDobMonthFlag(true);
    setDobDateFlag(true);
  };

  const onLoginClick = () => {
    history.push("/");
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="r1_slide register" id="rfApp">
      {loggedIn && !!username && <Redirect to={`/${username}`} />}

      <div onClick={onLoginClick} style={{ cursor: "pointer" }}>
        <img className="registation_logo" src={Rlogo} alt="micple logo" />
      </div>

      {!!error && <div className="shadow-lg">{error}</div>}
      <h3 className="stitl">Personal Information</h3>
      <div className="inpc o-h m-b-2">
        {/* disable algorithm (!afterInput && !beforeInput) || !!afterInput */}
        {/* First name */}
        <input
          //  onPaste={(e) => preventCopyPaste(e)}
          // onPaste={(e) => {e.preventDefault}}
          autoComplete="off"
          onChange={(e) => {
            setFirst(e.target.value);
            checkPermission(e.target.value, "firstName");
          }}
          type="text"
          autoFocus
          className={
            passedtype === "firstName" && passed
              ? "inp_info riiir border_change"
              : "inp_info riiir"
          }
          placeholder="First name"
          value={first}
          disabled={!!last}
        />
        {/* last name */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setLast(e.target.value);
            checkPermission(e.target.value, "lastName");
          }}
          type="text"
          className={
            passedtype === "lastName" && passed
              ? "inp_info riiir m-r-0 border_change"
              : "inp_info riiir m-r-0"
          }
          placeholder="Last name"
          value={last}
          disabled={father || !first || (passedtype === "firstName" && passed)}
          onBlur={generateUsername}
        />
      </div>

      <div className="inpc o-h m-b-2">
        {/* father's name */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setFather(e.target.value);
            checkPermission(e.target.value, "father");

            if (father.length > 0) {
              setMotherFlag(false);
            }
          }}
          type="text"
          className={
            passedtype === "father" && passed
              ? "inp_info riiir border_change"
              : "inp_info riiir"
          }
          placeholder="Father name"
          value={father}
          // disabled={(!last && !father) || !!mother}
          disabled={!last || !!mother || (passedtype === "lastName" && passed)}
        />
        {/* mother's name */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setMother(e.target.value);
            checkPermission(e.target.value, "mother");
            setDobYearFlag(false);
            setDobMonthFlag(false);
            setDobDateFlag(false);
          }}
          type="text"
          className={
            passedtype === "mother" && passed
              ? "inp_info riiir border_change m-r-0"
              : "inp_info riiir m-r-0"
          }
          placeholder="Mother name"
          value={mother}
          disabled={
            !father || motherFlag || (passedtype === "father" && passed)
          }
          // disabled={motherFlag}
        />
      </div>

      <div style={{ border: "none", height: "42px" }} className=" m-b-2">
        <FilterCuc
          setSelectedYear={setSelectedYear}
          year={year}
          month={month}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setselectedDay={setselectedDay}
          setSelectedDayForDeactive={setSelectedDayForDeactive}
          slelctedyear={slelctedyear}
          setYear={setYear}
          mother={mother}
          motherFlag={motherFlag}
          setMotherFlag={setMotherFlag}
          dobYearFlag={dobYearFlag}
          dobMonthFlag={dobMonthFlag}
          dobDateFlag={dobDateFlag}
          setGenderFlag={setGenderFlag}
          gender={gender}
          // disabled={!mother || !!gender}
          value={"02/08/2021"}
          setDob={setDob}
          dob={Date.now()}
        />
        {/* </MuiPickersUtilsProvider> */}
        {/* gender */}
        <select
          placeholder="Gender"
          className="inp_info m-r-0 riiir"
          value={gender}
          // onChange={(e) => setGender(e.target.value  )}
          onChange={(e) => {
            changeGender(e);
          }}
          disabled={!selectedDayForDeactive || genderFlag}
          style={{
            width: "2%",
            border: "2px dotted #d8d8d8",
            padding: "auto 10px",
            height: "100%",
          }}>
          {genderClicked ? <option value="">Gender</option> : ""}

          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <h3 className="stitl">Residence Information</h3>
      <div className="inpc o-h m-b-2">
        {/* address */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setAddress(e.target.value);
            checkPermission(e.target.value, "address");
            if (address.length >= 0) {
              setGenderFlag(true);
            }
          }}
          type="text"
          className={
            passedtype === "address" && passed
              ? "inp_info riiir m-r-0 border_change"
              : "inp_info riiir m-r-0"
          }
          placeholder="Address"
          value={address}
          disabled={(!gender && !address) || !!city}
        />
      </div>

      <div className="inpc o-h m-b-2">
        {/* city */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setCity(e.target.value);
            checkPermission(e.target.value, "city");
          }}
          type="text"
          className={
            passedtype === "city" && passed
              ? "inp_info riiir border_change m-r-2"
              : "inp_info riiir m-r-2"
          }
          placeholder="City"
          value={city}
          disabled={
            (!address && !city) ||
            !!state ||
            (passedtype === "address" && passed)
          }
        />
        {/* state name */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setState(e.target.value);
            checkPermission(e.target.value, "state");
            if (state.length > 0) {
              setZipFlag(false);
            }
          }}
          onClick={() => setZipFlag(false)}
          type="text"
          className={
            passedtype === "state" && passed
              ? "inp_info riiir m-r-0 border_change"
              : "inp_info riiir m-r-0"
          }
          placeholder="State"
          value={state}
          disabled={
            (!city && !state) || !!zip || (passedtype === "city" && passed)
          }
        />
      </div>

      <div className="inpc o-h m-b-2 selCou">
        {/* postal code */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setZip(e.target.value);
            checkPermission(e.target.value, "zip");
          }}
          type="text"
          className={
            passedtype === "zip" && passed
              ? "inp_info riiir border_change"
              : "inp_info riiir"
          }
          placeholder="Zip code"
          value={zip}
          disabled={
            (!state && !zip) ||
            !!nicNum ||
            zipFlag ||
            (passedtype === "state" && passed)
          }
        />

        {/* country name */}
        <input
          autoComplete="off"
          type="text"
          className="inp_info m-r-0 riiir"
          placeholder="Country"
          value={country.label}
          disabled={true}
        />
      </div>

      <h3 className="stitl">User Information</h3>
      <small className={"text-info color-black"}>
        Your username must contain letters, numbers, no space and an
        underscore(_) in between
      </small>
      <div className="inpc o-h m-b-2" onClick={() => setUserClicked(false)}>
        {/* username */}
        <input
          autoComplete="off"
          onChange={(e) => {
            setUsername(e.target.value);
            checkValidityOfUsername(e.target.value, "username");
            setEmail(e.target.value);
          }}
          onClick={(e) => {
            setZipFlag(true);
          }}
          type="text"
          className={
            username.includes(" ") ||
            (passed && passedtype === "username") ||
            username[0] === "_" ||
            restricted2 ||
            username.slice(-1) === "_" ||
            (!username.includes("_") && username.length > 0)
              ? "inp_info m-r-2 riiir border_change"
              : "inp_info m-r-2 riiir"
          }
          placeholder="user_123 (6-12 chars)"
          value={username}
          onBlur={() => setUserClicked(true)}
          disabled={!zip || userNameFlag || (passedtype === "zip" && passed)}
        />

        {/* email */}
        <input
          style={{ width: "35%" }}
          autoComplete="off"
          type="text"
          className=" inp_info riiir m-r-0"
          placeholder="user_123"
          value={email}
          readOnly
          disabled={true}
        />
        <span className="input-group-addon">@micple.com</span>
      </div>

      {/* m-b-2 */}
      <div className="inpc mb-2">
        {/* country code */}
        <input className="phone_code riiir" defaultValue={dialCode} disabled />

        {!verifier && !verified && codeFlag && (
          // phone number
          <input
            autoComplete="off"
            onChange={(e) => {
              mobileOnchangeText(e.target.value);
              if (phone.length > 0) {
                setUserNameFlag(true);
                setZipFlag(true);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendCode();
              }
            }}
            type="number"
            placeholder="123-456-7890"
            className={restricted ? "ph_ip riiir border_change" : "ph_ip riiir"}
            value={phone}
            disabled={(!zip && !nicNum) || !!code || restricted2}
          />
        )}

        {!verifier && !verified && codeFlag && (
          <button
            style={
              !(phone.length === 10)
                ? { background: "" }
                : { background: "#5486f6", color: "white", border: "none" }
            }
            type="button"
            onClick={sendCode}
            className="btn recreateBtn riiir send-code-btn"
            disabled={sending || restricted || !(phone.length === 10)}>
            Get code
          </button>
        )}

        {!codeFlag && resendcodeFlag && (
          // code verify
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                verifyCode();
              }
            }}
            placeholder="Enter code"
            className="otp riiir"
            value={code}
            disabled={verifying}
            accept="^[0-9]$"
          />
        )}

        {!codeFlag && resendcodeFlag && (
          <button
            type="button"
            style={
              !(code.length === 6)
                ? { background: "" }
                : { background: "#5486f6", color: "white", border: "none" }
            }
            className={
              code.length > 0 && code.length !== 6
                ? "btn recreateBtn2 mr-2 verify-section riiir"
                : "btn recreateBtn mr-2 verify-section riiir"
            }
            disabled={verifying || !code}
            onClick={verifyCode}>
            {verifying ? <Spinner /> : "Verify"}
          </button>
        )}

        {!codeFlag &&
          resendcodeFlag &&
          (second ? (
            <button
              style={{
                background: "white",
                color: "black",
                border: "2px dotted #0002",
              }}
              type="button"
              className="btn riiir verify-section"
              disabled="true">
              {second}
            </button>
          ) : (
            <button
              style={
                !(phone.length === 10)
                  ? { background: "" }
                  : { background: "#5486f6", color: "white", border: "none" }
              }
              type="button"
              onClick={resendCode}
              className="btn riiir recreateBtn verify-section"
              disabled={sending || !(phone.length === 10)}>
              Resend code
            </button>
          ))}

        {!!verified && !resendcodeFlag && (
          <span className="text-pvs">
            Your phone verification has been successful
          </span>
        )}
      </div>

      <small>
        Your password must be (8-12) digit and contain uppercase & lowercase
        letters, numbers and *.@#
      </small>
      <div className="inpc o-h m-b-2 pwsh-co">
        {/* password */}
        <input
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          className="inp_info pwsh riiir"
          placeholder="New password"
          value={password}
          disabled={(!code && !password) || !!cPassword}
        />
        <PassIcon className="pwsh-ic" onClick={() => setShow(!show)}>
          {!show ? <VisibilityOff /> : <Visibility />}
        </PassIcon>
        {/* confirm password */}
        <input
          autoComplete="off"
          onChange={(e) => setCPassword(e.target.value)}
          type="password"
          className="inp_info m-r-0 riiir"
          placeholder="Confirm password"
          value={cPassword}
          disabled={!password && !cPassword}
        />
      </div>
      <PasswordChecker
        password={password}
        passArr={[
          first,
          last,
          gender,
          phone,
          username,
          "password",
          "12345678",
          "87654321",
        ]}
      />

      <div className="checkbox-area">
        <label className="trmslbl">
          <input
            onChange={(_) => {
              setAgreed(_.target.checked);
            }}
            type="checkbox"
            className="check_terms"
            checked={agreed}
          />
          &nbsp;By checking this box, I confirm that I have read, understand and
          agree to the
          <Link to="/privacy" target="_blank">
            {" "}
            Terms of Agreement {" "}
          </Link>{" "}
          and Privacy Policy.
        </label>
      </div>
      <p style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={submitForm}
          disabled={validate()}
          style={{
            display: "block",
            margin: "20px auto",
            textTransform: "initial",
          }}>
          Submit
        </Button>
      </p>
      <div id="CaptchaContainer" />
      <Dialog fullWidth maxWidth="sm" open={termsModel}>
        <DialogTitle style={{ textAlign: "center" }}>
          <strong>Terms and Conditions</strong>
        </DialogTitle>
        <DialogContent dividers>
          <>
            Your data with special protections. You can choose to provide
            information in your micple profile fields or life events about your
            religious views, political views, your health. This and other
            information (such as racial or ethnic origin, philosophical beliefs
            membership) could be subject to special protections under the laws
            of your country.
          </>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
              setTermsModel(false);
              setReadTerms(true);
              setAgreed(true);
            }}
            style={{ textTransform: "initial" }}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(
  withRouter(Registration)
);
