import React, { useState } from "react";
import "./style.scss";
import CardDiv from "./CardDiv";
import {
  faceIdCardInformation,
  gestureInformation,
  backSideInformation,
  frontSideInformation,
} from "./helper/constant";
import { useSelector } from "react-redux";
import { faceIdCardObjectProperty } from "./helper/constant.js";


const Index = () => {
  const [input, setInput] = useState({});
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [warning, setWarning] = useState({});
  const [activeField, setActiveField] = useState({
    current: "firstName",
    next: "",
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
  const [disableProperty, setDisableProperty] = useState(
    [
      'left',
      'up',
      'down',
      'right',
      'eyeMove',
      'retina',
      'lipsMove',
      'straight',
      'img',  //hint Image
    ]
  )

  const {
    auth: {
      user
    }
  } = useSelector((state) => state);

  const handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value.replaceAll("  ", " ");

    let checkCondition = false;
    if (value.toString().length > 99) {
      return setWarning(name);
    }
    // if (stringInputType.includes(name)) {
    //   checkCondition = stringValidator(value);
    // } else if (name === "zipCode") {
    //   checkCondition = zipCodeValidator(value);
    // } else if (name === "username") {
    //   checkCondition = userNameValidator(value);
    //   if (!checkCondition) {
    //     setActiveField((state) => {
    //       return {
    //         next: "",
    //         current: name,
    //       };
    //     });
    //     setInput((pre) => {
    //       return { ...pre, [name]: value };
    //     });
    //   }
    // } else if (name === "phone") {
    //   checkCondition = phoneNumberValidator(value);
    // } else {
    //   checkCondition = checkCondition = true;
    // }
    // if (!checkCondition) {
    //   setWarning(name);
    //   return;
    // }
    // if (name === "fatherName") {
    //   let userName = userNameGenerator();
    //   checkUserNameIsExist(userName).then((res) => {
    //     if (res) {
    //       if (input?.dialCode) {
    //         setInput((state) => {
    //           if (!state.username) {
    //             return {
    //               ...state,
    //               username: userName,
    //             };
    //           } else {
    //             return { ...state };
    //           }
    //         });
    //       }
    //     } else {
    //       setActiveField((state) => {
    //         return {
    //           next: "",
    //           current: name,
    //         };
    //       });
    //     }
    //   });
    // }

    // if (name === "nidNumber") {
    //   if (value.length < 3) {
    //     setWarning(name);
    //     setActiveField((state) => {
    //       return {
    //         next: "",
    //         current: name,
    //       };
    //     });
    //     return setInput((prev) => {
    //       return {
    //         ...prev,
    //         [name]: value,
    //       };
    //     });
    //   } else {
    //     setWarning("");
    //     setActiveField((state) => {
    //       return {
    //         next: "phone",
    //         current: name,
    //       };
    //     });
    //     return setInput((prev) => {
    //       return {
    //         ...prev,
    //         [name]: value,
    //       };
    //     });
    //   }
    // }

    // if (0 < value.toString().length) {
    //   if (name === "zipCode") {
    //     if (input?.country) {
    //       setActiveField((state) => {
    //         return {
    //           next: "username",
    //           current: name,
    //         };
    //       });
    //     } else {
    //       setActiveField((state) => {
    //         return {
    //           next: "",
    //           current: name,
    //         };
    //       });
    //     }
    //   } else if (name === "username") {
    //     // eslint-disable-next-line no-use-before-define
    //     checkUserNameIsExist(value).then((res) => {
    //       if (res) {
    //         if (input?.dialCode) {
    //           setActiveField((state) => {
    //             return {
    //               next: "nidNumber",
    //               current: name,
    //             };
    //           });
    //         } else {
    //           setActiveField((state) => {
    //             return {
    //               next: "",
    //               current: name,
    //             };
    //           });
    //         }
    //       } else {
    //         setActiveField((state) => {
    //           return {
    //             next: "",
    //             current: name,
    //           };
    //         });
    //       }
    //     });
    //   } else {
    //     setActiveField((state) => {
    //       return {
    //         next: inputFlowList[name],
    //         current: name,
    //       };
    //     });
    //   }
    // } else {
    //   for (let property in inputFlowList) {
    //     if (
    //       inputFlowList.hasOwnProperty(property) &&
    //       inputFlowList[property] === name
    //     ) {
    //       setActiveField((state) => {
    //         return {
    //           current: property ? property : "",
    //           next: name ? name : "",
    //         };
    //       });
    //     }
    //   }
    // }

    // if (name === "phone" && value.length !== 10) {
    //   setWarning(name);
    //   setActiveField((state) => {
    //     return {
    //       next: "",
    //       current: name,
    //     };
    //   });
    // } else if (name === "phone" && value.length === 10) {
    //   checkPhoneNumber(value).then((res) => {
    //     if (!res) {
    //       setWarning(name);
    //       setActiveField((state) => {
    //         return {
    //           next: "",
    //           current: name,
    //         };
    //       });
    //     } else {
    //       setWarning("");
    //     }
    //   });
    // } else if (name === "password" && value.length < 5) {
    //   setWarning(name);
    //   setActiveField((state) => {
    //     return {
    //       next: "",
    //       current: name,
    //     };
    //   });
    // } else if (name === "confirmPassword" && value !== input.password) {
    //   setWarning(name);
    //   setActiveField((state) => {
    //     return {
    //       next: "",
    //       current: name,
    //     };
    //   });
    // } else {
    //   setWarning("");
    // }
    // setInput((pre) => {
    //   return { ...pre, [name]: value };
    // });
  };

  const warningDetector = (name) => {
    if (name === warning) {
      return "warning";
    }
    return "";
  };

  return (
    <div className="div-main-container ">
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
  );
};

export default Index;
