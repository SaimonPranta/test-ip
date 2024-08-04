/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import "./style.scss";
import mainLogo from "../../assets/REG-logo.png";
import { Link, useHistory, Redirect } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { yearList, monthList, dayList } from "./helper/utilities/dateGenerator.js";
import {
  stringValidator,
  zipCodeValidator,
  userNameValidator,
  phoneNumberValidator,
} from "./helper/utilities/inputValidator.js";
import { inputFlowList } from "./helper/constant/inputFlow.js";
import { stringInputType } from "./helper/constant/inputType.js";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInfo } from "../../store/site/action.js";
import { BACKEND_URL } from "../../shared/constants/Variables.js";
import axios from "axios";
import { randomNumberGenerator } from "./helper/utilities/getRendomNumber.js";
import { AUTO_LOGIN, REGISTER } from "../../store/auth/action.js";
import { userHeader } from "../../shared/functions/Token.js";
import RegistationidCard from "./helper/RegistationidCard/index.js";
import { el, is } from "date-fns/locale";
import { getUser } from "../../gardes/UserAuthGard/Hooks/getUser/index.js";
import { faceIdCardObjectProperty } from "./helper/RegistationidCard/helper/constant.js";
import { set } from "date-fns";

const Index = () => {
  const [isLoading] = getUser();
  const {
    auth: {
      user
    }
  } = useSelector((state) => state);

  const [condition, setCondition] = useState({
    showPassword: false,
    isSubmit: false,
    isLoadingPage: false,
  });
  const [step, setStep] = useState(1)
  const [input, setInput] = useState({});
  const [warning, setWarning] = useState({});
  const [currentCamera, setCurrentCamera] = useState("");
  const [currentClick, setCurrentClick] = useState("");

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
    img: faceIdCardObjectProperty,   //hint Image
    back: faceIdCardObjectProperty,
  })


  const [activeField, setActiveField] = useState({
    current: "firstName",
    next: "front",
  });

  const {
    router: {
      location: { pathname },
    },
    site: {
      dialCode,
      location: { country },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (!country.name || !country.label || !dialCode) {
      dispatch(getSiteInfo());
    }
    if (country.name) {
      setInput((sate) => {
        return {
          ...sate,
          country: country.name,
          dialCode: dialCode,
        };
      });
    }

    // eslint-disable-next-line
  }, [country, dialCode]);

  const checkUserNameIsExist = async (username) => {
    try {
      const body = {
        username,
      };
      const {
        data: { isNotExist },
      } = await axios.post(
        `${BACKEND_URL}/user/auth/signup/check-user-name`,
        body
      );
      return isNotExist;
    } catch (error) {
      return false;
    }
  };

  const handleRemoveCopyPast = (e) => {
    e.preventDefault();
  };
  const handleRemoveUnusualKey = (e) => {
    const keyArray = ["Alt", "Shift", "Control", "Tab"];
    if (keyArray.includes(e.key)) {
      e.preventDefault();
    }
  };

  const userNameGenerator = () => {
    let userName =
      input.firstName.toString().length > 4
        ? input.firstName
        : `${input.firstName}${input.lastName}`;
    let randomNumber = randomNumberGenerator();
    const finalName = `${userName.replaceAll(" ", "")}_${randomNumber}`;
    return finalName.toLowerCase();
  };
  const checkPhoneNumber = async (text) => {
    try {
      const phoneNo = {
        phone: input.dialCode + text,
      };
      const {
        data: { isNotExist },
      } = await axios.post(
        `${BACKEND_URL}/user/auth/signup/check-phone-number`,
        phoneNo
      );
      return isNotExist;
    } catch (error) {
      return false;
    }
  };

  const handleInputChange = async (e) => {
    const name = e.target.name;
    const value = e.target.value.replaceAll("  ", " ");

    let checkCondition = false;
    if (value.toString().length > 99) {
      return setWarning(name);
    }
    if (stringInputType.includes(name)) {
      checkCondition = stringValidator(value);
    } else if (name === "zipCode") {
      checkCondition = zipCodeValidator(value);
    } else if (name === "username") {
      checkCondition = userNameValidator(value);
      if (!checkCondition) {
        setActiveField((state) => {
          return {
            next: "",
            current: name,
          };
        });
        setInput((pre) => {
          return { ...pre, [name]: value };
        });
      }
    } else if (name === "phone") {
      checkCondition = phoneNumberValidator(value);
    } else {
      checkCondition = checkCondition = true;
    }
    if (!checkCondition) {
      setWarning(name);
      return;
    }
    if (name === 'nidNumber') {
      if (value.length < 5) {
        return setWarning('nidNumber')
      }
      else {
        setWarning('')
        return setInput(prev => {
          return {
            ...prev,
            nidNumber: value
          }
        })
      }
    }
    if (name === "fatherName") {
      let userName = userNameGenerator();
      checkUserNameIsExist(userName).then((res) => {
        if (res) {
          if (input?.dialCode) {
            setInput((state) => {
              if (!state.username) {
                return {
                  ...state,
                  username: userName,
                };
              } else {
                return { ...state };
              }
            });
          }
        } else {
          setActiveField((state) => {
            return {
              next: "",
              current: name,
            };
          });
        }
      });
    }

    if (0 < value.toString().length) {
      if (name === "zipCode") {
        if (input?.country) {
          setActiveField((state) => {
            return {
              next: "username",
              current: name,
            };
          });
        } else {
          setActiveField((state) => {
            return {
              next: "",
              current: name,
            };
          });
        }
      } else if (name === "username") {
        // eslint-disable-next-line no-use-before-define
        checkUserNameIsExist(value).then((res) => {
          if (res) {
            if (input?.dialCode) {
              setActiveField((state) => {
                return {
                  next: "phone",
                  current: name,
                };
              });
            } else {
              setActiveField((state) => {
                return {
                  next: "",
                  current: name,
                };
              });
            }
          } else {
            setActiveField((state) => {
              return {
                next: "",
                current: name,
              };
            });
          }
        });
      } else {
        setActiveField((state) => {
          return {
            next: inputFlowList[name],
            current: name,
          };
        });
      }
    } else {
      for (let property in inputFlowList) {
        if (
          inputFlowList.hasOwnProperty(property) &&
          inputFlowList[property] === name
        ) {
          setActiveField((state) => {
            return {
              current: property ? property : "",
              next: name ? name : "",
            };
          });
        }
      }
    }

    if (name === "phone" && value.length !== 10) {
      setWarning(name);
      setActiveField((state) => {
        return {
          next: "",
          current: name,
        };
      });
    } else if (name === "phone" && value.length === 10) {
      checkPhoneNumber(value).then((res) => {
        if (!res) {
          setWarning(name);
          setActiveField((state) => {
            return {
              next: "",
              current: name,
            };
          });
        } else {
          setWarning("");
        }
      });
    } else if (name === "password" && value.length < 5) {
      setWarning(name);
      setActiveField((state) => {
        return {
          next: "",
          current: name,
        };
      });
    } else if (name === "confirmPassword" && value !== input.password) {
      setWarning(name);
      setActiveField((state) => {
        return {
          next: "",
          current: name,
        };
      });
    } else {
      setWarning("");
    }
    setInput((pre) => {
      return { ...pre, [name]: value };
    });


  };

  const warningDetector = (name) => {
    if (name === warning) {
      return "warning";
    }
    return "";
  };

  const checkIsDisable = (name) => {
    if (name === activeField.current) {
      return false;
    } else if (name === activeField.next) {
      return false;
    } else {
      return true;
    }
  };
  const valueProvider = (type) => {
    if (input[type]) {
      return input[type];
    }
    return "";
  };
  const handleZipCodeOnBlue = () => {
    if (input.zipCode.toString().length > 1) {
      setActiveField({
        current: "username",
        next: "phone",
      });
    }
  };

  const submitForm = async () => {
    const propertyRemoveList = await [
      "day",
      "month",
      "year",
      "agreeTermsAndCondition",
    ];

    // const faceAndIdCheck = await Object.keys(faceIdCard).find((item) => {
    //   if (disableProperty.includes(faceAndIdCheck)) return null
    //   if (!faceIdCard[item].img) {
    //     return item
    //   }
    //   return null
    // })

    // if (faceAndIdCheck) {
    //   return setWarning(faceAndIdCheck)
    // }

    const body = await {
      ...input,
      dateOfBirth: `${input.year}-${input.month}-${input.day}`,
      email: `${input.username}@micple.com`,
      phone: `${input.dialCode}${input.phone}`,
      date: new Date().toISOString(),
    };

    await propertyRemoveList.forEach((item) => {
      if (body[item]) {
        delete body[item];
      }
    });

    if (body.password !== body.confirmPassword) {
      setWarning("confirmPassword");
    } else {
      setCondition((state) => {
        return {
          ...state,
          isSubmit: true,
        };
      });

      let validVerificationInfoFileName = await []
      await Object.keys(faceIdCard).forEach(async (key) => {
        if (disableProperty.includes(key)) return
        const file = await faceIdCard[key]
        if (file.img) {
          await validVerificationInfoFileName.push(file.img.name)
        }
      })

      const formData = new FormData()
      await formData.append('bodyData', JSON.stringify(body))
      await formData.append('fileMainName', JSON.stringify(validVerificationInfoFileName))

      // await Object.keys(faceIdCard).forEach(async (faceIdFileName) => {
      //   const file = await faceIdCard[faceIdFileName]
      //   if (!file?.img) return
      //   await formData.append(faceIdFileName, file.img)
      // })

      await axios
        .post(`${BACKEND_URL}/user/auth/signup`, formData)
        .then((data) => {
          if (data?.data) {
            setCondition((state) => {
              return {
                ...state,
                isSubmit: false,
              };
            });
            dispatch({
              type: REGISTER,
              payload: data,
            });
            window.location.href = `/${data.data.user.username}`
            // history.push();
          }
        })
        .catch((error) => {
          console.log(error)
          setCondition((state) => {
            return {
              ...state,
              isSubmit: false,
            };
          });
        });
    }
  };

  const infoResubmit = async () => {

    if (!user?.nidNumber) {
      if (!input?.nidNumber) return setWarning('nidNumber')
    }

    const formData = new FormData()
    let validVerificationInfoFileName = await []
    await Object.keys(faceIdCard).forEach(async (key) => {
      if (disableProperty.includes(key)) return
      const file = await faceIdCard[key]
      if (file.img) {
        await validVerificationInfoFileName.push(file.img.name)
      }
    })
    if (!user?.nidNumber) {
      await formData.append('nidNumber', JSON.stringify({ nidNumber: input?.nidNumber }))
    }
    if (user?.nidNumber) {
      await formData.append('nidNumber', JSON.stringify({ nidNumber: null}))
    }
    await formData.append('fileMainName', JSON.stringify(validVerificationInfoFileName))

    await axios
      .put(`${BACKEND_URL}/user/auth/verification/verify-info`, formData, { headers: userHeader() })
      .then((data) => {
        if (data.data) {
          // return history.push(`/`)
          window.location.href = `/`
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

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

  if (condition?.isLoadingPage || isLoading) {
    return <></>;
  }
  if (user.username) {
    if (user?.verificationInfo?.idCard?.front?.media?.length > 0 && user?.verificationInfo?.idCard?.back?.media?.length > 0 && user?.verificationInfo?.status !== 'Under Review') {
      return <Redirect to={`/${user?.username}`} />
    }
  }

  return (
    <div
      className="sing-up container"
      onPaste={handleRemoveCopyPast}
      onCopy={handleRemoveCopyPast}
      onKeyDown={handleRemoveUnusualKey}>

      <section className="logo">
        <Link to="/">
          <img src={mainLogo} alt="" />
        </Link>
      </section>

      <section className="form-container">
        {step === 1 &&
          <>
            <h3>Personal Information</h3>
            <form>
              <div>
                <input
                  className={warningDetector("firstName")}
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={valueProvider("firstName")}
                  disabled={checkIsDisable("firstName")}
                  onChange={handleInputChange}
                />
                <input
                  className={warningDetector("lastName")}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={valueProvider("lastName")}
                  disabled={checkIsDisable("lastName")}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Father name"
                  className={warningDetector("fatherName")}
                  name="fatherName"
                  value={valueProvider("fatherName")}
                  disabled={checkIsDisable("fatherName")}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Mother name"
                  name="motherName"
                  className={warningDetector("motherName")}
                  value={valueProvider("motherName")}
                  disabled={checkIsDisable("motherName")}
                  onChange={handleInputChange}
                />
              </div>
              <div className="select-container">
                <div>
                  <select
                    name="year"
                    className={warningDetector("year")}
                    value={valueProvider("year")}
                    disabled={checkIsDisable("year")}
                    onChange={handleInputChange}>
                    <option value="" hidden>
                      Year
                    </option>
                    {yearList.map((year) => {
                      return (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="month"
                    className={warningDetector("month")}
                    value={valueProvider("month")}
                    disabled={checkIsDisable("month")}
                    onChange={handleInputChange}>
                    <option value="" hidden>
                      Month
                    </option>
                    {monthList.map((month) => {
                      return (
                        <option value={month} key={month}>
                          {month}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="day"
                    className={warningDetector("day")}
                    value={valueProvider("day")}
                    disabled={checkIsDisable("day")}
                    onChange={handleInputChange}>
                    <option value="" hidden>
                      Day
                    </option>
                    {dayList.map((day) => {
                      return (
                        <option value={day} key={day}>
                          {day}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <select
                    name="gender"
                    className={warningDetector("gender")}
                    value={valueProvider("gender")}
                    disabled={checkIsDisable("gender")}
                    onChange={handleInputChange}>
                    <option value="" hidden>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </form>
            <h3>Residence Information</h3>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className={warningDetector("address")}
                  value={valueProvider("address")}
                  disabled={checkIsDisable("address")}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className={warningDetector("city")}
                  value={valueProvider("city")}
                  disabled={checkIsDisable("city")}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className={warningDetector("state")}
                  value={valueProvider("state")}
                  disabled={checkIsDisable("state")}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Zip/Postal code"
                  name="zipCode"
                  className={warningDetector("zipCode")}
                  value={valueProvider("zipCode")}
                  disabled={checkIsDisable("zipCode")}
                  onChange={handleInputChange}
                  onBlur={handleZipCodeOnBlue}
                />
              </div>
            </form>
            <h3>User Information</h3>
            <p>
              Your username must be small letter and underscore _ then your favorite
              numbers.
            </p>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="user_123"
                  name="username"
                  className={warningDetector("username")}
                  value={valueProvider("username")}
                  disabled={checkIsDisable("username")}
                  onChange={handleInputChange}
                />
                <div className="username-container">
                  <input
                    type="text"
                    placeholder="user_123"
                    value={valueProvider("username")}
                    disabled
                  />
                  <p>
                    <span>@</span> <span>micple.com</span>
                  </p>
                </div>
              </div>
            </form>
            <form>
              <div className="phone-container">
                <div>
                  <input
                    className={!input?.country ? "warning" : ""}
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={valueProvider("country")}
                    disabled={true}
                  />
                </div>
                <div>
                  <input
                    className={`country-code ${!input?.dialCode ? "warning" : ""}`}
                    type="text"
                    placeholder="Country code"
                    value={valueProvider("dialCode")}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="123 456 7890"
                    name="phone"
                    className={warningDetector("phone")}
                    value={valueProvider("phone")}
                    disabled={checkIsDisable("phone")}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
            <p>
              Your password must be 8 within 12 digit, If you use * uppercase .
              number @ lowercase # (In this case your password will be more strong)
            </p>
            <form>
              <div className="password-container">
                <div className="new-password">
                  <input
                    type={condition.showPassword ? "text" : "password"}
                    placeholder="New password"
                    name="password"
                    className={warningDetector("password")}
                    value={valueProvider("password")}
                    disabled={checkIsDisable("password")}
                    onChange={handleInputChange}
                  />
                  <div className="eye-icon-container">
                    <span className={condition.showPassword ? "show-password" : ""}>
                      <AiFillEye
                        onClick={() =>
                          setCondition((pre) => {
                            return {
                              ...pre,
                              showPassword: !pre.showPassword,
                            };
                          })
                        }
                      />
                    </span>
                  </div>
                </div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  className={warningDetector("confirmPassword")}
                  value={valueProvider("confirmPassword")}
                  disabled={checkIsDisable("confirmPassword")}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </>
        }
        {
          step === 2 &&
          <RegistationidCard
            warningDetector={warningDetector}
            handleInputChange={handleInputChange}
            handleSelectTermBtn={handleSelectTermBtn}
            currentCamera={currentCamera}
            setCurrentCamera={setCurrentCamera}
            currentClick={currentClick}
            setCurrentClick={setCurrentClick}
            input={input}
            setInput={setInput}
            faceIdCard={faceIdCard}
            setFaceIdCard={setFaceIdCard}
            warning={warning}
            setWarning={setWarning}
            user={user}
            activeField={activeField}
            setActiveField={setActiveField}
            disableProperty={disableProperty}
            setDisableProperty={setDisableProperty}
          />}
      </section>

      {step === 1 && <section className="submit-container">
        <div className="submit-btn-area">
          {!condition.isSubmit ? (
            <button
              onClick={() => {
                setStep(prev => prev + 1)
                setActiveField(prev => { return { ...prev, next: 'front' } })
              }}
              disabled={input?.confirmPassword && input?.confirmPassword === input?.password ? false : true}
            >
              Next
            </button>
          ) : (
            <button disabled={true}>Submit</button>
          )}
        </div>
      </section>}

      {step === 2 && <section className="submit-container">
        {!user?.username && <div className="terms-area">
          <input
            type="checkbox"
            name="agreeTermsAndCondition"
            disabled={
              faceIdCard.front.img && faceIdCard.back.img
                ? false
                : true}
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
            By checking this box, I confirm that I have read, understand and
            agree to the <Link to="/privacy">Terms of Agreement </Link> and
            Privacy Policy.
          </p>
        </div>}
        <div className="submit-btn-area">
          {!condition.isSubmit ? (
            <button
              disabled={user?.username || input?.agreeTermsAndCondition ? false : true}
              onClick={() => user?.username ? infoResubmit() : submitForm()}>
              Submit
            </button>
          ) : (
            <button disabled={true}>Submit</button>
          )}
        </div>
      </section>}
    </div>
  );
};

export default Index;
