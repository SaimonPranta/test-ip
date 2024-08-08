import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mainLogo from "../../assets/REG-logo.png";
import "./style.scss";
import CardDiv from "./components/CardDiv/index.js";
import {
  faceIdCardInformation,
  gestureInformation,
  backSideInformation,
  frontSideInformation,
} from "./helper/constant.js";
import { useSelector } from "react-redux";
import { faceIdCardObjectProperty } from "./helper/constant.js";
import axios from "axios";
import { BACKEND_URL } from "../../shared/constants/Variables.js";
import { userHeader } from "../../shared/functions/Token.js";

const Index = () => {
  const [input, setInput] = useState({});
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [warning, setWarning] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [activeField, setActiveField] = useState({
    current: "",
    next: "front",
  });
  const [faceIdCard, setFaceIdCard] = useState({
    left: faceIdCardObjectProperty,
    up: faceIdCardObjectProperty,
    down: faceIdCardObjectProperty,
    right: faceIdCardObjectProperty,
    eyeMove: faceIdCardObjectProperty,
    retina: faceIdCardObjectProperty,
    lipsMove: faceIdCardObjectProperty,
    straight: faceIdCardObjectProperty,
    front: faceIdCardObjectProperty,
    img: faceIdCardObjectProperty, //hint Image
    back: faceIdCardObjectProperty,
  });
  const [disableProperty, setDisableProperty] = useState([
    "left",
    "up",
    "down",
    "right",
    "eyeMove",
    "retina",
    "lipsMove",
    "straight",
    "img", //hint Image
  ]);

  const [unVerifiedProperty, setUnVerifiedProperty] = useState([])

  const {
    auth: { user },
  } = useSelector((state) => state);

  // inValid image set the disable property <<<<<<<<<<<<<<<<=======================
  useEffect(() => {
    const alreadyExist = []
    const unVerified = []
    if (!user?.verificationInfo) return
    Object.keys(user?.verificationInfo).forEach((key) => {
      const value = user?.verificationInfo[key]
      if (key === 'status') return
      Object.keys(value).forEach((key2) => {
        if (disableProperty.includes(key2)) return
        const value2 = user?.verificationInfo[key][key2]
        if (value2?.media) {
          if (value2?.isVerified) {
            alreadyExist.push(key2)
          }
          else {
            if (unVerifiedProperty.includes(key2)) return
            unVerified.push(key2)
          }
        }
      })
    })
    setDisableProperty((prev) => [...prev, ...alreadyExist])
    setUnVerifiedProperty((prev) => [...prev, ...unVerified])
    if (unVerified.length > 0) {
      setActiveField({ current: '', next: unVerified[0] })
    }
  }, [user]);

  const handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value.replaceAll("  ", " ");
    setInput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSelectTermBtn = (e) => {
    const name = e.target.name;
    setInput((state) => {
      if (state[name]) {
        return {
          ...state,
          [name]: !state[name],
        };
      }
      return {
        ...state,
        [name]: true,
      };
    });
  };

  const warningDetector = (name) => {
    if (name === warning) {
      return "warning";
    }
    return "";
  };

  const infoResubmit = async () => {
    setIsLoading(true)
    const formData = new FormData()
    let validVerificationInfoFileName = await []
    await Object.keys(faceIdCard).forEach(async (key) => {
      if (disableProperty.includes(key)) return
      const file = await faceIdCard[key]
      if (file.img) {
        await validVerificationInfoFileName.push(file.img.name)
      }
    })

    await formData.append('fileMainName', JSON.stringify(validVerificationInfoFileName))

    await axios
      .put(`${BACKEND_URL}/user/auth/verification/verify-info`, formData, { headers: userHeader() })
      .then((data) => {
        setIsLoading(false)
        if (data.data) {
          // return history.push(`/`)
          window.location.href = `/`
        }
      })
      .catch((error) => {
        setIsLoading(false)
      });
  }

  return (
    <div className="main-verification-container">
      <div className="logo-div">
        <Link to="/">
          <img src={mainLogo} alt="" />
        </Link>
      </div>
      <div className="verification-container ">
        <div className="small-div-container ">
          {faceIdCardInformation.map((info, index) => (
            <div key={index} className="child-div">
              <CardDiv
                faceIdCard={faceIdCard}
                setFaceIdCard={setFaceIdCard}
                name={info.name}
                title={info.title}
                information={info.information}
                stream={stream}
                setStream={setStream}
                warningDetector={warningDetector}
                warning={warning}
                setWarning={setWarning}
                input={input}
                user={user}
                activeField={activeField}
                setActiveField={setActiveField}
                isCameraOn={isCameraOn}
                setIsCameraOn={setIsCameraOn}
                disableProperty={disableProperty}
                setDisableProperty={setDisableProperty}
                setInput={setInput}
                handleInputChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="large-div-container">
          {/* id card front side */}
          <div className="child-1">
            <CardDiv
              faceIdCard={faceIdCard}
              setFaceIdCard={setFaceIdCard}
              name={"front"}
              title={"National ID/SSN (Front Side)"}
              information={frontSideInformation}
              stream={stream}
              setStream={setStream}
              warningDetector={warningDetector}
              warning={warning}
              setWarning={setWarning}
              input={input}
              user={user}
              activeField={activeField}
              setActiveField={setActiveField}
              isCameraOn={isCameraOn}
              setIsCameraOn={setIsCameraOn}
              disableProperty={disableProperty}
              setDisableProperty={setDisableProperty}
              setInput={setInput}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* Hint Confirmation */}
          <div className="child-2 ">
            <CardDiv
              faceIdCard={faceIdCard}
              setFaceIdCard={setFaceIdCard}
              name={"img"}
              title={"Hint Confirmation"}
              information={gestureInformation}
              stream={stream}
              setStream={setStream}
              warningDetector={warningDetector}
              warning={warning}
              setWarning={setWarning}
              input={input}
              user={user}
              activeField={activeField}
              setActiveField={setActiveField}
              isCameraOn={isCameraOn}
              setIsCameraOn={setIsCameraOn}
              disableProperty={disableProperty}
              setDisableProperty={setDisableProperty}
              setInput={setInput}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* id card back side */}
          <div className="child-3">
            <CardDiv
              faceIdCard={faceIdCard}
              setFaceIdCard={setFaceIdCard}
              name={"back"}
              title={"National ID/SSN (Back Side)"}
              information={backSideInformation}
              stream={stream}
              setStream={setStream}
              warningDetector={warningDetector}
              warning={warning}
              setWarning={setWarning}
              input={input}
              activeField={activeField}
              setActiveField={setActiveField}
              isCameraOn={isCameraOn}
              user={user}
              setIsCameraOn={setIsCameraOn}
              disableProperty={disableProperty}
              setDisableProperty={setDisableProperty}
              setInput={setInput}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <section className="submit-container">
        {<div className="terms-area">
          <input
            type="checkbox"
            name="agreeTermsAndCondition"
            disabled={
              faceIdCard[unVerifiedProperty[unVerifiedProperty?.length - 1]]?.img
                ? false
                : true
            }
            onClick={(e) => {
              handleSelectTermBtn(e)
              setActiveField({
                current: '',
                next: ''
              })
            }}
          />
          <p className="terms-and-condition">
            {" "}
            {/* dfd */}
            By checking this box, I confirm that I have read, understand and
            agree to the <Link to="/privacy">Terms of Agreement </Link> and
            Privacy Policy.
          </p>
        </div>}
        <div className="submit-btn-area">
          <button
            onClick={infoResubmit}
            disabled={input?.agreeTermsAndCondition ? false : true}>
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
