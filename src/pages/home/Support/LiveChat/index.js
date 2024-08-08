/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { BsImages } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { FaAngleDown, FaRegUserCircle } from "react-icons/fa";
import socket from "../../../../sockets";
import { getPhoneNumber, setPhoneNumber } from "./helper/utillites";
import { useSelector } from "react-redux";
import { NUMBER_REGEX } from "./../../../../shared/constants/RegEx";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { SupportIcon } from "../../../../assets/home";
import { convertToDate } from "../../../../shared/functions/timeConverter";
import { convertToPlainText } from "../../../../shared/functions/textConverter";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../../../firebase.config";
import { getChatMedia } from "../../../../shared/functions";
import { subjectArray } from "./constant/index";
import axios from "axios";
import { BACKEND_URL } from "../../../../shared/constants/Variables";
import useFirebaseAuth from "../../../../Hooks/useFirebaseConfig";

const Index = ({ setModals, modals }) => {
  const [message, setMessage] = useState("");
  const [clientInfo, setClientInfo] = useState({});
  const [input, setInput] = useState({});
  const [chatInfo, setChatInfo] = useState(null);
  const [otpResponse, setOtpResponse] = useState(null);
  const [numberVerify, setNumberVerify] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [otpProcess, setOtpProcess] = useState(false);
  const [selectMedia, setSelectMedia] = useState([]);
  const [adminMessageSeen, setAdminMessageSeen] = useState(false);
  const [adminTyping, setAdminTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatSubject, setShowChatSubject] = useState(false);
  const [fullScreenMedia, setFullScreenMedia] = useState(null);
  const [showAllChatlist, setShowAllChatlist] = useState(false);
  // const [auth, setAuth] = useFirebaseAuth();

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

  const recaptcha = async (e) => {
    e?.preventDefault();

    if (!input?.phoneNumber && !dialCode) {
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
      removeRecaptchaContainer();
    }
  };

  const sendPhoneOtp = () => {
    const phoneNumber = dialCode + input.phoneNumber;
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setOtpResponse(confirmationResult);
        setOtpSend(false);
        removeRecaptchaContainer();
      })
      .catch((error) => {
        setOtpSend(false);
        removeRecaptchaContainer();
      });
  };

  const verifyOtp = (otp) => {
    if (otp.length === 6) {
      setOtpProcess(true);
      otpResponse
        .confirm(otp)
        .then((result) => {
          setNumberVerify(true);
          setOtpProcess(false);
          submitPhoneNumber();
          removeRecaptchaContainer();
        })
        .catch((error) => {
          setOtpError(true);
          setOtpProcess(false);
          removeRecaptchaContainer();
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
  const scrollTopRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [
    chatInfo,
    selectMedia,
    adminMessageSeen,
    adminTyping,
    chatInfo?.messages,
  ]);

  useEffect(() => {
    if (chatInfo?._id && !chatInfo?.messages) {
      axios.get(`${BACKEND_URL}/support/${chatInfo._id}`).then((data) => {
        setChatInfo(data.data);
      });
    }
  }, [chatInfo]);

  useEffect(() => {
    if (chatInfo?._id) {
      socket.emit("join chat", chatInfo._id);
    }
  }, [chatInfo]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (message || selectMedia.length > 0) {
      let data = {};
      if (message) {
        data["message"] = message;
      }
      if (selectMedia.length > 0) {
        data["media"] = selectMedia;
      }
      data["chatId"] = chatInfo._id;
      socket.emit("send message", data);
      setMessage("");
      setSelectMedia([]);
    }
  };

  const getMessage = (data) => {
    if (data?.chatId.toString() === chatInfo?._id.toString()) {
      setAdminTyping(false);
      setChatInfo((state) => {
        return {
          ...state,
          messages: [...state.messages, data.message],
        };
      });
    }
  };
  const deleteMessage = (data) => {
    if (data?.chatId.toString() === chatInfo?._id.toString()) {
      setChatInfo((state) => {
        return {
          ...state,
          messages: state.messages.filter(
            (item) => item._id !== data.messageId
          ),
        };
      });
    }
  };
  const adminSeenChat = (chatId) => {
    if (chatId.toString() === chatInfo?._id.toString()) {
      setAdminMessageSeen(true);
    }
  };
  const adminType = (data) => {
    if (data?.chatId.toString() === chatInfo?._id.toString()) {
      setAdminTyping(data.type);
    }
  };
  const changeChatSubject = (subject) => {
    setShowChatSubject(false);
    setShowAllChatlist(false);
    initializeChat({ target: { value: subject } });
  };
  const subjectChange = (data) => {
    if (data?.chatId.toString() === chatInfo?._id.toString()) {
      setChatInfo((state) => {
        return {
          ...state,
          currentChatSubject: data.subject,
        };
      });
    }
  };

  useEffect(() => {
    socket.on("get-message-user", getMessage);
    socket.on("delete-message-user", deleteMessage);
    socket.on("admin-seen-chat", adminSeenChat);
    socket.on("admin-typing-message", adminType);
    socket.on("change-chat-subject", subjectChange);

    return () => {
      socket.off("get-message-user", getMessage);
      socket.off("delete-message-user", deleteMessage);
      socket.off("admin-seen-chat", adminSeenChat);
      socket.off("admin-typing-message", adminType);
      socket.off("change-chat-subject", subjectChange);
    };
  }, [getMessage, deleteMessage, adminSeenChat, adminType, subjectChange]);

  const initializeChat = (e) => {
    if (!country?.name || !dialCode || !e.target.value || !input?.phoneNumber)
      return;
    const chatSubject = e.target.value;
    let data = {};
    if (username) {
      data["username"] = username;
    }
    setAdminMessageSeen(false);
    axios
      .post(`${BACKEND_URL}/support/initialize-chat`, {
        phoneNumber: dialCode + input.phoneNumber,
        chatSubject,
        country: country?.name,
        ...data,
      })
      .then((res) => {
        setChatInfo(res.data);
      });
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

  const getMoreMessages = () => {
   
    if (chatInfo?.messages.length < chatInfo?.totalMessage) {
      axios
        .get(
          `${BACKEND_URL}/support/get-more-message/${chatInfo._id}?skip=${chatInfo?.messages.length}`
        )
        .then((data) => {
          setChatInfo((prev) => {
            return {
              ...prev,
              messages: [...data.data?.messages, ...prev.messages],
            };
          });
        });
    }
  };
  const onChangeMedia = (e) => {
    const file = e.target.files[0];
    if (
      file.type.includes("image") ||
      file.type.includes("video") ||
      file.type.includes("audio") ||
      file.type.includes("pdf")
    ) {
      setSelectMedia((prev) => {
        return [
          ...prev,
          {
            media: file,
            type: file?.type,
            name: file?.name,
            size: file?.size,
            date: new Date().toISOString(),
          },
        ];
      });
    }
  };
  const messageTyping = () => {
    if (!isTyping && chatInfo?._id) {
      setIsTyping(true);
      socket.emit("user-typing-message", { chatId: chatInfo._id, type: true });
      setTimeout(() => {
        setIsTyping(false);
        socket.emit("user-typing-message", {
          chatId: chatInfo._id,
          type: false,
        });
      }, 3000);
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.target.scrollTop === 0) {
        getMoreMessages();
      }
    };
    const div = scrollTopRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScroll);
      }
    };
  }, [getMoreMessages]);

  return (
    <>
      <div
        className={`live-chat-container ${
          modals === "SupportChat" ? "open" : ""
        }`}
      ></div>
      <div className={`live-chat ${modals === "SupportChat" ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="chat-title">
              {chatInfo?.phoneNumber ? (
                <>
                  <h6>Hi, {username || chatInfo.phoneNumber}</h6>
                </>
              ) : (
                <h6>Welcome to Live Chat</h6>
              )}
              <button className="close-btn" onClick={() => setModals("")}>
                x
              </button>

              {chatInfo?.messages && (
                <div className="arrow-div">
                  <div
                    className={`all-chat-list ${
                      showAllChatlist ? "open" : "close"
                    }`}
                  >
                    <ul>
                      {subjectArray.map((item, index) => {
                        return (
                          <li
                            onClick={() => changeChatSubject(item.label)}
                            key={index}
                            className={
                              item.label === chatInfo?.currentChatSubject
                                ? "active"
                                : ""
                            }
                          >
                            {convertToPlainText(item.label)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    onClick={() => setShowAllChatlist((prev) => !prev)}
                    className="select"
                  >
                    {chatInfo?.currentChatSubject.replaceAll("_", " ")}
                    <FaAngleDown />
                  </div>
                </div>
              )}
              {/* {showChatSubject && chatInfo?.messages && <ul>
              {subjectArray.map((item, index) => {
                return (
                  <li onClick={() => changeChatSubject(item.label)} key={index} className={item.label === chatInfo?.currentChatSubject ? 'active' : ''}>
                    {convertToPlainText(item.label)}
                  </li>
                );
              })}
            </ul>}

            {!showChatSubject && chatInfo?.messages && <div
              onClick={() => setShowChatSubject(prev => !prev)}
              className="arrow-div">
              {convertToPlainText(chatInfo?.currentChatSubject)}
              <FaAngleDown />
            </div>} */}
            </div>
            {!chatInfo && (
              <>
                {new Array(1).fill().map((msg, index) => {
                  return (
                    <div
                      className={`message-container phone-number-enable user`}
                      key={index}
                    >
                      {!input?.isValidPhoneNumber && (
                        <>
                          {!otpResponse ? (
                            <div className="phone-field">
                              <>
                                <form onSubmit={recaptcha}>
                                  <span>{dialCode}</span>
                                  <input
                                    type="text"
                                    name="phoneNumber"
                                    value={
                                      input?.phoneNumber
                                        ? input.phoneNumber
                                        : ""
                                    }
                                    placeholder="123 456 7890"
                                    onChange={handleInputChange}
                                  />
                                </form>
                                <button
                                  onClick={recaptcha}
                                  disabled={otpSend}
                                  className={
                                    input?.phoneNumber?.length >= 4 && !otpSend
                                      ? "active"
                                      : ""
                                  }
                                >
                                  Get OTP
                                </button>
                              </>
                            </div>
                          ) : (
                            <div className="otp-container">
                              <button onClick={resend}>Resend</button>
                              <button onClick={() => setOtpResponse(null)}>
                                Change Number
                              </button>
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
                                onClick={() => verifyOtp(otp)}
                              >
                                Verify
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {input?.isValidPhoneNumber && !chatInfo && (
                        <div className="select-field">
                          <select onChange={initializeChat}>
                            <option hidden>
                              --Select Your Conversation Topic--
                            </option>
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
          </div>
        </div>
        <div ref={scrollTopRef} className="chat-container-area">
          {chatInfo && chatInfo?.messages && (
            <>
              {chatInfo?.messages.map((msg) => {
                return (
                  <div
                    className={`message-container ${
                      msg.sendByUser ? "user" : ""
                    }  `}
                    ref={scrollRef}
                    key={msg._id}
                  >
                    <div className="icon-container">
                      <img src={SupportIcon} alt="" className="support-icon" />
                      {/* <FcOnlineSupport className="support-icon" /> */}
                      <FaRegUserCircle className="user-icon" />
                    </div>
                    <div className="message">
                      {msg.media &&
                        msg.media.length > 0 &&
                        msg.media.map((media, index) => {
                          return (
                            <div
                              className={`msg-media ${
                                msg.sendByUser ? "user" : ""
                              }`}
                            >
                              {media?.mediaType?.includes("image") && (
                                <img
                                  onClick={() =>
                                    setFullScreenMedia({
                                      url: media.mediaUrl,
                                      id: chatInfo._id,
                                    })
                                  }
                                  src={getChatMedia(
                                    media.mediaUrl,
                                    chatInfo._id
                                  )}
                                  alt="media"
                                />
                              )}
                              {media?.mediaType?.includes("video") && (
                                <video
                                  src={getChatMedia(
                                    media.mediaUrl,
                                    chatInfo._id
                                  )}
                                  controls
                                ></video>
                              )}
                              {media?.mediaType?.includes("audio") && (
                                <audio
                                  src={getChatMedia(
                                    media.mediaUrl,
                                    chatInfo._id
                                  )}
                                  controls
                                ></audio>
                              )}
                              {media?.mediaType?.includes("pdf") && (
                                <iframe
                                  src={getChatMedia(
                                    media.mediaUrl,
                                    chatInfo._id
                                  )}
                                ></iframe>
                              )}
                            </div>
                          );
                        })}
                      {msg?.message && <p>{msg.message}</p>}
                      <span>{convertToDate(msg.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
              {!adminMessageSeen && chatInfo && (
                <div
                  ref={scrollRef}
                  className={`message-container representative`}
                >
                  <div className="icon-container">
                    <img src={SupportIcon} alt="" className="support-icon" />
                    {/* <FcOnlineSupport className="support-icon" /> */}
                    <FaRegUserCircle className="user-icon" />
                  </div>
                  <div className="message">
                    <p className="looking">
                      We are looking a representative{" "}
                      <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </p>
                  </div>
                </div>
              )}
              {adminTyping && chatInfo && (
                <div
                  ref={scrollRef}
                  className={`message-container representative`}
                >
                  <div className="icon-container">
                    <img src={SupportIcon} alt="" className="support-icon" />
                    {/* <FcOnlineSupport className="support-icon" /> */}
                    <FaRegUserCircle className="user-icon" />
                  </div>
                  <div className="message">
                    <p className="looking">
                      <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {chatInfo && (
          <div className="chat-footer">
            {selectMedia.length > 0 && (
              <div className="selected-media-container">
                {selectMedia.map((media, index) => {
                  return (
                    <div key={index} className="media">
                      <MdDelete
                        onClick={() => {
                          setSelectMedia((prev) =>
                            prev.filter((item, i) => i !== index)
                          );
                        }}
                        className="close-icon"
                      />
                      {media?.type?.includes("image") && (
                        <img
                          src={URL.createObjectURL(media.media)}
                          alt="media"
                        />
                      )}
                      {media?.type?.includes("video") && (
                        <video
                          src={URL.createObjectURL(media.media)}
                          controls
                        ></video>
                      )}
                      {media?.type?.includes("audio") && (
                        <audio
                          src={URL.createObjectURL(media.media)}
                          controls
                        ></audio>
                      )}
                      {media?.type?.includes("pdf") && (
                        <iframe src={URL.createObjectURL(media.media)}></iframe>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="input-form-container">
              <form onSubmit={submitMessage}>
                <div className="img-container">
                  <label htmlFor="chat-media-input">
                    <BsImages />
                  </label>
                </div>
                <input
                  onChange={(e) => {
                    messageTyping();
                    setMessage(e.target.value);
                  }}
                  value={message}
                  type="text"
                  placeholder="Type your message here"
                />
                <button type="submit">
                  <AiOutlineSend />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <input
        onChange={onChangeMedia}
        type="file"
        name="chat-media-input"
        id="chat-media-input"
      />

      {fullScreenMedia && (
        <div className="full-screen-media">
          <img
            src={getChatMedia(fullScreenMedia.url, fullScreenMedia.id)}
            alt="media"
          />
          <IoClose onClick={() => setFullScreenMedia(null)} />
        </div>
      )}
      <div id="recaptcha-parent"></div>
    </>
  );
};

export default Index;
