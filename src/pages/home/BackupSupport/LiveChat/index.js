import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { BsImages } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import socket from "../../../../sockets";
import { getPhoneNumber, setPhoneNumber } from "./helper/utillites";
import { useSelector } from "react-redux";
import { NUMBER_REGEX } from "../../../../shared/constants/RegEx";
import {
  SupportIcon,
} from "../../../../assets/home";
import { convertToDate } from '../../../../shared/functions/timeConverter';
import { convertToPlainText } from '../../../../shared/functions/textConverter';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../../firebase.config";


const subjectArray = [
  {
    label: "Username_Issue",
  },
  {
    label: "Password_Issue",
  },
  {
    label: "Profile_Issue",
  },
  {
    label: "Reports_Issue",
  },
  {
    label: "Mail_Issue",
  },
  {
    label: "Messenger_Issue",
  },
  {
    label: "Reports_Issue",
  },
  {
    label: "Watch_Issue",
  },
  {
    label: "Store_Issue",
  },
  {
    label: "Campaigns_Issue",
  },
  {
    label: "Shortener_Issue",
  },
  {
    label: "Looker_Issue",
    value: "lookerIssue",
  },
  {
    label: "Shareplace_Issue",
  },
  {
    label: "Laboratory_Issue",
  },
  {
    label: "Assistant_Issue",
  },
  {
    label: "Investor_Issue",
  },
];

const Index = ({ setModals, modals }) => {
  const [message, setMessage] = useState([]);
  const [clientInfo, setClientInfo] = useState({});
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [input, setInput] = useState({});
  const [otpResponse, setOtpResponse] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberVerify, setNumberVerify] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSend, setOtpSend] = useState(false)
  const [otpProcess, setOtpProcess] = useState(false);



  const submitPhoneNumber = (e) => {

    if (input.phoneNumber.length !== 10 || !country?.name || !dialCode) {
      return;
    }
    setInput((state) => {
      return {
        ...state,
        isValidPhoneNumber: true,
      };
    });
  };



  const addRecaptchaContainer = () => {
    const recaptchaParent = document.getElementById('recaptcha-parent')
    const recaptchaContainer = document.createElement('div')
    recaptchaContainer.id = 'recaptcha-container'
    recaptchaParent.appendChild(recaptchaContainer)
  }

  const removeRecaptchaContainer = () => {
    const recaptchaParent = document.getElementById('recaptcha-parent')
    const recaptchaContainer = document.getElementById('recaptcha-container')
    recaptchaParent.removeChild(recaptchaContainer)
  }

  const recaptcha = async (e) => {

    e?.preventDefault()

    if (!input?.phoneNumber && !dialCode) {
      return
    }
    try {
      addRecaptchaContainer()
      setOtpSend(true)

      window.recaptchaVerifier = await new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => { },
        });
      await sendPhoneOtp()
    } catch (error) {
      setOtpSend(false)
      removeRecaptchaContainer()
    }
  }

  const sendPhoneOtp = () => {
    const phoneNumber = dialCode + input.phoneNumber;
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setOtpResponse(confirmationResult)
        setOtpSend(false)
        removeRecaptchaContainer()
      })
      .catch((error) => {
        setOtpSend(false)
        removeRecaptchaContainer()
      });
  }

  const verifyOtp = (otp) => {
    if (otp.length === 6) {
      setOtpProcess(true)
      otpResponse.confirm(otp)
        .then((result) => {
          setNumberVerify(true)
          setOtpProcess(false)
          submitPhoneNumber()
          removeRecaptchaContainer()
        })
        .catch((error) => {
          setOtpError(true)
          setOtpProcess(false)
          removeRecaptchaContainer()
        });
    }
    else {
      setOtpError(false)
    }
  }

  const resend = () => {
    recaptcha()
    setOtpError(false)
    setOtpProcess(false)
    setOtp('')
  }



  const {
    site: {
      dialCode,
      location: { country },
    },
    auth: {
      user: { username, name },
    },
  } = useSelector((state) => state);
  const scrollRef = useRef();


  useEffect(() => {
    const phoneNumber = getPhoneNumber() || input?.phoneNumber;

    if (phoneNumber && !isFirstRender) {
      socket.emit("get-message", { phoneNumber });
    }

    return () => {
      socket.emit("remove-user");
    };
  }, [input?.phoneNumber]);

   

  useEffect(() => {
    socket.on("get-message", (msg) => {
      // debouncedCallback();
      if (msg?._id) {
        setIsFirstRender(true)
        if (!clientInfo?._id) {
          const data = { ...msg };
          setClientInfo({ ...data });
        }
        setMessage((state) => {
          return [...state, ...msg.messages];
        });
      }
    });
  }, []);

  useEffect(() => {
    // scrollToBottom()
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const submitInitialMessage = (e) => {
    const chatSubject = e.target.value;
    input["chatSubject"] = chatSubject;
    if (
      input.phoneNumber.length !== 10 ||
      !dialCode ||
      !country?.name ||
      !chatSubject
    ) {
      return;
    }
    const phoneNumber = `${dialCode}${input?.phoneNumber}`;
    socket.emit("send-message", {
      phoneNumber: phoneNumber,
      username: username ? username : "",
      fullName: name.length ? name?.join(" ") : "",
      chatSubject: chatSubject,
      country: country?.name,
    });
    setPhoneNumber(phoneNumber);
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (input.message) {
      socket.emit("send-message", {
        ...input,
        ...clientInfo,
        chatSubject: clientInfo.lastChatSubject,
        username: username ? username : "",
        fullName: name.length ? name?.join(" ") : "",
      });
      setInput({});
    }
  };


  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "phoneNumber") {
      const isContinue = NUMBER_REGEX.test(value);
      if (value.length && !isContinue) {
        return;
      }
      if (value.toString().length > 10) {
        return;
      }
    }

    setInput((state) => {
      return {
        [name]: value,
      };
    });
  };

  const getChatMedia = (pathName, chatId) => {
    if (!pathName || !chatId) return  
    const back =
      process.env.NODE_ENV === "development"
        ? "http://127.0.0.1:2300"
        : "https://backend.cloud.micple.com";
    return `${back}/i/support-media/${chatId}/${pathName}`;
  }


  // function scrollToBottom() {
  //   const chatContainer = document.getElementById("chat-container");
  //   chatContainer.scrollTop = chatContainer.scrollHeight;
  // }
  return (
    <>
      <div className={`live-chat-container ${modals === "SupportChat" ? 'open' : ''}`}>
      </div>
      <div className={`live-chat ${modals === "SupportChat" ? 'open' : ''}`}>
        <div className="chat-title">
          {clientInfo?.phoneNumber ? (
            <h6>Live Chat {clientInfo.phoneNumber}</h6>
          ) : (
            <h6>Welcome to Live Chat</h6>
          )}
          <button className="close-btn" onClick={() => setModals("")}>
            x
          </button>
        </div>
        <div className="chat-container-area">
          {dialCode && !clientInfo?.phoneNumber && (
            <>
              {new Array(1).fill().map((msg, index) => {
                return (
                  <div
                    className={`message-container phone-number-enable user`}
                    key={index}>
                    {!input?.isValidPhoneNumber &&
                      <>
                        {!otpResponse ? (
                          <div className="phone-field">
                            <>
                              <form onSubmit={recaptcha}>
                                <span>{dialCode}</span>
                                <input
                                  type="text"
                                  name="phoneNumber"
                                  value={input?.phoneNumber ? input.phoneNumber : ""}
                                  placeholder="123 456 7890"
                                  onChange={handleInputChange}
                                />
                              </form>
                              <button
                                onClick={recaptcha}
                                disabled={otpSend}
                                className={
                                  input?.phoneNumber?.length === 10 && !otpSend ? "active" : ""
                                }>
                                Get OTP
                              </button>
                            </>
                          </div>
                        )
                          :
                          <div className="otp-container">
                            <button
                              onClick={resend}
                            >Resend</button>
                            <button
                              onClick={() => setOtpResponse(null)}
                            >Change Number</button>
                            <input
                              type="number"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              maxLength={6}
                              disabled={otpProcess}
                              />
                             <button
                              disabled={otpProcess || otp.length !== 6}
                              onClick={() =>  verifyOtp(otp)}
                            >Verify</button>
                          </div>}
                      </>

                    }
                    {input?.isValidPhoneNumber && (
                      <div className="select-field">
                        <select onChange={submitInitialMessage}>
                          <option hidden>--Select Your Conversation Topic--</option>
                          {subjectArray.map((item, index) => {
                            return (
                              <option value={item.label} key={index}>
                                {convertToPlainText(item.label)}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
          {clientInfo.phoneNumber && message?.length > 0 && (
            <>
              {message.map((msg) => {
                return (
                  <div
                    className={`message-container ${msg.sendByMe ? "user" : ""
                      }  `}
                    ref={scrollRef}
                    key={msg._id}>
                    <div className="icon-container">
                      <img src={SupportIcon} alt="" className="support-icon" />
                      {/* <FcOnlineSupport className="support-icon" /> */}
                      <FaRegUserCircle className="user-icon" />
                    </div>
                    <div className="message">
                      {msg.media && msg.media.length > 0 && msg.media.map((media, index) => {
                        return (
                          <div className={`msg-media ${msg.sendByMe ? 'user' : ''}`}>
                            {media?.mediaType?.includes('image') && <img src={getChatMedia(media.mediaUrl, clientInfo._id)} alt="media" />}
                            {media?.mediaType?.includes('video') && <video src={getChatMedia(media.mediaUrl, clientInfo._id)} controls></video>}
                            {media?.mediaType?.includes('audio') && <audio src={getChatMedia(media.mediaUrl, clientInfo._id)} controls></audio>}
                            {media?.mediaType?.includes('pdf') && <iframe src={getChatMedia(media.mediaUrl, clientInfo._id)} alt></iframe>}
                          </div>
                        )
                      })}
                      {msg?.message && <p>{msg.message}</p>}
                      <span>{convertToDate(msg.date)}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {clientInfo?.phoneNumber && (
          <div className="input-form-container">
            <form onSubmit={submitMessage}>
              <div className="img-container">
                <BsImages />
              </div>
              <input
                onChange={(e) => {
                  setInput((state) => {
                    return {
                      ...state,
                      message: e.target.value,
                    };
                  });
                }}
                value={input?.message ? input.message : ""}
                type="text"
                placeholder="Type your message here"
              />
              <button type="submit">
                <AiOutlineSend />
              </button>
            </form>
          </div>
        )}
      </div>
      <div id="recaptcha-parent"></div>

    </>
  );
};

export default Index;
