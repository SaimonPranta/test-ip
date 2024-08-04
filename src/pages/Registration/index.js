/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import "./style.scss";
import mainLogo from "../../assets/REG-logo.png";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { yearList, monthList, dayList } from "./helper/utilities/dateGenerator";
import {
  stringValidator,
  zipCodeValidator,
  userNameValidator,
  phoneNumberValidator,
} from "./helper/utilities/inputValidator";
import { inputFlowList } from "./helper/constant/inputFlow";
import { stringInputType } from "./helper/constant/inputType";
import { useDispatch, useSelector } from "react-redux";
import { getSiteInfo } from "../../store/site/action";
import { BACKEND_URL } from "../../shared/constants/Variables";
import axios from "axios";
import { randomNumberGenerator } from "./helper/utilities/getRendomNumber";
import { REGISTER } from "../../store/auth/action";
import { el, is } from "date-fns/locale";
import { getUser } from "../../gardes/UserAuthGard/Hooks/getUser/index.js";
import { set } from "date-fns";
import InfoWrapper from "./Modal/InfoWrapper";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import useFirebaseAuth from "../../../src/Hooks/useFirebaseConfig.js";
// import { auth } from "../../../firebase.config.js";

const Index = () => {
  const [isLoading] = getUser();
  const {
    auth: { user },
  } = useSelector((state) => state);

  const [condition, setCondition] = useState({
    showPassword: false,
    isSubmit: false,
    isLoadingPage: false,
  });
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({});
  const [warning, setWarning] = useState({});
  const [otpResponse, setOtpResponse] = useState(null);
  const [numberVerify, setNumberVerify] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otpProcess, setOtpProcess] = useState(false);

  const [auth, setAuth] = useFirebaseAuth();

  const [activeField, setActiveField] = useState({
    current: "firstName",
    next: "",
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

  const searchParams = new URLSearchParams(useLocation()?.search);
  const referBy = searchParams.get("ref");

  useEffect(() => {
    let calling = false;
    const calApi = () => {
      if (calling) {
        return;
      }
      if (referBy) {
        calling = true;
        setInput((prev) => {
          return {
            ...prev,
            referBy: referBy,
          };
        });
        axios
          .put(`${BACKEND_URL}/user/auth/referral/click`, { referBy: referBy })
          .then((data) => console.log(data.data));
      }
    };
    const timeout = setTimeout(calApi, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [referBy]);

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
    if (checkIsDisable(name)) {
      return;
    }
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

    if (name === "nidNumber") {
      if (value.length < 3) {
        setWarning(name);
        setActiveField((state) => {
          return {
            next: "",
            current: name,
          };
        });
        return setInput((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      } else {
        setWarning("");
        setActiveField((state) => {
          return {
            next: "phone",
            current: name,
          };
        });
        return setInput((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
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
                  next: "nidNumber",
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

    if (name === "phone" && value.length < 3) {
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
  console.log("warning ====>>>", warning);
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
        next: "nidNumber",
      });
    }
  };

  const submitForm = async () => {
    if (!numberVerify) {
      return;
    }

    const propertyRemoveList = await [
      "day",
      "month",
      "year",
      "agreeTermsAndCondition",
    ];

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
      await axios
        .post(`${BACKEND_URL}/user/auth/signup`, body)
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
            // window.location.href = `/${data.data.user.username}`
            history.push(`/${data.data.user.username}`);
          }
        })
        .catch((error) => {
          console.log(error);
          setCondition((state) => {
            return {
              ...state,
              isSubmit: false,
            };
          });
        });
    }
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

  const addRecaptchaContainer = () => {
    const recaptchaParent = document.getElementById("recaptcha-parent");
    const recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "recaptcha-container";
    recaptchaParent.appendChild(recaptchaContainer);
  };

  const removeRecaptchaContainer = () => {
    const recaptchaParent = document.getElementById("recaptcha-parent");
    const recaptchaContainer = document.getElementById("recaptcha-container");
    recaptchaParent.removeChild(recaptchaContainer);
  };

  const recaptcha = async () => {
    if (!input?.phone || !input?.dialCode) {
      return;
    }
    try {
      addRecaptchaContainer();
      setOtpSend(true);

      window.recaptchaVerifier = await new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
        }
      );
      await sendPhoneOtp();
    } catch (error) {
      setOtpSend(false);
      console.log("firebase phone auth error=====>", error);
      removeRecaptchaContainer();
    }
  };

  const sendPhoneOtp = () => {
    const phoneNumber = input.dialCode + input.phone;

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setOtpResponse(confirmationResult);
        setOtpSend(false);
        removeRecaptchaContainer();
      })
      .catch((error) => {
        setOtpSend(false);
        removeRecaptchaContainer();
        console.log("firebase phone auth error=====>", error);
      });
  };

  const verifyOtp = () => {
    if (otp.length >= 6) {
      setOtpProcess(true);
      setOtpError(false);
      otpResponse
        .confirm(otp)
        .then((result) => {
          setNumberVerify(true);
          setOtpProcess(false);
          setOtp("");
          setOtpError(false);
        })
        .catch((error) => {
          console.log("otp verify error", error);
          setOtpError(true);
          setOtpProcess(false);
        });
    } else {
      setOtpError(false);
    }
  };

  const resend = () => {
    recaptcha();
    setOtpError(false);
    setOtpProcess(false);
    setOtp("");
  };

  if (condition?.isLoadingPage || isLoading) {
    return <></>;
  }
  if (user.username) {
    return <Redirect to={`/${user?.username}`} />;
  }

  return (
    <>
      <div
        className="sing-up container"
        onPaste={handleRemoveCopyPast}
        onCopy={handleRemoveCopyPast}
        onKeyDown={handleRemoveUnusualKey}
      >
        <section className="logo">
          <Link to="/">
            <img src={mainLogo} alt="" />
          </Link>
        </section>

        <section className="form-container">
          {step === 1 && (
            <>
              <h3>Personal Information</h3>
              <form>
                <div>
                  <div className="info-wrapper">
                    <input
                      className={warningDetector("firstName")}
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={valueProvider("firstName")}
                      disabled={checkIsDisable("firstName")}
                      onChange={handleInputChange}
                    />
                    <InfoWrapper name={"firstName"} />
                  </div>
                  <div className="info-wrapper">
                    <input
                      className={warningDetector("lastName")}
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={valueProvider("lastName")}
                      disabled={checkIsDisable("lastName")}
                      onChange={handleInputChange}
                    />
                    <InfoWrapper name={"lastName"} />
                  </div>
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
                  <div className="info-wrapper">
                    <div className="date-of-birth">
                      <select
                        name="year"
                        className={warningDetector("year")}
                        value={valueProvider("year")}
                        disabled={checkIsDisable("year")}
                        onChange={handleInputChange}
                      >
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
                        onChange={handleInputChange}
                      >
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
                        onChange={handleInputChange}
                      >
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
                      <InfoWrapper name={"dateOfBirth"} />
                    </div>
                  </div>
                  <div className="info-wrapper">
                    <div>
                      <select
                        name="gender"
                        className={warningDetector("gender")}
                        value={valueProvider("gender")}
                        disabled={checkIsDisable("gender")}
                        onChange={handleInputChange}
                      >
                        <option value="" hidden>
                          Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
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
                Your username must be small letter and underscore _ then your
                favorite numbers.
              </p>
              <form>
                <div>
                  <div className="username-container">
                    <input
                      type="text"
                      placeholder="user_123"
                      name="username"
                      className={warningDetector("username")}
                      value={valueProvider("username")}
                      // disabled={checkIsDisable("username")}
                      // onChange={handleInputChange}
                      disabled={true}
                    />
                    <p>
                      <span>@</span> <span>micple.com</span>
                    </p>
                  </div>
                  <div className="info-wrapper">
                    <input
                      type="text"
                      placeholder="Enter Your National ID/SSN Number"
                      name="nidNumber"
                      className={warningDetector("nidNumber")}
                      value={valueProvider("nidNumber")}
                      disabled={checkIsDisable("nidNumber")}
                      onChange={handleInputChange}
                    />
                    <InfoWrapper name={"nidNumber"} />
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
                  <div className="number-otp-container">
                    {otpResponse ? (
                      <>
                        <div className="otp-container">
                          <input
                            type="number"
                            disabled={otpProcess || numberVerify}
                            className={`${
                              otpError ? "warning" : ""
                            } grow-input`}
                            placeholder={
                              numberVerify ? "Verify Successfully" : "Enter OTP"
                            }
                            maxLength={6}
                            value={otp}
                            onChange={(e) => {
                              // verifyOtp(e.target.value)
                              setOtpError(false);
                              setOtp(e.target.value);
                            }}
                          />
                          <span
                            onClick={
                              numberVerify || otp.length < 6 ? "" : verifyOtp
                            }
                            className={`otp-btn ${
                              otpProcess || numberVerify || otp.length < 6
                                ? "disable"
                                : ""
                            }`}
                          >
                            Verify
                          </span>
                        </div>
                        <span
                          onClick={numberVerify ? "" : resend}
                          className={`resend-button otp-btn ${
                            numberVerify ? "disable" : ""
                          }`}
                        >
                          Resend
                        </span>
                        <span
                          onClick={() =>
                            numberVerify ? "" : setOtpResponse(null)
                          }
                          className={`otp-btn ${numberVerify ? "disable" : ""}`}
                        >
                          Change Number
                        </span>
                      </>
                    ) : (
                      <>
                        <input
                          className={`country-code ${
                            !input?.dialCode ? "warning" : ""
                          }`}
                          type="text"
                          placeholder="Country code"
                          value={valueProvider("dialCode")}
                          disabled
                        />
                        <input
                          type="text"
                          placeholder="123 456 7890"
                          name="phone"
                          className={`${warningDetector("phone")} grow-input`}
                          value={valueProvider("phone")}
                          disabled={checkIsDisable("phone")}
                          onChange={handleInputChange}
                        />
                        <span
                          onClick={() =>
                            !otpSend && !warningDetector("phone")
                              ? recaptcha()
                              : ""
                          }
                          className={`otp-btn ${
                            !otpSend && !warningDetector("phone")
                              ? ""
                              : "disable"
                          }`}
                        >
                          GET OTP
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </form>
              <p>
                Your password must be 8 within 12 digit, If you use * uppercase
                . number @ lowercase # (In this case your password will be more
                strong)
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
                      disabled={numberVerify ? false : true}
                      onChange={handleInputChange}
                    />
                    <div className="eye-icon-container">
                      <span
                        className={
                          condition.showPassword ? "show-password" : ""
                        }
                      >
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
          )}
        </section>

        {
          <section className="submit-container">
            {!user?.username && (
              <div className="terms-area">
                <input
                  type="checkbox"
                  name="agreeTermsAndCondition"
                  disabled={
                    input?.confirmPassword?.length > 1 &&
                    input?.confirmPassword === input.password
                      ? false
                      : true
                  }
                  onClick={(e) => {
                    handleSelectTermBtn(e);
                    setActiveField({
                      current: "",
                      next: "",
                    });
                  }}
                />
                <p className="terms-and-condition">
                  {" "}
                  By checking this box, I confirm that I have read, understand
                  and agree to the{" "}
                  <Link to="/privacy">Terms of Agreement </Link> and Privacy
                  Policy.
                </p>
              </div>
            )}
            <div className="submit-btn-area">
              {!condition.isSubmit ? (
                <button
                  disabled={
                    user?.username || input?.agreeTermsAndCondition
                      ? false
                      : true
                  }
                  onClick={() => submitForm()}
                >
                  Submit
                </button>
              ) : (
                <button disabled={true}>Submit</button>
              )}
            </div>
          </section>
        }
      </div>
      <div id="recaptcha-parent"></div>
    </>
  );
};

export default Index;
