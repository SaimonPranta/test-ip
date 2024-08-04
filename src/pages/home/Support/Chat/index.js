import React, { useState, useEffect, useRef } from "react";
import Scroll from "react-scroll-to-bottom";
import { connect } from "react-redux";

import {
  ringSentAlerm,
  ringReceivedAlerm,
} from "../../../../store/site/action";
import { readImage } from "../../../../shared/functions/Avatar";
import Tune from "../../../../assets/messages/Message.mp3";
import Avatar from "../../../../assets/profile/Male.png";
import { ManagerIcon } from "../../../../assets/home";
import { getUrl } from "../../../../shared/functions";
import { PhotoIcon } from "../../../../assets/media";
import { SideModalUI } from "../../styles";
import socket from "../../../../sockets";

function LiveChat({ close, dispatch, auth, site: { dialCode } }) {
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [number, setNumber] = useState("");
  const [allowForText, setallowForText] = useState(false);
  const [isNumberFieldActive, setIsNumberFieldActive] = useState(true);

  let messageRing = useRef();
  let supportMedia = useRef();
  function onSelect({ target }) {
    const file = target.files[0];
    if (!["jpg", "jpeg", "png"].includes(file.type.split("/")[1])) {
      setError("Invalid image type.");
    } else if (file.size > 1048576) {
      setError("Image is too large");
    } else {
      setImage(file);
    }
  }

  useEffect(() => {
socket.emit("hello" , {hello: "hello"})
    
  }, [])

  function givePermissionForText(e) {
    e.preventDefault();
    setIsNumberFieldActive(false);
    socket.emit("user_open_support_chat_for_text", (data) => {
      setMessages([data]);
    });

    setallowForText(true);
  }
  function chatUsOnSubmit(e) {
    e.preventDefault();
    const message = input.trim();

    if (!!message || !!image) {
      if (image) {
        readImage(image)
          .then((data) => {
            if (!!roomId) {
              socket.emit("push_support_message", {
                roomId,
                client: true,
                message,
                date: new Date().toISOString(),
                image: { data, type: image.type, name: image.name },
              });
            } else {
              socket.emit("user_join_support_chat", {
                date: new Date().toISOString(),
                client: true,
                message,
                image: { data, type: image.type, name: image.name },
              });
            }
            setInput("");
          })
          .catch(setError);
      } else {
        if (false) {
          socket.emit("push_support_message", {
            roomId,
            client: true,
            message,
            date: new Date().toISOString(),
            image: null,
          });
        } else {
          const numberWithDialCode = `${dialCode}${number}`;
          socket.emit("user_join_support_chat", {
            date: new Date().toISOString(),
            client: true,
            message,
            roomId,
            image: null,
            number: Number(numberWithDialCode),
          });
        }
        dispatch(ringSentAlerm());
      }
      setInput("");
      setImage(null);
    }
  }

  //-------------------------------- Socket work start--------------------------------

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      socket.on("send_admin_support_message", (data) => {
        // const {client, message, roomId} = data;
        setRoomId(data.roomId);
        setMessages([...messages, data]);
        if (!data.client) {
          dispatch(ringReceivedAlerm());
        }
      });
    }

    return () => {
      unmounted = true;
      socket.off();
    };
  }, [messages]);

  // if admin not available render this message
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      socket.on("send_adminNotAvailable_message_to_user", (data) => {
        // const {client, message, roomId} = data;
        setMessages([...messages, data]);
        if (!data.client) {
          dispatch(ringReceivedAlerm());
        }
      });
    }

    return () => {
      unmounted = true;
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      socket.on("send_user_message_to_user", (data) => {
        console.log("from send_user_message_to_user ++");

        setMessages([...messages, data]);
        if (!data.client) {
          dispatch(ringReceivedAlerm());
        }
      });
    }

    return () => {
      socket.off();
      unmounted = true;
    };
  }, [messages]);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      socket.on("user_open_support_chat", (data) => {
        setMessages([data]);
      });
    }

    return () => {
      socket.off();
      unmounted = true;
    };
  }, []);

  socket.on("user_open_support_chat_for_text", (data) => {
    setMessages([data]);
  });

  const handleTest  =() => {
    console.log("hello")
    socket.emit("send-message", {hello: "slfd"});
  }

  return (
    <div className="bpcxc">

      <button onClick={handleTest}>Hello</button>
      <SideModalUI align="left">
        <div className="each_cn chat_outer">
          {!allowForText ? (
            <div className="chat_hd">Welcome to LiveChat</div>
          ) : (
            <div className="chat_hd">
              Live Chat: {dialCode}
              {number}
            </div>
          )}

          <Scroll className="conv_div">
            {messages.map(({ id, client, message, date, image }, index) => {
              console.log("message ======>>>", message);

              return (
                <div key={index} className="o-h" style={{ margin: "10px 0" }}>
                  {/* onHover sow date */}
                  {/* <div title={<When date={date} />}> */}
                  <div>
                    {!client ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <img
                              src={ManagerIcon}
                              className="user_pic"
                              alt="user_pic"
                            />
                          </div>

                          <div className="chat_text">
                            {message}
                            {!!image && (
                              <img
                                src={getUrl(image, auth.user.username)}
                                alt=""
                              />
                            )}
                          </div>
                        </div>

                        {isNumberFieldActive ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "10px",
                              gap: "3px",
                            }}>
                            <span style={{ flex: "1 1 auto" }}></span>
                            <div className="phone-number-added-field won-side">
                              <form
                                // style={{ padding: 0, flex: '1 1 auto' }}
                                onSubmit={givePermissionForText}>
                                <input
                                  className="country-code-field"
                                  type="text"
                                  disabled
                                  value={dialCode}
                                />

                                <input
                                  type="number"
                                  autoFocus
                                  placeholder="Type your number here.."
                                  className="chat_from_txt"
                                  onChange={(e) => {
                                    setNumber(e.target.value);
                                  }}
                                  value={number}
                                  style={{ flex: "1 1 auto" }}
                                />

                                <button
                                  className="number-submit-btn"
                                  type="submit"></button>
                              </form>
                            </div>
                            <div>
                              <img
                                src={Avatar}
                                className="user_pic"
                                alt="user_pic"
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ flex: "1 1 auto" }}></span>
                        <div className="chat_text_owner">
                          {message}
                          {!!image && (
                            <img
                              src={getUrl(image, auth.user.username)}
                              alt=""
                            />
                          )}
                        </div>
                        <div>
                          <img
                            src={Avatar}
                            className="user_pic"
                            alt="user_pic"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {!!error && <small>{error}</small>}
          </Scroll>
          <div className="post_outer">
            {allowForText ? (
              <form
                className="cufh"
                style={{ padding: 0, flex: "1 1 auto" }}
                onSubmit={chatUsOnSubmit}>
                <img
                  style={{ height: 30, width: 30, cursor: "pointer" }}
                  onClick={() => supportMedia.click()}
                  src={PhotoIcon}
                  alt=""
                />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type your text here.."
                  className="chat_from_txt"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  value={input}
                  style={{ flex: "1 1 auto" }}
                />
                <button style={{ padding: 0 }} type="submit">
                  <span className="send_unicode">&#10148;</span>
                </button>
              </form>
            ) : (
              <></>
              // <form
              //   className="cufh"
              //   style={{ padding: 0, flex: '1 1 auto' }}
              //   onSubmit={givePermissionForText}
              // >
              //   <input
              //     type="number"
              //     autoFocus
              //     placeholder="Type your number here.."
              //     className="chat_from_txt"
              //     onChange={(e) => {
              //       setNumber(e.target.value)
              //     }}
              //     value={number}
              //     style={{ flex: '1 1 auto' }}
              //   />
              //   <button style={{ padding: 0 }} type="submit">
              //     <span className="send_unicode">&#10148;</span>
              //   </button>
              // </form>
            )}
            {/* <form className='cufh' style={{ padding: 0, flex: '1 1 auto' }} onSubmit={chatUsOnSubmit}>
              <img style={{ height: 30, width: 30, cursor: 'pointer' }} onClick={() => supportMedia.click()} src={PhotoIcon} alt='' />
              <input
                type='text'
                autoFocus
                placeholder='Type your text here..'
                className='chat_from_txt'
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                style={{ flex: '1 1 auto' }}
              />
              <button style={{ padding: 0 }} type='submit'>
                <span className='send_unicode'>&#10148;</span>
              </button>
            </form> */}
          </div>
          <input
            type="file"
            className="fileInput"
            ref={(ref) => (supportMedia = ref)}
            accept="image/*"
            onChange={onSelect}
          />
        </div>

        <div onClick={close} className="close_support_chat">
          &#10006;
        </div>
      </SideModalUI>
      <audio src={Tune} ref={(ref) => (messageRing = ref)} />
    </div>
  );
}

export default connect((store) => ({ auth: store.auth, site: store.site }))(
  LiveChat
);
